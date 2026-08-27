---
title: 模板与清单
description: 从用例立项、上下文、记忆、工具控制到Agent评测与Runbook，快速定位可复用的手册资产。
outline: false
editLink: false
---

<!-- 运行手册档案馆：把可复用资产从长篇目录中抽出，形成低摩擦的行动入口。 -->

# 模板与清单

模板不是“填完即可上线”的表单，而是帮助团队把边界、责任、证据和回退方式写清楚的控制资产。**不要一次性下载 55 节模板。** 先按当前阶段和风险等级取得 3–5 项最小资产；当范围、权限、影响或自动化程度改变时，再启用条件触发的资产。

## 先选入口：你现在卡在哪里

| 你现在的情况 | 先做什么 | 直接进入 |
| --- | --- | --- |
| 还在判断一个任务是否值得做 | 用业务语言写出问题、边界、Owner 和不可接受结果；R2/R3 同时完成风险判断。 | [场景选择与立项](./17-附录A-可直接复用的清单与模板.md#asset-scenario-selection) · [用例立项卡](./17-附录A-可直接复用的清单与模板.md#asset-use-case-charter) |
| 已选任务，想跑第一个受控闭环 | 写任务定义，固定提示词和验证，记录失败并建立升级路径。 | [任务定义](./17-附录A-可直接复用的清单与模板.md#asset-task-definition) · [验证清单](./17-附录A-可直接复用的清单与模板.md#asset-verification-checklist) · [周度评测](./17-附录A-可直接复用的清单与模板.md#asset-weekly-evaluation) |
| 第一个闭环跑通，准备多人复用 | 将能力固化为 Skill/工作流，建立 Golden Set、健康卡和限量发布记录。 | [Skill 卡](./17-附录A-可直接复用的清单与模板.md#asset-skill-card) · [工作流合约](./17-附录A-可直接复用的清单与模板.md#asset-workflow-contract) · [发布登记](./17-附录A-可直接复用的清单与模板.md#asset-release-register) |
| 准备引入 Agent、工具或权限 | 先确认固定流程是否不足，再补 Agent、上下文、记忆、工具和目标控制资产。 | [第 9 章](/handbook/agent-and-automation-governance) · [Agent 运行合约](./17-附录A-可直接复用的清单与模板.md#asset-agent-contract) · [工具控制卡](./17-附录A-可直接复用的清单与模板.md#asset-tool-control) |
| 已持续运行，需要评测、恢复或移交 | 用健康卡、变更回归、Runbook、人工备用和第二使用者验证维持可接管性。 | [健康卡](./17-附录A-可直接复用的清单与模板.md#asset-health-card) · [Runbook](./17-附录A-可直接复用的清单与模板.md#asset-runbook) · [接棒验证](./17-附录A-可直接复用的清单与模板.md#asset-second-user-validation) |

## 阶段 × 风险资产地图

[查看附录 A 的完整阶段×风险资产地图](./17-附录A-可直接复用的清单与模板.md#资产地图按阶段与风险只取当前必需的资产)。它将候选、试点、限量运行和规模化阶段与 R1–R4 风险等级交叉，只列出当前最低必需资产；R4 不是“多一份表”，而是暂停并补齐阻塞条件。

| 阶段 | 建议资产 | 进入位置 |
| --- | --- | --- |
| 选择第一个场景 | 用例立项、最小闭环、风险初筛 | [第 6 章](/handbook/design-a-minimum-closed-loop) · [附录 A 资产地图](./17-附录A-可直接复用的清单与模板.md#资产地图按阶段与风险只取当前必需的资产) |
| 固化可复现工作 | Skill 复现包、上下文包、输入/输出契约 | [第 4 章](/handbook/from-generation-to-reproducible-workflows) · [第 5 章](/handbook/data-knowledge-and-context) |
| 引入 Agent 与工具 | 记忆合约、工具控制卡、Agent 目标契约 | [第 9 章](/handbook/agent-and-automation-governance) · [附录 A](./17-附录A-可直接复用的清单与模板.md#asset-agent-contract) |
| 评测与价值判断 | Rubric、运行证据、TCO/已实现收益/容量价值账本 | [第 11 章](/handbook/value-and-evaluation) · [附录 B](/appendices/metrics-and-evaluation) |
| 发布与长期运营 | Runbook、事件记录、接棒/退出、无责复盘 | [第 12 章](/handbook/governance-and-organization) · [第 14 章](/handbook/ai-dependency-and-resilience) |

> 所有模板均以仓库当前版本为准。复用前请检查其中的版本、Owner、适用范围、四问和待验证项；R3/R4 情形仍须按组织适用要求完成业务、风险、安全、法务或行业专业判断。
