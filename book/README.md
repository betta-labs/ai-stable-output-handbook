# book/ — 印刷级 PDF 构建（Typst + Pandoc）

> 一份内容真源、两个输出端：Markdown 既驱动 VitePress 网站，也驱动这本书。

## 架构

```
book.yaml (全书清单)
     │
     ▼
build.sh ──→ Pandoc --to=typst ──→ generated/*.typ
     │                                    │
     │  后处理：                            │
     │  1. 移除表格 #figure 包装            │
     │  2. 内部链接转纯文本                 │
     ▼                                    ▼
                              main.typ (组装)
                                    │
                                    ▼
                              Typst → PDF
```

## 文件分工

| 文件 | 职责 |
|------|------|
| `book.yaml` | 全书结构清单（Parts / Chapters / Appendices），唯一事实源 |
| `metadata.typ` | 书名 / 版本 / 作者 / 调色板（唯一事实源） |
| `template.typ` | A5 开本 / 页边距 / 页码 / 正文字体字号行距 |
| `styles.typ` | H1–H4 / 引用 / 代码 / 表格 / 分隔线 的 show 规则 |
| `components/` | 可复用组件（封面 / Part / Callout / Template Box 等） |
| `main.typ` | 只做组装：封面 → 目录 → 前置 → Part I-V → 后记 → 附录 |
| `build.sh` | 读取 book.yaml，Pandoc + 后处理 + Typst 一键构建 |

## 组件系统（Phase 3）

| 组件 | 文件 | 用途 |
|------|------|------|
| Part | `components/part.typ` | 大章节分隔页（PART I / II ...） |
| Callout | `components/callout.typ` | 提示 / 注意 / 关键判断 / 风险 / 实践 / 反模式 / 结论 |
| Code | `styles.typ` 内联 | 代码块统一样式 + 语言标签 |
| Table | `styles.typ` 内联 | 表头加粗居中 / A5 窄页适配 / 跨页 |
| Figure | `components/figure.typ` | 图片宽度 / 标题 / 编号（预留） |
| Template Box | `components/template-box.typ` | TEMPLATE / CHECKLIST / PROMPT / SOP 模板盒 |

## 已知约束

1. **表格 figure 包装**：Pandoc 把 Markdown 表格包在 `#figure(kind: table)` 中，
   这会导致 Typst 0.15 渲染时表格后内容重复。build.sh 后处理已自动移除。
2. **内部交叉引用**：Markdown 内部链接 `[text](#anchor)` 的 anchor 与 Typst heading label
   不匹配，build.sh 后处理已转为纯文本。
3. **表格单元格背景**：不在 `show table.cell` 中用 `block(fill: ...)` 包装，
   会导致 Typst 0.15 内容重复。表头用 `set text(weight: bold)` 区分。

## 常用命令

```bash
./book/build.sh                 # 一键构建全书 PDF
typst watch book/main.typ       # 边改边看（手动）
```

## 输出

- `dist/企业AI稳定产出手册-v2.0.0.pdf` — 全书 PDF（约 360 页）
- `dist/preview/page-{n}.png` — 逐页预览图

## 阶段路线

- **Phase 1** ✅ Typst + Pandoc 跑通
- **Phase 2** ✅ A5 / 字体 / 标题 / 页眉页脚 / 章节页
- **Phase 3** ✅ Part / Callout / Code / Table / Figure / Template Box 组件
- **Phase 4** ✅ 16 章 + 7 附录批量构建、目录、PDF metadata、全书 PDF

## 依赖

- Typst ≥ 0.13
- Pandoc ≥ 3.1（需支持 `--to=typst`）
- Python 3 + PyYAML（`pip3 install pyyaml`）
- macOS 自带 Songti SC / PingFang SC / Menlo
