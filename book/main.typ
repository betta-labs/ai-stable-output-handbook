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
// Part II: 方法与基础
// ====================

#part(
  "II",
  "方法与基础",
  subtitle: "从单次生成到可复现工作流与上下文底座",
)

#include "generated/chapter-04.typ"
#include "generated/chapter-05.typ"

// ====================
// Part III: 执行与落地
// ====================

#part(
  "III",
  "执行与落地",
  subtitle: "从最小闭环、员工日常协作到多场景扩展",
)

#include "generated/chapter-06.typ"
#include "generated/chapter-07.typ"
#include "generated/chapter-08.typ"

// ====================
// Part IV: 进阶决策
// ====================

#part(
  "IV",
  "进阶决策",
  subtitle: "Agent 受控编排与专项能力适用判断",
)

#include "generated/chapter-09.typ"
#include "generated/chapter-10.typ"

// ====================
// Part V: 度量与治理
// ====================

#part(
  "V",
  "度量与治理",
  subtitle: "用证据决策，用组织协同、韧性与合规保障运行",
)

#include "generated/chapter-11.typ"
#include "generated/chapter-12.typ"
#include "generated/chapter-13.typ"
#include "generated/chapter-14.typ"
#include "generated/chapter-15.typ"

// ====================
// Part VI: 案例与收束
// ====================

#part(
  "VI",
  "案例与收束",
  subtitle: "从公开案例与教学情景中学习控制，而非制造效果幻觉",
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
