// styles.typ — 视觉样式规则
// 职责：所有 show 规则集中在此，避免多层函数嵌套导致 Typst 渲染异常。
// components/ 下的文件导出可复用函数（callout / part / template-box / fig 等），
// 代码 / 表格 / 图表的 show 规则直接写在本文件的 book-styles() 中。
//
// 所有规则收敛在 book-styles() 中，由 template.typ 统一应用，
// 单独 #import 本文件不会产生副作用。

#import "metadata.typ": *

// ---- 表格专用色 ----
#let c-table-header-text = rgb("#1a1a1a")
#let c-table-line = rgb("#c4c4be")

// ---- 代码语言标签映射 ----
#let lang-display = (
  "bash": "Shell", "sh": "Shell", "shell": "Shell",
  "python": "Python", "py": "Python",
  "javascript": "JavaScript", "js": "JavaScript",
  "typescript": "TypeScript", "ts": "TypeScript",
  "json": "JSON", "yaml": "YAML", "yml": "YAML",
  "toml": "TOML", "xml": "XML", "html": "HTML", "css": "CSS",
  "sql": "SQL", "go": "Go", "rust": "Rust", "java": "Java",
  "ruby": "Ruby", "php": "PHP", "swift": "Swift", "kotlin": "Kotlin",
  "dart": "Dart", "lua": "Lua", "r": "R", "dockerfile": "Dockerfile",
  "makefile": "Makefile", "diff": "Diff", "text": "Text",
  "ini": "INI", "conf": "Config", "env": "Env", "prompt": "Prompt",
)

// 判断 H1 是否为「第 N 章」形态，拆出编号标签与正题
#let split-chapter-title(body) = {
  if body.has("text") {
    let m = body.text.match(regex("^第\s*(\d+)\s*章\s+(.+)$"))
    if m != none {
      return (label: "第 " + m.captures.first() + " 章", title: m.captures.last())
    }
  }
  return (label: none, title: body)
}

#let book-styles(body) = {

  // ============ 一级标题：章扉页 ============
  show heading.where(level: 1): it => {
    set text(font: "PingFang SC", fill: c-ink)
    let parts = split-chapter-title(it.body)
    pagebreak(weak: true)
    v(24mm)
    align(center)[
      #if parts.label != none [
        #text(size: 10pt, tracking: 2pt, fill: c-muted)[#parts.label]
        #v(7mm)
      ]
      #text(size: 20pt, weight: "bold")[#parts.title]
      #v(7mm)
      #line(length: 22mm, stroke: 0.8pt + c-rule)
    ]
    v(9mm)
  }

  // ============ 二级标题 ============
  show heading.where(level: 2): it => {
    set text(font: "PingFang SC", fill: c-ink)
    block(above: 7mm, below: 3mm)[
      #text(size: 13pt, weight: "bold")[#it.body]
    ]
  }

  // ============ 三级标题 ============
  show heading.where(level: 3): it => {
    set text(font: "PingFang SC", fill: c-ink)
    block(above: 5mm, below: 2.5mm)[
      #text(size: 11pt, weight: "bold")[#it.body]
    ]
  }

  // ============ 四级及以下 ============
  show heading.where(level: 4): it => {
    set text(font: "PingFang SC", fill: c-secondary)
    block(above: 4mm, below: 2mm)[
      #text(size: 10pt, weight: "bold")[#it.body]
    ]
  }

  // ============ 引用块 ============
  show quote: it => {
    set par(first-line-indent: 0em)
    block(
      width: 100%,
      fill: c-bg-soft,
      stroke: (left: 2.5pt + c-rule),
      inset: (x: 9pt, y: 8pt),
      radius: (top-right: 2pt, bottom-right: 2pt),
    )[
      #set text(fill: c-secondary, size: 9.5pt)
      #it
    ]
  }

  // ============ 分隔线 ============
  show divider: it => {
    v(4mm)
    align(center)[
      #line(length: 40mm, stroke: 0.5pt + c-border)
    ]
    v(4mm)
  }

  // ============ 目录条目 ============
  show outline.entry: it => {
    set text(size: 10pt)
    it
  }

  // ============ 代码块 ============
  show raw.where(block: true): it => {
    set par(first-line-indent: 0em)
    let lang = it.lang
    let label = if lang != none and lang != "" {
      lang-display.at(lang, default: lang)
    } else {
      none
    }
    block(
      width: 100%,
      fill: c-bg-soft,
      stroke: 0.5pt + c-border,
      inset: (x: 9pt, y: 7pt),
      radius: 2pt,
      above: 8pt,
      below: 8pt,
      breakable: true,
    )[
      #if label != none {
        place(top + right, dx: -2pt, dy: 2pt)[
          #text(font: "Menlo", size: 7pt, fill: c-muted, tracking: 0.5pt)[#label]
        ]
      }
      #set text(font: ("Menlo", "Songti SC"), size: 8.2pt, fill: c-ink, lang: "en")
      #it
    ]
  }

  // 行内代码
  show raw.where(block: false): set text(
    font: ("Menlo", "Songti SC"),
    size: 0.92em,
    fill: rgb("#8b2f25"),
  )

  // ============ 表格 ============
  // 注意：
  // 1. 不在 show table.cell 中用 block 包装（会导致 Typst 0.15 内容重复）
  // 2. 不依赖 figure 包装（build.sh 已移除 Pandoc 的 #figure(kind: table) 包装）
  show table: set table(
    stroke: 0.4pt + c-table-line,
    inset: (x: 6pt, y: 4.5pt),
    align: horizon,
    column-gutter: 0pt,
    row-gutter: 0pt,
  )
  show table: set text(size: 8.8pt, fill: c-ink, lang: "zh")
  show table: set par(first-line-indent: 0em, justify: false, leading: 0.6em)
  show table.cell: it => {
    if it.y == 0 {
      set text(font: "PingFang SC", size: 9pt, weight: "bold", fill: c-table-header-text)
      set align(center + horizon)
    }
    it
  }

  // ============ 图片 figure（当前全书无图片，预留）============
  show figure.where(kind: "image"): it => {
    block(above: 10pt, below: 10pt, breakable: false)[#it]
  }
  show figure.caption: it => {
    v(4pt)
    set text(font: "PingFang SC", size: 8.5pt, fill: c-secondary)
    align(center)[#it]
  }

  body
}
