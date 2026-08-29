// main.typ — 整本书的入口 / 组装文件
// 只负责顺序，不放排版规则。
// 结构：封面 → 目录 → 自序 → 开篇 → Part I-V（16章）→ 后记 → 附录 A-G

#import "template.typ": book
#import "components/cover.typ": cover
#import "components/part.typ": part
#import "metadata.typ": *

// PDF 元数据（Title / Author / Keywords 等）
#set document(
  title: title,
  author: author,
  keywords: keywords,
)

#show: book

// ====================
// Front Matter
// ====================

#cover()

#pagebreak()

#outline(title: [目录], depth: 2)

#pagebreak()

#include "generated/00-preface.typ"

#include "generated/00-opening.typ"

// ====================
// Part I: 认知与诊断
// ====================

#part(
  "I",
  "认知与诊断",
  subtitle: "理解企业 AI 为什么难以稳定产出",
)

#include "generated/chapter-01.typ"
#include "generated/chapter-02.typ"
#include "generated/chapter-03.typ"

// ====================
// Part II: 从单次生成到可复现工作流
// ====================

#part(
  "II",
  "从单次生成到可复现工作流",
  subtitle: "把个人技巧变成团队可重复的工作方法",
)

#include "generated/chapter-04.typ"
#include "generated/chapter-05.typ"
#include "generated/chapter-06.typ"

// ====================
// Part III: 规模化与组织落地
// ====================

#part(
  "III",
  "规模化与组织落地",
  subtitle: "从单一闭环到受控用例组合",
)

#include "generated/chapter-07.typ"
#include "generated/chapter-08.typ"
#include "generated/chapter-09.typ"
#include "generated/chapter-10.typ"

// ====================
// Part IV: 价值、治理与韧性
// ====================

#part(
  "IV",
  "价值、治理与韧性",
  subtitle: "用证据决策，用治理保障，用韧性应对变化",
)

#include "generated/chapter-11.typ"
#include "generated/chapter-12.typ"
#include "generated/chapter-13.typ"
#include "generated/chapter-14.typ"
#include "generated/chapter-15.typ"

// ====================
// Part V: 实践案例
// ====================

#part(
  "V",
  "实践案例",
  subtitle: "从案例中学习控制，而非制造效果幻觉",
)

#include "generated/chapter-16.typ"

// ====================
// Back Matter
// ====================

#include "generated/99-afterword.typ"

// ====================
// Appendices
// ====================

#part(
  "A",
  "附录",
  subtitle: "可直接复用的清单、模板与参考资料",
)

#include "generated/appendix-a.typ"
#include "generated/appendix-b.typ"
#include "generated/appendix-c.typ"
#include "generated/appendix-d.typ"
#include "generated/appendix-e.typ"
#include "generated/appendix-f.typ"
#include "generated/appendix-g.typ"
