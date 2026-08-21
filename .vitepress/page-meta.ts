/**
 * 运行手册档案馆：页面标题、摘要与稳定路由集中在此处维护。
 * Markdown 仍是唯一正文真源；本文件只补充站点阅读与SEO元信息。
 */

export type PageMeta = {
  title: string
  description: string
}

export const pageRoutes: Record<string, string> = {
  '00-自序.md': 'handbook/preface.md',
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
  'facts/模型与工具动态事实卡登记册.md': 'facts/model-and-tool-fact-register.md'
}

export const pageMeta: Record<string, PageMeta> = {
  '00-自序.md': { title: '自序：为什么要讨论企业 AI 的稳定产出', description: '理解本手册的写作动机、使用边界，以及从个人提效到企业运行系统的核心问题。' },
  '01-第1章-企业AI为什么难以稳定产出.md': { title: '第 1 章：企业 AI 为什么难以稳定产出', description: '识别个人提效与组织提效之间的鸿沟，理解企业 AI 结果不稳定的系统性原因。' },
  '02-第2章-自诊断：定位你的真实问题.md': { title: '第 2 章：自诊断，定位你的真实问题', description: '从场景、上下文、工具、责任与验证等维度，定位企业 AI 当前最真实的约束。' },
  '03-第3章-认知校准：AI的真实能力边界.md': { title: '第 3 章：认知校准，AI 的真实能力边界', description: '以任务和证据而非抽象能力叙事校准预期，并建立模型与工具的动态事实治理。' },
  '04-第4章-从单次生成到可复现工作流.md': { title: '第 4 章：从单次生成到可复现工作流', description: '理解 Prompt、Skill、工作流与受控 Agent 的升级路径，以及贯穿各层的上下文资产。' },
  '05-第5章-数据与知识：稳定产出的地基.md': { title: '第 5 章：数据、知识与上下文', description: '把数据、知识、上下文、记忆和工具结果组织为企业 Agent 的可维护运行底座。' },
  '06-第6章-场景落地：最小闭环设计.md': { title: '第 6 章：场景落地与最小闭环设计', description: '为企业 AI 设计可验证、有边界、可回退的第一个试点闭环。' },
  '07-第7章-员工工作方法：人机协作的日常实践.md': { title: '第 7 章：员工工作方法与日常人机协作', description: '将个人协作习惯发展为分角色实践、经理行动与采纳反馈闭环。' },
  '08-第8章-从1到N：多场景扩展与优先级管理.md': { title: '第 8 章：从 1 到 N 的扩展与优先级', description: '从单个用例扩展为可治理的用例组合，并管理优先级、阶段与规模化节奏。' },
  '09-第9章-Agent与自动化：决策框架与治理要点.md': { title: '第 9 章：Agent 与自动化的决策和治理', description: '判断何时使用 Agent，并治理上下文、工具、权限、评测、熔断与人工接管。' },
  '10-第10章-能力专题：RAG、微调与多模态的适用判断.md': { title: '第 10 章：RAG、微调与多模态的适用判断', description: '先完善 Skill 与最小上下文包，再按任务选择检索、记忆、工具或其他进阶能力。' },
  '11-第11章-价值评估与评测体系：如何算清AI的账.md': { title: '第 11 章：价值评估与评测体系', description: '以 TCO、已实现收益、容量价值和运行证据，评估企业 AI 的真实价值。' },
  '12-第12章-治理与组织协同.md': { title: '第 12 章：治理与组织协同', description: '建立上下文、记忆、工具 Owner，以及 FDE、AI COE 的共创交付与能力移交机制。' },
  '13-第13章-人机协同与组织生产方式.md': { title: '第 13 章：人机协同与组织生产方式', description: '从对话辅助到目标受托，理解工作单元、角色、上下文和反馈如何共同演进。' },
  '14-第14章-AI依赖与组织韧性.md': { title: '第 14 章：AI 依赖与组织韧性', description: '设计事件分级、Runbook、人工备用、依赖切换、恢复演练与无责复盘机制。' },
  '15-第15章-安全与合规.md': { title: '第 15 章：安全与合规', description: '处理数据分级、PII 脱敏、不可信上下文、工具连接器和输出审核的控制边界。' },
  '16-第16章-完整案例集.md': { title: '第 16 章：公开案例、教学情景与完整案例集', description: '阅读带来源与外推边界的公开案例，以及明确标注为非事实记录的教学情景。' },
  '17-附录A-可直接复用的清单与模板.md': { title: '附录 A：可直接复用的清单与模板', description: '复用用例立项、上下文包、记忆合约、工具控制卡、Agent 评测与目标契约等资产。' },
  '20-附录D-资料出处与延伸阅读.md': { title: '附录 D：来源、公开案例与事实维护规范', description: '查看全书真实链接、公开案例登记、动态事实与引用规则，以及证据边界。' },
  '23-附录G-AI-Failure-Casebook.md': { title: '附录 G：AI Failure Casebook', description: '查阅去标识化故障模式，理解上下文债务、记忆污染和工具异常的诊断与复盘。' },
  '16-后记-从个人提效到企业级稳定产出.md': { title: '后记：从个人提效到企业级稳定产出', description: '回顾如何把个人效率尝试沉淀为可复核、可维护、可接管的企业 AI 运行系统。' },
  '18-附录B-常用指标与评测方法.md': { title: '附录 B：常用指标与评测方法', description: '参考企业 AI 质量、效率、成本、风险与运行稳定性的常用指标、口径和评测方法。' },
  '19-附录C-工具与平台参考.md': { title: '附录 C：工具与平台参考', description: '以动态事实治理视角查看 AI 工具、平台与连接器的参考信息及选型边界。' },
  '21-附录E-关于作者与进一步交流.md': { title: '附录 E：关于作者与进一步交流', description: '了解《企业 AI 稳定产出手册》的作者、开源协作方式与进一步交流入口。' },
  '22-附录F-术语表.md': { title: '附录 F：术语表', description: '查询企业 AI 稳定产出、Skill、Agent、上下文、评测、治理与韧性相关术语。' },
  'evidence/README.md': { title: '试点运行证据包', description: '查看企业 AI 试点如何记录范围、输入、评测、复核、偏差与后续决策的证据包结构。' },
  'evidence/UC-CS-001_客户咨询回复试点证据包.md': { title: '客户咨询回复：试点运行证据包', description: '查看客户咨询回复用例的试点范围、评测方法、运行证据与使用边界。' },
  'evidence/UC-PROD-001_会议纪要试点证据包.md': { title: '会议纪要：试点运行证据包', description: '查看会议纪要用例的试点范围、评测方法、运行证据与使用边界。' },
  'facts/模型与工具动态事实卡登记册.md': { title: '模型与工具动态事实卡登记册', description: '查看如何登记、核验、复审和更新企业 AI 模型与工具的动态事实。' }
}

export function routeForSource(source: string): string {
  const rewritten = pageRoutes[source] ?? source
  const withoutExtension = rewritten.replace(/\.md$/, '')
  return withoutExtension === 'index' ? '/' : `/${withoutExtension.replace(/\/index$/, '')}`
}
