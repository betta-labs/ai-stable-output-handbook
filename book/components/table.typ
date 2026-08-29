// components/table.typ — 表格统一样式
// 职责：表头 / 边框 / 单元格 padding / 行距 / 自动换行 / A5 窄页适配 / 跨页。
//
// 注意：
// 1. build.sh 已移除 Pandoc 的 #figure(kind: table) 包装（会导致内容重复）。
// 2. 不在 show table.cell 中用 block 包装单元格内容（也会导致 Typst 0.15 内容重复）。
//    表头样式通过 set text / set align 控制，表头背景暂不使用。
//
// 本文件导出 table-styles()，由 styles.typ 的 book-styles() 统一调用。

#import "../metadata.typ": c-ink, c-secondary, c-muted

// 表格专用色
#let c-table-header-text = rgb("#1a1a1a")
#let c-table-line = rgb("#c4c4be")

#let table-styles(body) = {

  // ============ 表格全局 ============
  show table: set table(
    stroke: 0.4pt + c-table-line,
    inset: (x: 6pt, y: 4.5pt),
    align: horizon,
    column-gutter: 0pt,
    row-gutter: 0pt,
  )

  // 表格内文字：A5 窄页用小字号，关闭首行缩进
  show table: set text(size: 8.8pt, fill: c-ink, lang: "zh")
  show table: set par(first-line-indent: 0em, justify: false, leading: 0.6em)

  // ============ 表头单元格（第一行 y=0）============
  // 仅用 set 控制文字样式（加粗居中），不用 block 包装
  show table.cell: it => {
    if it.y == 0 {
      set text(font: "PingFang SC", size: 9pt, weight: "bold", fill: c-table-header-text)
      set align(center + horizon)
    }
    it
  }

  body
}
