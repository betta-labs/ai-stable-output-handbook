#!/usr/bin/env bash
# build.sh — Markdown 真源 → Pandoc → Typst → PDF
# 用法: ./book/build.sh
#
# 读取 book/book.yaml 中的全书清单，按顺序执行：
#   1. Markdown → Typst（Pandoc）
#   2. 后处理：移除 Pandoc 表格的 #figure 包装（避免 Typst 内容重复）
#   3. Typst → PDF

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BOOK="$ROOT/book"
GEN="$BOOK/generated"
DIST="$BOOK/dist"

mkdir -p "$GEN" "$DIST"

# ====================
# 1. 从 book.yaml 读取全书清单，生成临时 manifest
# ====================
MANIFEST_FILE=$(mktemp)
python3 - "$BOOK/book.yaml" "$MANIFEST_FILE" << 'PYEOF'
import sys, yaml

with open(sys.argv[1], "r") as f:
    book = yaml.safe_load(f)

entries = []

# Frontmatter
for item in book.get("frontmatter", []):
    entries.append(f"{item['src']}|{item['out']}")

# Parts + chapters
for part in book.get("parts", []):
    for ch in part.get("chapters", []):
        entries.append(f"{ch['src']}|{ch['out']}")

# Backmatter
for item in book.get("backmatter", []):
    entries.append(f"{item['src']}|{item['out']}")

# Appendices
for item in book.get("appendices", []):
    entries.append(f"{item['src']}|{item['out']}")

with open(sys.argv[2], "w") as f:
    for e in entries:
        f.write(e + "\n")

print(f"[manifest] {len(entries)} files from book.yaml")
PYEOF

# ====================
# 2. Markdown → Typst（Pandoc）
# ====================
while IFS='|' read -r src out; do
  echo "[pandoc] $src -> generated/$out"
  pandoc "$ROOT/$src" -o "$GEN/$out" --to=typst
done < "$MANIFEST_FILE"

rm -f "$MANIFEST_FILE"

# ====================
# 3. 后处理：移除 Pandoc 表格的 #figure 包装
# Pandoc 把每个 Markdown 表格包在 #figure(kind: table)[align(center)[#table(...)]] 中，
# 这会导致 Typst 0.15 渲染时表格后的内容重复（已知交互问题）。
# 这里将其还原为裸 #table(...)，表格样式由 styles.typ 统一控制。
# ====================
python3 - "$GEN" << 'PYEOF'
import sys, os, glob

gen_dir = sys.argv[1]
changed_count = 0
for fpath in sorted(glob.glob(os.path.join(gen_dir, "*.typ"))):
    with open(fpath, "r") as f:
        lines = f.readlines()

    result = []
    i = 0
    changed = False
    while i < len(lines):
        if lines[i].strip() == "#figure(":
            j = i + 1
            table_start = None
            while j < len(lines):
                if "align(center)[#table(" in lines[j]:
                    table_start = j
                    break
                j += 1
            if table_start:
                k = table_start
                depth = 0
                while k < len(lines):
                    depth += lines[k].count("(") - lines[k].count(")")
                    if depth <= 0 and ")]" in lines[k]:
                        break
                    k += 1
                table_lines = lines[table_start:k+1]
                table_text = "".join(table_lines)
                table_text = table_text.replace("align(center)[#table(", "#table(", 1)
                idx = table_text.rfind(")]")
                if idx != -1:
                    table_text = table_text[:idx] + ")" + table_text[idx+2:]
                result.append(table_text)
                m = k + 1
                while m < len(lines) and lines[m].strip() != ")":
                    m += 1
                i = m + 1
                changed = True
                continue
        result.append(lines[i])
        i += 1

    if changed:
        with open(fpath, "w") as f:
            f.writelines(result)
        changed_count += 1

if changed_count > 0:
    print(f"  [post-process] unwrapped figures in {changed_count} files")
PYEOF

# ====================
# 3.5 后处理：将内部交叉引用链接转为纯文本
# Pandoc 将 Markdown 内部链接 [text](#anchor) 转为 #link(<anchor>)[text]，
# 但 anchor 与实际 heading label 不匹配会导致 Typst 报错。
# 这里将所有 #link(<label>)[text] 转为纯 text（外部 URL 链接不受影响）。
# ====================
python3 - "$GEN" << 'PYEOF'
import sys, os, glob, re

gen_dir = sys.argv[1]
changed_count = 0

# 匹配 #link(<label>)[text]，label 不含 >，text 不含 ]（简单情况）
pattern = re.compile(r'#link\(<[^>]+>\)\[([^\]]*)\]')

for fpath in sorted(glob.glob(os.path.join(gen_dir, "*.typ"))):
    with open(fpath, "r") as f:
        content = f.read()

    new_content = pattern.sub(r'\1', content)

    if new_content != content:
        with open(fpath, "w") as f:
            f.write(new_content)
        changed_count += 1

if changed_count > 0:
    print(f"  [post-process] converted internal links to text in {changed_count} files")
PYEOF

# ====================
# 4. Typst → PDF
# ====================
OUTPUT="$DIST/企业AI稳定产出手册-v2.0.0.pdf"
echo "[typst]  main.typ -> $(basename "$OUTPUT")"
typst compile "$BOOK/main.typ" "$OUTPUT"

# 生成预览图（可选，用于检查）
rm -f "$DIST/preview/page-"*.png
typst compile --format png --ppi 120 "$BOOK/main.typ" "$DIST/preview/page-{p}.png" 2>/dev/null || true

PAGE_COUNT=$(ls "$DIST/preview/page-"*.png 2>/dev/null | wc -l | tr -d ' ')

echo ""
echo "完成: $OUTPUT"
echo "总页数: $PAGE_COUNT"
