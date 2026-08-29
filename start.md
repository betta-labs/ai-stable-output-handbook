---
title: 从问题开始
description: 用五个常见企业AI约束，定位《企业 AI 稳定产出手册》的推荐阅读路径。
outline: false
editLink: false
---

<!-- 运行手册档案馆：任务导向的阅读分流，帮助读者从真实约束进入正文。 -->

# 从问题开始

不要急着从目录第一页开始。请选择最接近你当前处境的描述，再进入相应章节；如果问题跨越多个方向，优先从“最影响真实业务结果”的约束开始。

## 先判断你处在哪一层

先不要选模型，也不要把症状表当成诊断结论。请按下面三层判断自己的下一步：

| 你现在的状态 | 此刻可以做什么 | 进入试点前必须具备什么 | 不应由你单独决定什么 |
| --- | --- | --- | --- |
| 有一个真实、高频的工作问题，但还没想好怎么用 AI。 | 写下当前人工做法、最痛的返工和“不用 AI 也必须完成”的原因。 | 业务 Owner、允许输入、人工审核和回退路径。 | 对外承诺、敏感数据处理、写入/发送动作和例外接受。 |
| 资料、权限或责任还说不清。 | 登记阻塞条件；先补来源/边界，或用脱敏材料做纯练习。 | 已批准的资料范围、版本与适用范围；可接棒的审核人。 | 用个人账号绕过流程，或以演示结果替代审批。 |
| 已有低风险任务和基本条件。 | 使用第 2 章定位约束，再由第 6 章设计最小闭环。 | 代表性样本、质量判断、记录责任和停止条件。 | 扩大范围、提高自主性或把试点当生产上线。 |

> **正确的暂缓也是结果。** 如果无人有权定义任务、说明输入边界或接住错误，请先把这一条件写下来并转给相应 Owner；不要通过更多 Prompt、模型或 Agent 掩盖它。

## 本手册的能力圈：先判断应如何使用

本手册帮助团队在**可逆、可审查、有人负责**的工作范围内，把 AI 尝试变成可复核的业务学习与受控运行。它不替代数据保护、法务、行业监管、安全工程、医疗、金融、劳动人事或其他专业判断。请先按下表选择使用方式，而不要把完整框架或任一模板当成通用授权。

| 当前条件 | 建议怎样使用本手册 | 当前不应做什么 |
| --- | --- | --- |
| 有一条高频任务，能够明确业务 Owner、允许输入、人工审核和回退；失败可人工纠正。 | 从第 2 章定位约束，再用第 6 章和 L0 三项设计最小受控闭环。 | 把低风险内部草稿的做法直接复制为对外、写入或高自主性流程。 |
| 团队较小、资料尚不完整，或只想先验证任务是否值得投入。 | 使用探索轨：仅用公开、合成、脱敏或已批准的有限材料，记录假设、边界、失败与下一步决定。 | 把探索中的顺利输出、教学演练或个人体验写成真实业务效果。 |
| 涉及高监管、重大人身/财产安全、实时物理控制、重大权利义务决定，或当前无法确认 Owner、数据边界、审核与回退。 | 暂缓该用例，转入本组织适用的专业审查；必要时寻求有相应授权的安全、法务、风险或行业专家支持。 | 用本手册、模型输出或模板替代专业意见、正式审批或风险接受。 |

如果你还没有决定企业为什么做 AI、优先做什么或明确不做什么，先读[企业 AI 战略与业务对齐](/handbook/ai-strategy-and-alignment)。该页处理组织级取舍；下表处理某个团队或工作流的下一步。

如果你更希望按自己的角色（CEO、业务负责人、员工、知识/技术 Owner、AI COE）直接拿到行动清单，可以先看[角色化快速开始](/quickstart)。

如果你是高管，需要快速掌握决策要点（治理铁律、阶段闸门、风险签字责任），可以先看[高管执行摘要](/executive-summary)。

## 你可能正在经历的六类企业 AI 焦虑

这六类说法不是诊断标签，也不替代下表的具体路径；它们只是让你先把传播中的热词翻译成下一步可做的判断。

