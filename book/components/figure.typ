// components/figure.typ — 图表 / 图片统一样式
// 职责：图片宽度 / 上下间距 / 图片标题 / 编号。
// 当前全书 Markdown 无内嵌图片，本组件主要用于：
//   1. 未来手动插入架构图 / 示意图
//   2. 统一 Pandoc figure 包装层的间距
// 表格（Pandoc 包装为 figure(kind: table)）的样式由 table.typ 负责。
//
// 本文件导出 figure-styles()，由 styles.typ 的 book-styles() 统一调用。
// 同时导出 fig() 用于手动插入带标题的图片。

#import "../metadata.typ": c-ink, c-secondary, c-muted, c-rule

#let figure-styles(body) = {

  // ============ 通用 figure 间距 ============
  // 对非表格类 figure（图片等）控制前后间距
  show figure.where(kind: "image"): it => {
    block(
      above: 10pt,
      below: 10pt,
      breakable: false,
    )[
      #it
    ]
  }

  // figure 标题统一样式
  show figure.caption: it => {
    v(4pt)
    set text(font: "PingFang SC", size: 8.5pt, fill: c-secondary)
    align(center)[#it]
  }

  body
}

// ---- 手动插入图片的便捷函数 ----
// 用法：
//   #fig("assets/architecture.png", caption: "企业 AI 稳定产出闭环", width: 90%)
//
// 编号格式：图 <章号>-<序号>，如 图 3-2
// 章号通过 heading counter 获取，若无法获取则用全局序号。
#let fig(
  path,
  caption: none,
  width: 100%,
) = {
  block(
    above: 10pt,
    below: 10pt,
    breakable: false,
  )[
    #align(center)[
      #image(path, width: width)
    ]

    #if caption != none {
      v(5pt)

      // 编号：尝试获取当前章号
      let chapter-num = counter(heading.where(level: 1)).get().first()
      let fig-num = counter("figure").step()
      let label = if chapter-num > 0 {
        "图 " + str(chapter-num) + "-" + str(fig-num)
      } else {
        "图 " + str(fig-num)
      }

      align(center)[
        #text(
          font: "PingFang SC",
          size: 8.5pt,
          fill: c-secondary,
        )[#label  #caption]
      ]
    }
  ]
}
