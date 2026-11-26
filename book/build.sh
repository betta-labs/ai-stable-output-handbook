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
SRC_MAP_FILE=$(mktemp)
python3 - "$BOOK/book.yaml" "$MANIFEST_FILE" "$SRC_MAP_FILE" << 'PYEOF'
import sys, re

try:
    import yaml
    with open(sys.argv[1], "r", encoding="utf-8") as f:
        book = yaml.safe_load(f)
    entries = []
    for item in book.get("frontmatter", []):
        entries.append((item["src"], item["out"]))
    for part in book.get("parts", []):
        for ch in part.get("chapters", []):
            entries.append((ch["src"], ch["out"]))
    for item in book.get("backmatter", []):
        entries.append((item["src"], item["out"]))
    for item in book.get("appendices", []):
        entries.append((item["src"], item["out"]))
except ImportError:
    # 无 PyYAML 依赖时的标准库兜底解析：提取 book.yaml 中的 src/out 配对
    with open(sys.argv[1], "r", encoding="utf-8") as f:
        text = f.read()
    entries = re.findall(r'-\s+src:\s+([^\s]+)\s*\n\s+out:\s+([^\s]+)', text)

with open(sys.argv[2], "w", encoding="utf-8") as f:
    for src, out in entries:
        f.write(f"{src}|{out}\n")

with open(sys.argv[3], "w", encoding="utf-8") as f:
    for src, out in entries:
        f.write(f"{src}|{out}\n")

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
# 3.5 后处理：解析书内章节跳转为 Typst 真实标签，站外入口映射为阅读站 URL
# ====================
python3 - "$GEN" "$SRC_MAP_FILE" "$ROOT/.vitepress/page-meta.ts" << 'PYEOF'
import sys, os, glob, re

gen_dir, src_map_file, page_meta_file = sys.argv[1], sys.argv[2], sys.argv[3]

# 1. 建立 源码文件名 -> 生成的 .typ 文件 -> 章节一级标题 Typst label 的映射
src_to_out = {}
with open(src_map_file, "r", encoding="utf-8") as f:
    for line in f:
        src, out = line.strip().split("|", 1)
        src_to_out[src] = out

out_to_label = {}
known_labels = set()
for fpath in glob.glob(os.path.join(gen_dir, "*.typ")):
    fname = os.path.basename(fpath)
    content = open(fpath, "r", encoding="utf-8").read()
    for m in re.finditer(r'^<([^>\s]+)>$', content, re.M):
        known_labels.add(m.group(1))
    m1 = re.search(r'^=\s+[^\n]+\n+<([^>\s]+)>', content, re.M)
    if m1:
        out_to_label[fname] = m1.group(1)

# 2. 解析在线阅读站路由，让站外页面（如事实卡、高管摘要、ROI 专题）在 PDF 中保留真实可点击 URL
site_routes = {}
if os.path.exists(page_meta_file):
    meta_txt = open(page_meta_file, "r", encoding="utf-8").read()
    for m in re.finditer(r"route:\s*'([^']+)'", meta_txt):
        pass
    # 从 pageRoutes / pageMeta 抽取 'source.md': { ... route: '/...' }
    for m in re.finditer(r"'([^']+\.md)'\s*:\s*\{[^}]*?route:\s*'([^']+)'", meta_txt, re.S):
        site_routes[m.group(1)] = f"https://handbook.sanage.xyz{m.group(2)}"

def replace_label_link(m):
    label, text = m.group(1), m.group(2)
    if label in known_labels:
        return f'#link(<{label}>)[{text}]'
    return text

def replace_file_link(m):
    target, text = m.group(1), m.group(2)
    if re.match(r'^https?://', target):
        return m.group(0)
    clean_file = target.split("#", 1)[0].split("?", 1)[0]
    if clean_file in src_to_out:
        out_typ = src_to_out[clean_file]
        if out_typ in out_to_label:
            return f'#link(<{out_to_label[out_typ]}>)[{text}]'
    if clean_file in site_routes:
        return f'#link("{site_routes[clean_file]}")[{text}]'
    return text

label_pat = re.compile(r'#link\(<([^>]+)>\)\[([^\]]*)\]')
file_pat = re.compile(r'#link\("([^"]+)"\)\[([^\]]*)\]')

changed_count = 0
for fpath in sorted(glob.glob(os.path.join(gen_dir, "*.typ"))):
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
    new_content = label_pat.sub(replace_label_link, content)
    new_content = file_pat.sub(replace_file_link, new_content)
    if new_content != content:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_content)
        changed_count += 1

if changed_count > 0:
    print(f"  [post-process] resolved internal & web links in {changed_count} files")
PYEOF
rm -f "$SRC_MAP_FILE"

# ====================
# 4. Typst → PDF
# ====================
OUTPUT="$DIST/企业AI落地实战手册-v2.1.0.pdf"
echo "[typst]  main.typ -> $(basename "$OUTPUT")"
typst compile "$BOOK/main.typ" "$OUTPUT"

# 生成预览图（可选，用于检查）
rm -f "$DIST/preview/page-"*.png
typst compile --format png --ppi 120 "$BOOK/main.typ" "$DIST/preview/page-{p}.png" 2>/dev/null || true

PAGE_COUNT=$(ls "$DIST/preview/page-"*.png 2>/dev/null | wc -l | tr -d ' ')

echo ""
echo "完成: $OUTPUT"
echo "总页数: $PAGE_COUNT"
