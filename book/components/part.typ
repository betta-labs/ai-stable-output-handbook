// components/part.typ — Part 分隔页（第一部分 / 第二部分 ...）
// 职责：大章节分隔页，居中展示 PART 编号 + 标题 + 副标题。
// 同时向 PDF 书签栏注册一个 Part 层级条目。

#import "../metadata.typ": c-ink, c-secondary, c-muted, c-rule

#let part(
  number,       // "I" / "II" / "III"
  title,        // "认知与诊断"
  subtitle: none,
) = {
  pagebreak(weak: true)

  page(
    margin: 0pt,
  )[
    #align(center + horizon)[
      #set text(font: "PingFang SC")

      // PART 编号
      #text(
        size: 11pt,
        weight: "bold",
        tracking: 4pt,
        fill: c-muted,
      )[
        PART #number
      ]

      #v(12mm)

      // 装饰细线
      #line(length: 30mm, stroke: 0.8pt + c-rule)

      #v(12mm)

      // 主标题
      #text(
        size: 28pt,
        weight: "bold",
        fill: c-ink,
      )[
        #title
      ]

      #if subtitle != none {
        v(10mm)

        text(
          size: 12pt,
          fill: c-secondary,
        )[
          #subtitle
        ]
      }
    ]
  ]

  pagebreak(weak: true)
}