| 你听到或正在经历的说法 | 先不要做什么 | 推荐入口 |
| --- | --- | --- |
| “老板要求上 AI，但为什么做、先做哪件事还不清楚。” | 不把采购、试点清单或员工培训当成战略。 | [开篇：战略与业务对齐](/handbook/ai-strategy-and-alignment) → [第 2 章自诊断](/handbook/diagnose-your-constraint) |
| “员工不太用，中层也推不动。” | 不用调用量、登录次数或强制工具使用掩盖工作方式与激励问题。 | [第 7 章员工协作](/handbook/daily-human-ai-collaboration) → [第 12 章组织协同](/handbook/governance-and-organization) |
| “CFO 算不清账，想先否决。” | 不拿单次演示、节省工时或模型账单单独证明价值。 | [ROI 专题页](/learn/enterprise-ai/roi) → [第 11 章价值评估](/handbook/value-and-evaluation) |
| “Demo 很惊艳，真进工作流就翻车。” | 不因演示顺利就扩大、自动发送或提高自主性。 | [第 6 章探索/受控运行](/handbook/design-a-minimum-closed-loop) → [附录 G 失败案例集](/appendices/ai-failure-casebook) |
| “没人会推，是不是要先招一个 AI 架构师？” | 不把一个新岗位标题当作业务、知识、审核与技术支持的替代品。 | [角色化快速开始](/quickstart) → [第 12 章职责组合](/handbook/governance-and-organization) |
| “团队小、人少、预算有限，不知道能不能开始。” | 不等到有完整平台、所有模板或专职团队才学习。 | [轻量启动](/lightweight-start) → [探索轨与受控运行轨](/handbook/design-a-minimum-closed-loop) |

> 这些入口最终都回到同一方法内核：先场景，后工具；先证据，后扩大；在影响升级时再升级控制。

| 你现在遇到的情形 | 推荐先读 | 下一步资产 |
| --- | --- | --- |
| 还没有明确业务方向，或多个部门都在提 AI 需求但无法取舍。 | [开篇：战略与业务对齐](/handbook/ai-strategy-and-alignment)、[高管执行摘要](/executive-summary) | 战略一页纸、暂缓/禁区清单与业务目标—用例树。 |
| 演示很好，真实业务里却经常失败或难以复现。 | [第 1 章](/handbook/why-ai-output-is-unstable)、[第 2 章](/handbook/diagnose-your-constraint)、[第 6 章](/handbook/design-a-minimum-closed-loop) | 最小闭环设计与试点评测模板。 |
| 试点越做越乱：改动越来越多、错误难解释、审核跟不上，或想靠更多工具解决。 | **先停止扩大和提高自主性**；保留一个代表性失败记录，恢复人工原流程或缩小范围，再判断应修复、退回探索还是停止。 | [第 6 章：最小闭环与回退](/handbook/design-a-minimum-closed-loop) · [第 12 章：职责、决定权与上报](/handbook/governance-and-organization) · [第 14 章：依赖与韧性](/handbook/ai-dependency-and-resilience) · [AI 失败案例集](/appendices/ai-failure-casebook) |
| 团队不知道该用 Prompt、Skill、工作流还是 Agent。 | [第 4 章](/handbook/from-generation-to-reproducible-workflows)、[第 9 章](/handbook/agent-and-automation-governance)、[第 10 章](/handbook/rag-finetuning-and-multimodal) | Skill 复现、工具控制与 Agent 决策资产。 |
| Agent 的结果受知识、记忆、工具或权限影响，责任却不清楚。 | [第 5 章](/handbook/data-knowledge-and-context)、[第 9 章](/handbook/agent-and-automation-governance)、[第 15 章](/handbook/security-and-compliance) | 上下文包、记忆合约、工具控制卡。 |
| 试点已经上线，但难以说明价值、质量或是否应该扩大。 | [第 8 章](/handbook/scale-use-cases-with-priority)、[第 11 章](/handbook/value-and-evaluation)、[第 12 章](/handbook/governance-and-organization) | 用例组合、评测和价值账本。 |
| 团队担心依赖、故障、合规或“AI 失效后谁接手”。 | [第 14 章](/handbook/ai-dependency-and-resilience)、[第 15 章](/handbook/security-and-compliance)、[附录 G](/appendices/ai-failure-casebook) | Runbook、事件记录、回退与复盘资产。 |

> 本手册中的公开案例、教学情景和受控运行证据有不同的外推边界。阅读案例前，请先查看[案例与证据阅读指南](/cases/guide)。如果你希望直接得到角色行动清单，请转到[角色化快速开始](/quickstart)，不要把本页当作另一套方法论。
