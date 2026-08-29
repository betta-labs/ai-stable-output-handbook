// template.typ — 页面级规则：这是一本什么样的书
// 职责：A5 开本 / 页边距 / 页码 / 正文字体字号行距 / 段落
// 修改开本（如 A5→16开）、字号（10.5→11pt）只动这里。

#import "styles.typ": book-styles

#let book(body) = {

  // ---- 页面 ----
  set page(
    paper: "a5",
    margin: (
      top: 20mm,
      bottom: 22mm,
      inside: 22mm,   // 订口
      outside: 18mm,  // 切口
    ),
    // 页码置于切口侧页脚，第 1 页（封面）起不显示
    footer: context {
      let n = counter(page).get().first()
      if n > 1 {
        set text(font: "PingFang SC", size: 8.5pt, fill: rgb("#666666"))
        let num = counter(page).display()
        if calc.even(n) { align(left)[#num] } else { align(right)[#num] }
      }
    },
  )

  // ---- 正文 ----
  set text(
    font: ("Songti SC", "PingFang SC"),
    size: 10.5pt,
    lang: "zh",
    region: "cn",
  )
  set par(
    justify: true,
    leading: 0.72em,
    // 中文书籍惯例：所有段落首行缩进两字
    first-line-indent: (amount: 2em, all: true),
  )

  // ---- 列表 ----
  set list(spacing: 0.95em, marker: ([•], [–], [·]))
  set enum(spacing: 0.95em)

  // ---- 视觉样式（styles.typ）----
  book-styles(body)
}
