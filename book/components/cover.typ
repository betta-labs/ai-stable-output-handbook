// components/cover.typ — 封面
// 纯排版式封面：细线框 + 居中书名。后续可替换为 SVG 资产版式。

#import "../metadata.typ": *

#let cover() = {
  page(
    paper: "a5",
    margin: 0pt,
    header: none,
    footer: none,
    numbering: none,
  )[
    // 细线装饰框（A5 = 148 × 210 mm）
    #place(center + horizon)[
      #rect(width: 128mm, height: 192mm, stroke: 0.6pt + c-rule, radius: 0pt)
    ]

    // 顶部：系列标识
    #place(top + center, dy: 20mm)[
      #text(font: "PingFang SC", size: 8pt, tracking: 3pt, fill: c-muted)[#series]
    ]

    // 中部：书名 + 副题
    #place(center + horizon, dy: -6mm)[
      #align(center)[
        #text(font: "PingFang SC", size: 25pt, weight: "bold", fill: c-ink)[#title]
        #v(9mm)
        #text(font: "Songti SC", size: 11pt, fill: c-secondary)[#tagline]
        #v(5mm)
        #text(font: "Menlo", size: 8pt, fill: c-muted)[#title-en]
      ]
    ]

    // 底部：版本年份
    #place(bottom + center, dy: -20mm)[
      #text(font: "PingFang SC", size: 9pt, fill: c-muted)[#version · #year]
    ]
  ]
}
