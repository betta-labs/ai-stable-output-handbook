// components/template-box.typ — 可复用模板盒
// 职责：Handbook 的核心视觉识别元素，用于展示可直接复用的：
//   Checklist / Prompt Card / Workflow / SOP / 评估表 / 用例立项卡 等。
//
// 视觉：顶部标签条 + 标题 + 内容区，克制风格。
// 修改设计只动本文件，全书所有模板盒一起变化。
//
// 用法：
//   #template-box(
//     kind: "checklist",
//     title: "用例立项检查清单",
//   )[
//     - 业务问题是否真实存在
//     - 当前基线和成功标准是否定义
//   ]
//
// 便捷封装：
//   #checklist(title: "...")[ ... ]
//   #prompt-card(title: "...")[ ... ]
//   #sop(title: "...")[ ... ]
//   #workflow(title: "...")[ ... ]

#import "../metadata.typ": c-ink, c-secondary, c-muted, c-border

// 各类型的视觉配置
#let box-themes = (
  template:  (label: "TEMPLATE",  bar: rgb("#2c5f7a"), bg: rgb("#f4f7f9")),
  checklist: (label: "CHECKLIST", bar: rgb("#3a7d5c"), bg: rgb("#f2f7f4")),
  prompt:    (label: "PROMPT",    bar: rgb("#7a5c2c"), bg: rgb("#f9f6f0")),
  sop:       (label: "SOP",       bar: rgb("#5c2c7a"), bg: rgb("#f6f2f9")),
  workflow:  (label: "WORKFLOW",  bar: rgb("#2c7a5c"), bg: rgb("#f0f9f4")),
  eval:      (label: "EVALUATION",bar: rgb("#7a2c5c"), bg: rgb("#f9f0f6")),
  card:      (label: "CARD",      bar: rgb("#4a4a4a"), bg: rgb("#f5f5f2")),
)

// ---- 通用模板盒 ----
#let template-box(
  title,
  body,
  kind: "template",
  subtitle: none,
) = {
  let theme = box-themes.at(kind, default: box-themes.template)

  set par(first-line-indent: 0em, justify: true)

  block(
    width: 100%,
    fill: theme.bg,
    stroke: 0.6pt + c-border,
    inset: 0pt,
    radius: 3pt,
    above: 12pt,
    below: 12pt,
    breakable: true,
  )[
    // 顶部标签条
    #block(
      width: 100%,
      fill: theme.bar,
      inset: (x: 10pt, y: 4pt),
      radius: (top-left: 2.5pt, top-right: 2.5pt),
    )[
      #text(
        font: "Menlo",
        size: 7.5pt,
        weight: "bold",
        fill: white,
        tracking: 2pt,
      )[#theme.label]
    ]

    // 标题区
    #block(
      width: 100%,
      inset: (x: 10pt, y: 7pt),
      stroke: (bottom: 0.5pt + c-border),
    )[
      #set text(font: "PingFang SC")
      #text(size: 11pt, weight: "bold", fill: c-ink)[#title]
      #if subtitle != none {
        v(2pt)
        #text(size: 9pt, fill: c-secondary)[#subtitle]
      }
    ]

    // 内容区
    #block(
      width: 100%,
      inset: (x: 10pt, y: 8pt),
    )[
      #set text(font: ("Songti SC", "PingFang SC"), size: 9.5pt, fill: c-ink)
      #set par(leading: 0.65em)
      #body
    ]
  ]
}

// ---- 便捷封装 ----
#let checklist(title, body, subtitle: none) = template-box(
  title: title, body: body, kind: "checklist", subtitle: subtitle,
)

#let prompt-card(title, body, subtitle: none) = template-box(
  title: title, body: body, kind: "prompt", subtitle: subtitle,
)

#let sop(title, body, subtitle: none) = template-box(
  title: title, body: body, kind: "sop", subtitle: subtitle,
)

#let workflow(title, body, subtitle: none) = template-box(
  title: title, body: body, kind: "workflow", subtitle: subtitle,
)

#let eval-form(title, body, subtitle: none) = template-box(
  title: title, body: body, kind: "eval", subtitle: subtitle,
)

#let info-card(title, body, subtitle: none) = template-box(
  title: title, body: body, kind: "card", subtitle: subtitle,
)
