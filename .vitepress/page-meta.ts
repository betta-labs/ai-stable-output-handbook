/**
 * 运行手册档案馆：页面标题、摘要与稳定路由集中在此处维护。
 * Markdown 仍是唯一正文真源；本文件只补充站点阅读与SEO元信息。
 */

export type PageMeta = {
  title: string
  description: string
}

export const pageRoutes: Record<string, string> = {
  'about.md': 'about.md',
  'executive-summary.md': 'executive-summary.md',
  'quickstart.md': 'quickstart.md',
  'lightweight-start.md': 'lightweight-start.md',
  '00-自序.md': 'handbook/preface.md',
  '01-开篇-企业AI战略与业务对齐.md': 'handbook/ai-strategy-and-alignment.md',
  '01-第1章-企业AI为什么难以稳定产出.md': 'handbook/why-ai-output-is-unstable.md',
  '02-第2章-自诊断：定位你的真实问题.md': 'handbook/diagnose-your-constraint.md',
  '03-第3章-认知校准：AI的真实能力边界.md': 'handbook/calibrate-ai-capabilities.md',
  '04-第4章-从单次生成到可复现工作流.md': 'handbook/from-generation-to-reproducible-workflows.md',
  '05-第5章-数据与知识：稳定产出的地基.md': 'handbook/data-knowledge-and-context.md',
  '06-第6章-场景落地：最小闭环设计.md': 'handbook/design-a-minimum-closed-loop.md',
  '07-第7章-员工工作方法：人机协作的日常实践.md': 'handbook/daily-human-ai-collaboration.md',
  '08-第8章-从1到N：多场景扩展与优先级管理.md': 'handbook/scale-use-cases-with-priority.md',
  '09-第9章-Agent与自动化：决策框架与治理要点.md': 'handbook/agent-and-automation-governance.md',
  '10-第10章-能力专题：RAG、微调与多模态的适用判断.md': 'handbook/rag-finetuning-and-multimodal.md',
  '11-第11章-价值评估与评测体系：如何算清AI的账.md': 'handbook/value-and-evaluation.md',
  '12-第12章-治理与组织协同.md': 'handbook/governance-and-organization.md',
  '13-第13章-人机协同与组织生产方式.md': 'handbook/human-ai-collaboration-and-work.md',
  '14-第14章-AI依赖与组织韧性.md': 'handbook/ai-dependency-and-resilience.md',
  '15-第15章-安全与合规.md': 'handbook/security-and-compliance.md',
  '16-第16章-完整案例集.md': 'handbook/public-cases-and-teaching-scenarios.md',
  '16-后记-从个人提效到企业级稳定产出.md': 'handbook/afterword.md',
  '17-附录A-可直接复用的清单与模板.md': 'appendices/reusable-checklists-and-templates.md',
  '18-附录B-常用指标与评测方法.md': 'appendices/metrics-and-evaluation.md',
  '19-附录C-工具与平台参考.md': 'appendices/tools-and-platforms.md',
  '20-附录D-资料出处与延伸阅读.md': 'appendices/sources-cases-and-fact-maintenance.md',
  '21-附录E-关于作者与进一步交流.md': 'appendices/about-the-author.md',
  '22-附录F-术语表.md': 'appendices/glossary.md',
  '23-附录G-AI-Failure-Casebook.md': 'appendices/ai-failure-casebook.md',
  'evidence/README.md': 'evidence/pilot-evidence-pack.md',
  'evidence/UC-CS-001_客户咨询回复试点证据包.md': 'evidence/UC-CS-001_客户咨询回复试点证据包.md',
  'evidence/UC-PROD-001_会议纪要试点证据包.md': 'evidence/UC-PROD-001_会议纪要试点证据包.md',
  'facts/模型与工具动态事实卡登记册.md': 'facts/model-and-tool-fact-register.md',
  'learn/enterprise-ai/index.md': 'learn/enterprise-ai/index.md',
  'learn/enterprise-ai/implementation.md': 'learn/enterprise-ai/implementation.md',
  'learn/enterprise-ai/minimum-closed-loop.md': 'learn/enterprise-ai/minimum-closed-loop.md',
  'learn/enterprise-ai/roi.md': 'learn/enterprise-ai/roi.md',
  'learn/ai-agent/index.md': 'learn/ai-agent/index.md',
  'learn/ai-agent/governance.md': 'learn/ai-agent/governance.md',
  'learn/ai-agent/workflow-vs-agent.md': 'learn/ai-agent/workflow-vs-agent.md',
  'learn/ai-reliability/index.md': 'learn/ai-reliability/index.md',
  'learn/ai-reliability/output-quality.md': 'learn/ai-reliability/output-quality.md',
  'learn/ai-reliability/knowledge-base.md': 'learn/ai-reliability/knowledge-base.md',
  'learn/ai-reliability/evaluation.md': 'learn/ai-reliability/evaluation.md'
}

