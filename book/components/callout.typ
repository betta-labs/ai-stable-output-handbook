// components/callout.typ — Callout 提示框系统
// 职责：区分普通正文与提示 / 注意 / 关键判断 / 风险 / 实践 / 反模式 / 结论。
// 每种类型有独立的左侧色条与标题色，修改设计只动本文件。
//
// 用法（Typst 原生）：
//   #keypoint[ 企业 AI 的核心问题通常不是模型能力，而是工作系统。 ]
//   #callout(title: "自定义标题", type: "note")[ 内容 ]
//
// 若 Markdown 中需要使用，可通过 Pandoc 自定义容器（::: note）经过滤器转换。

#import "../metadata.typ": c-ink, c-secondary, c-muted, c-bg-soft

// ---- 各类型的视觉配置 ----
// (left-bar color, title color, background tint)
#let callout-themes = (
  note:       (bar: rgb("#7a7a7a"), title: rgb("#4a4a4a"), bg: rgb("#f5f5f2")),
  warning:    (bar: rgb("#c8922a"), title: rgb("#8a6418"), bg: rgb("#faf6ec")),
  keypoint:   (bar: rgb("#1a1a1a"), title: rgb("#1a1a1a"), bg: rgb("#f0f0ed")),
  risk:       (bar: rgb("#b03a2e"), title: rgb("#8b2f25"), bg: rgb("#faf0ee")),
  practice:   (bar: rgb("#3a7d5c"), title: rgb("#2a5d44"), bg: rgb("#eef5f1")),
  antipattern:(bar: rgb("#8b5a3c"), title: rgb("#6b4428"), bg: rgb("#f7f1ec")),
  conclusion: (bar: rgb("#2c5f7a"), title: rgb("#1e4558"), bg: rgb("#eef4f7")),
)

// ---- 通用 Callout ----
#let callout(
  title: "提示",
  body,
  type: "note",
) = {
  let theme = callout-themes.at(type, default: callout-themes.note)

  set par(first-line-indent: 0em, justify: true)

  block(
    width: 100%,
    fill: theme.bg,
    stroke: (left: 3pt + theme.bar),
    inset: (x: 10pt, y: 8pt),
    radius: (top-right: 2pt, bottom-right: 2pt),
    above: 10pt,
    below: 10pt,
    breakable: true,
  )[
    #set text(font: "PingFang SC")

    // 标题行
    #text(
      size: 10pt,
      weight: "bold",
      fill: theme.title,
      tracking: 0.5pt,
    )[
      #title
    ]

    #v(4pt)

    // 正文
    #set text(font: ("Songti SC", "PingFang SC"), size: 10pt, fill: c-ink)
    #body
  ]
}

// ---- 便捷封装 ----
#let note(body) = callout(title: "提示", type: "note", body: body)

#let warning(body) = callout(title: "注意", type: "warning", body: body)

#let keypoint(body) = callout(title: "关键判断", type: "keypoint", body: body)

#let risk(body) = callout(title: "风险", type: "risk", body: body)

#let practice(body) = callout(title: "实践建议", type: "practice", body: body)

#let antipattern(body) = callout(title: "反模式", type: "antipattern", body: body)

#let conclusion(body) = callout(title: "结论", type: "conclusion", body: body)