export const pageMeta: Record<string, PageMeta> = {
  'about.md': { title: '关于作者与本书编撰说明', description: '了解《企业 AI 落地实战手册》的作者背景、研究方法、维护节奏、v2.1.0 版本历史与引用规范。' },
  'executive-summary.md': { title: '高管执行摘要：企业 AI 落地决策要览', description: '面向 CEO 与业务高管的企业 AI 落地决策摘要：核心论点、90 天节奏、10 条治理铁律、阶段闸门、反证指标与风险签字责任。' },
  'quickstart.md': { title: '角色化快速开始：从战略到落地的行动路线', description: '按 CEO、业务负责人、一线员工、知识/技术 Owner 与 AI COE/FDE 角色，拆解企业 AI 落地第一周到第一季度的行动清单。' },
  'lightweight-start.md': { title: '企业 AI 轻量启动：小团队如何先跑第一个最小闭环', description: '面向人少预算有限团队的轻量落地路径：用高频小场景、代替账/损失账/验收账与 L0 三项资产决定继续、缩小或停止。' },
  '00-自序.md': { title: '自序：为什么先建运行系统，而不是先换模型', description: '理解《企业 AI 落地实战手册》的写作初衷、证据边界，以及从个人提效迈向企业级稳定产出的核心命题。' },
  '01-开篇-企业AI战略与业务对齐.md': { title: '企业 AI 战略与业务对齐：先决定为什么做与不做什么', description: '启动试点前先完成战略内核、业务目标—用例树、暂缓/禁区清单、预算排序与内部工作流/对外产品边界声明。' },
  '01-第1章-企业AI为什么难以稳定产出.md': { title: '第 1 章：企业 AI 为什么难以稳定产出', description: '识别个人提效与组织稳定产出之间的鸿沟，理解预期错位、能力边界、流程断裂与运营缺失四类系统性原因。' },
  '02-第2章-自诊断：定位你的真实问题.md': { title: '第 2 章：自诊断，定位企业 AI 落地的真实约束', description: '从业务决定、输入边界、人工接管与流程数据底座四项阻塞条件出发，用四层症状分诊定位真实约束并获取行动路由。' },
  '03-第3章-认知校准：AI的真实能力边界.md': { title: '第 3 章：认知校准与推理模型选型边界', description: '以任务和内部评测校准模型能力预期，涵盖推理模型（Reasoning）测试时计算经济学、动态模型路由与动态事实治理。' },
  '04-第4章-从单次生成到可复现工作流.md': { title: '第 4 章：从单次生成到可复现工作流与 Skill', description: '掌握 Prompt、Skill、工作流合约与受控 Agent 的复杂度后置路径，以及 JSON Schema 受限解码等确定性约束机制。' },
  '05-第5章-数据与知识：稳定产出的地基.md': { title: '第 5 章：数据、知识与上下文工程底座', description: '实践企业级上下文工程（Context Engineering）：区分六类上下文资产、构建最小上下文包并隔离探索性材料与权威知识。' },
  '06-第6章-场景落地：最小闭环设计.md': { title: '第 6 章：场景落地与最小闭环设计', description: '区分探索轨与受控运行轨，按后果选择监督方式，完成企业 AI 第一个有边界、可验证、可回退的最小闭环。' },
  '07-第7章-员工工作方法：人机协作的日常实践.md': { title: '第 7 章：员工工作方法与日常人机协作', description: '为一线员工提供低风险探索绿灯、任务四象限、三段式协作节奏，以及可直接使用的暂停、拒绝与上报话术。' },
  '08-第8章-从1到N：多场景扩展与优先级管理.md': { title: '第 8 章：从 1 到 N 的扩展节奏与共享基建判断', description: '结合机会成本与能力约束排序多场景用例组合，明确 ≥3 用例时从单场景自建转向 AI 网关与共享基建的触发条件。' },
  '09-第9章-Agent与自动化：决策框架与治理要点.md': { title: '第 9 章：Agent 与自动化治理决策框架', description: '用六步决策树判断是否需要 Agent，并通过运行合约、状态机、工具调用幂等性、外部检查点、事务补偿与熔断保障可控运行。' },
  '10-第10章-能力专题：RAG、微调与多模态的适用判断.md': { title: '第 10 章：RAG、Agentic Retrieval、微调与多模态选型', description: '先跑稳 Skill 与最小上下文包，再按任务需求判断固定 RAG、Agentic 检索、持久记忆、微调与多模态能力的适用边界。' },
  '11-第11章-价值评估与评测体系：如何算清AI的账.md': { title: '第 11 章：AI 价值评估（ROI）与评测体系', description: '用单位任务全成本 TCO、已实现财务收益与反证式决策卡算清 AI 账，建立人类校准的 LLM-as-a-Judge 与轨迹级 CI 评测门禁。' },
  '12-第12章-治理与组织协同.md': { title: '第 12 章：AI 治理、组织协同与 FDE 交付接棒', description: '明确多角色 RACI 与激励检查，落地 FDE/AI COE 四周交付节奏、不用判据、国内交付错配防范及客户方接棒验收标准。' },
  '13-第13章-人机协同与组织生产方式.md': { title: '第 13 章：人机协同与目标受托工作流', description: '从对话辅助演进到目标受托与 Agent 协作网络，以“委托—复核—拥有”分工和目标契约重构组织工作单元。' },
  '14-第14章-AI依赖与组织韧性.md': { title: '第 14 章：AI 依赖、韧性与事件恢复演练', description: '建立关键依赖地图、模型与连接器可切换设计、E0–E3 事件分级、Runbook、人工备用流程与无责复盘机制。' },
  '15-第15章-安全与合规.md': { title: '第 15 章：企业 AI 安全治理与中美欧合规边界', description: '覆盖数据分级、PII 脱敏、中国生成式 AI 暂行办法与内容标识（GB 45438-2025）、EU AI Act 参照及 OWASP 2026 / MCP 安全控制。' },
  '16-第16章-完整案例集.md': { title: '第 16 章：公开案例与多场景教学情景集', description: '拆解带不可外推边界的中外公开案例，以及周会纪要、客服草稿、Text-to-SQL 取数与 Coding Agent CI 门禁等教学情景。' },
  '17-附录A-可直接复用的清单与模板.md': { title: '附录 A：企业 AI 落地清单、模板与机器可读契约', description: '提供 L0 启动套件、55 节治理模板及 YAML Skill 清单、JSON Schema 输出约束与 JSONL Golden Set 回归样例。' },
  '20-附录D-资料出处与延伸阅读.md': { title: '附录 D：来源登记、公开案例与法规标准参照', description: '查阅全书 A–D 级外部来源、公开案例登记册、匿名研究观察边界，以及中美欧 AI 法规与 OWASP 安全标准官方出处。' },
  '23-附录G-AI-Failure-Casebook.md': { title: '附录 G：企业 AI 故障与失败案例集（Failure Casebook）', description: '检索提示注入、上下文债务、微调适配变窄、Agent 越权调用与不可信上下文等典型故障信号、根因与复验要点。' },
  '16-后记-从个人提效到企业级稳定产出.md': { title: '后记：从个人提效到企业级稳定产出', description: '回顾企业 AI 落地从局部效率到可复核、可维护、可接管组织能力的系统化演进终点。' },
  '18-附录B-常用指标与评测方法.md': { title: '附录 B：AI 落地常用指标口径与评测方法', description: '获取一次通过率、实际采用率、端到端耗时、来源可定位率、人工接管率及培训健康度的标准定义与复核节奏。' },
  '19-附录C-工具与平台参考.md': { title: '附录 C：模型、MCP 与工具平台核验指南', description: '按功能范围、数据留存合规、权限动作与退出迁移四维尽调清单，评估大模型 API、网关、RAG 与 MCP 连接器。' },
  '21-附录E-关于作者与进一步交流.md': { title: '附录 E：关于作者与进一步交流', description: '了解《企业 AI 落地实战手册》作者背景、CC BY-NC 4.0 开源协作规范与企业诊断交流入口。' },
  '22-附录F-术语表.md': { title: '附录 F：企业 AI 落地与治理术语表', description: '统一查询 Prompt、Skill、工作流合约、上下文包、Agent、Golden Set、NHI 与 Runbook 等全书核心术语定义。' },
  'evidence/README.md': { title: '试点运行证据包总览', description: '查看企业 AI 试点如何按“待现场验证”标准记录范围、样本、审核、回归与移交证据的规范结构。' },
  'evidence/UC-CS-001_客户咨询回复试点证据包.md': { title: '客户咨询回复（UC-CS-001）：试点证据包', description: '查看高频客户咨询回复草拟用例的 R2 风险边界、Golden Set 样本设计、现场验证任务与验收条件。' },
  'evidence/UC-PROD-001_会议纪要试点证据包.md': { title: '会议纪要（UC-PROD-001）：试点证据包', description: '查看产品周会纪要提取用例的试点控制设计、第二使用者复现计划、验收标准与待验证字段。' },
  'facts/模型与工具动态事实卡登记册.md': { title: '模型、API 与 MCP 动态事实卡登记册', description: '按版本、端点、留存政策与核验日期登记外部模型、API 平台及 MCP Server 安全边界的可追溯事实卡。' },
  'learn/enterprise-ai/index.md': { title: '企业 AI 落地指南：从工具到组织生产能力', description: '汇总企业 AI 落地常见失败原因、五步实施方法、最小闭环设计与 ROI 真实评估口径的专题速查入口。' },
  'learn/enterprise-ai/implementation.md': { title: '企业 AI 怎么落地？从工具到组织能力的五步方法', description: '企业 AI 落地不是采购工具或做一次 Demo。按五步方法定位问题、设计最小闭环、验证价值并持续运营。' },
  'learn/enterprise-ai/minimum-closed-loop.md': { title: '企业 AI 最小闭环怎么设计？从试点到生产的完整路径', description: '最小闭环是验证企业 AI 用例的最低成本方式。掌握场景选择、任务定义、验证清单与阶段闸门。' },
  'learn/enterprise-ai/roi.md': { title: '企业 AI ROI 怎么算？避免三种“假账”的价值评估方法', description: 'AI ROI 常被高估。用损失账/代替账/验收账及 TCO、已实现收益与容量价值代理口径，算清企业 AI 真实回报。' },
  'learn/ai-agent/index.md': { title: '企业 AI Agent 落地指南：治理、评测与人工接管', description: '企业 AI Agent 的价值来自受控编排而非盲目自主。理解 Agent 适用条件、运行合约与最小权限治理要点。' },
  'learn/ai-agent/governance.md': { title: 'AI Agent 如何治理？权限、上下文、工具与人工接管', description: 'AI Agent 治理不等于事后审核。用运行合约、最小权限、状态机白名单、预算熔断与人工接管让 Agent 安全可控。' },
  'learn/ai-agent/workflow-vs-agent.md': { title: 'AI Agent 和 AI 工作流有什么区别？什么时候才需要 Agent', description: '先固定工作流，再评估 Agent。理解两种技术形态的控制边界，避免为“更智能”增加不必要的复杂度与失败传播。' },
  'learn/ai-reliability/index.md': { title: 'AI 输出质量与稳定产出指南：让结果可复核、可维护', description: 'AI 输出不稳定通常不是模型问题。从任务定义、知识治理、上下文工程、验证清单与回退路径定位修复根因。' },
  'learn/ai-reliability/output-quality.md': { title: 'AI 输出不稳定怎么办？定位与修复的四层检查', description: 'AI 输出时好时坏？按任务定义、数据知识、工作流与治理评测四层定位根因，用验证清单与回退机制稳定结果。' },
  'learn/ai-reliability/knowledge-base.md': { title: '企业 AI 知识库怎么建设？为什么“把文档丢进 RAG”不够', description: '企业知识库稳定产出的前提是 Owner、版本与来源治理，而非检索技术。先建最小上下文包，再按需引入 RAG。' },
  'learn/ai-reliability/evaluation.md': { title: 'AI 效果怎么评测？从一次通过率到真实价值的三级指标', description: 'AI 评测先定义“好”再测量。用验证清单、Rubric、实际采用率与运行证据区分“通过检查”和“被业务采用”。' }
}

export function routeForSource(source: string): string {
  const rewritten = pageRoutes[source] ?? source
  const withoutExtension = rewritten.replace(/\.md$/, '')
  return withoutExtension === 'index' ? '/' : `/${withoutExtension.replace(/\/index$/, '')}`
}
