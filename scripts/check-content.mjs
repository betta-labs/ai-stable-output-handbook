/**
 * 运行手册档案馆：构建前守住内容真源，阻止失效的本地Markdown链接进入阅读站。
 */
import { access, readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const EXCLUDED_DIRECTORIES = new Set(['.git', '.github', '.handbook', '.vitepress', 'node_modules', 'public', 'scripts', '.ropeproject'])
const EXCLUDED_FILES = new Set(['README.md', 'index.md', 'start.md', 'templates.md', 'cases.md', 'download.md', 'updates.md'])
const markdownLink = /!?\[[^\]]*]\(([^)\s]+)(?:\s+['"][^'"]*['"])?\)/g

async function findMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!EXCLUDED_DIRECTORIES.has(entry.name)) files.push(...(await findMarkdownFiles(path.join(directory, entry.name))))
      continue
    }
    const relative = path.relative(ROOT, path.join(directory, entry.name))
    if (entry.isFile() && entry.name.endsWith('.md') && !EXCLUDED_FILES.has(relative)) files.push(path.join(directory, entry.name))
  }
  return files
}

const isExternal = (target) => /^(https?:|mailto:|tel:|#|data:)/i.test(target)
const exists = async (candidate) => access(candidate).then(() => true).catch(() => false)
const files = await findMarkdownFiles(ROOT)
const errors = []

for (const file of files) {
  const content = await readFile(file, 'utf8')
  const fileDir = path.dirname(file)
  const baseDirs = [fileDir]
  // VitePress 按重写后的路由目录解析相对链接：根级章节/附录源文件分别映射到 handbook/ 与 appendices/，
  // 因此来自这些文件的 "../" 链接需要按重写目录解析才能命中根级目标文件。
  if (fileDir === ROOT) baseDirs.push(path.join(ROOT, 'handbook'), path.join(ROOT, 'appendices'))
  for (const match of content.matchAll(markdownLink)) {
    const rawTarget = decodeURIComponent(match[1])
    if (isExternal(rawTarget)) continue
    const target = rawTarget.split('#')[0].split('?')[0]
    if (!target) continue
    let found = false
    for (const baseDir of baseDirs) {
      const absoluteTarget = path.resolve(baseDir, target)
      const candidates = path.extname(absoluteTarget) ? [absoluteTarget] : [absoluteTarget, `${absoluteTarget}.md`, path.join(absoluteTarget, 'README.md')]
      if ((await Promise.all(candidates.map(exists))).some(Boolean)) {
        found = true
        break
      }
    }
    if (!found) errors.push(`${path.relative(ROOT, file)} → ${rawTarget}`)
  }
}

const p0Sources = {
  readme: path.join(ROOT, 'README.md'),
  strategicOpening: path.join(ROOT, '01-开篇-企业AI战略与业务对齐.md'),
  start: path.join(ROOT, 'start.md'),
  quickstart: path.join(ROOT, 'quickstart.md'),
  executiveSummary: path.join(ROOT, 'executive-summary.md'),
  chapterTwo: path.join(ROOT, '02-第2章-自诊断：定位你的真实问题.md'),
  chapterFive: path.join(ROOT, '05-第5章-数据与知识：稳定产出的地基.md'),
  chapterSix: path.join(ROOT, '06-第6章-场景落地：最小闭环设计.md'),
  chapterSeven: path.join(ROOT, '07-第7章-员工工作方法：人机协作的日常实践.md'),
  chapterEight: path.join(ROOT, '08-第8章-从1到N：多场景扩展与优先级管理.md'),
  chapterNine: path.join(ROOT, '09-第9章-Agent与自动化：决策框架与治理要点.md'),
  chapterEleven: path.join(ROOT, '11-第11章-价值评估与评测体系：如何算清AI的账.md'),
  chapterTwelve: path.join(ROOT, '12-第12章-治理与组织协同.md'),
  chapterFourteen: path.join(ROOT, '14-第14章-AI依赖与组织韧性.md'),
  chapterSixteen: path.join(ROOT, '16-第16章-完整案例集.md'),
  appendix: path.join(ROOT, '17-附录A-可直接复用的清单与模板.md'),
  templates: path.join(ROOT, 'templates.md'),
  decisionKernel: path.join(ROOT, '.handbook', '核心决策内核.md'),
  chapterResponsibilityMap: path.join(ROOT, '.handbook', '章节职责卡.md'),
  maintenanceCadence: path.join(ROOT, '.handbook', '维护节奏与质量门.md'),
}

for (const [label, source] of Object.entries(p0Sources)) {
  if (!(await exists(source))) errors.push(`P0 一致性资产缺失：${label} → ${path.relative(ROOT, source)}`)
}

if (!errors.length) {
  const [readme, strategicOpening, start, quickstart, executiveSummary, chapterTwo, chapterFive, chapterSix, chapterSeven, chapterEight, chapterNine, chapterEleven, chapterTwelve, chapterFourteen, chapterSixteen, appendix, templates, decisionKernel, chapterResponsibilityMap, maintenanceCadence] = await Promise.all([
    readFile(p0Sources.readme, 'utf8'),
    readFile(p0Sources.strategicOpening, 'utf8'),
    readFile(p0Sources.start, 'utf8'),
    readFile(p0Sources.quickstart, 'utf8'),
    readFile(p0Sources.executiveSummary, 'utf8'),
    readFile(p0Sources.chapterTwo, 'utf8'),
    readFile(p0Sources.chapterFive, 'utf8'),
    readFile(p0Sources.chapterSix, 'utf8'),
    readFile(p0Sources.chapterSeven, 'utf8'),
    readFile(p0Sources.chapterEight, 'utf8'),
    readFile(p0Sources.chapterNine, 'utf8'),
    readFile(p0Sources.chapterEleven, 'utf8'),
    readFile(p0Sources.chapterTwelve, 'utf8'),
    readFile(p0Sources.chapterFourteen, 'utf8'),
    readFile(p0Sources.chapterSixteen, 'utf8'),
    readFile(p0Sources.appendix, 'utf8'),
    readFile(p0Sources.templates, 'utf8'),
    readFile(p0Sources.decisionKernel, 'utf8'),
    readFile(p0Sources.chapterResponsibilityMap, 'utf8'),
    readFile(p0Sources.maintenanceCadence, 'utf8'),
  ])

  if (/六个带来源和不可外推边界的公开案例/.test(readme)) {
    errors.push('README.md：不得以易漂移的固定案例数量描述第 16 章公开案例')
  }

  if (!/教学情景（非企业事实）：制造企业质检场景/.test(strategicOpening)) {
    errors.push('01-开篇-企业AI战略与业务对齐.md：制造企业示例必须显著标注为非企业事实教学情景')
  }

  if (!/\/handbook\/ai-strategy-and-alignment/.test(start)) {
    errors.push('start.md：必须将组织级取舍读者引导至战略与业务对齐页面')
  }

  if (!/本页不重定义战略、阶段闸门或指标/.test(quickstart)) {
    errors.push('quickstart.md：必须声明其角色行动页职责，不得重定义战略、阶段闸门或指标')
  }

  if (!chapterTwo.includes('## 先看答案：30 秒决定从哪里开始') || !chapterTwo.includes('读完本章，你应能完成三件事')) {
    errors.push('第2章：必须在首段诊断细节前说明30秒结论与读完可完成的行动产出')
  }

  if (!chapterSix.includes('## 先看答案：首轮先留下三项产出') || !chapterSix.includes('会让试点越做越乱的五种做法')) {
    errors.push('第6章：必须在完整步骤前提供首轮三项产出与高影响反模式')
  }

  if (!templates.includes('## L0：第一次只用三项已有资产') || !appendix.includes('## L0：第一次先完成三项已有资产')) {
    errors.push('模板入口与附录A：必须保留L0三项启动路径，避免首次使用者被全量模板淹没')
  }

  if (!start.includes('试点越做越乱') || !start.includes('先停止扩大和提高自主性')) {
    errors.push('start.md：必须为失控试点提供停止扩大、回退人工和记录失败的入口')
  }

  if (!start.includes('## 本手册的能力圈：先判断应如何使用')) {
    errors.push('start.md：必须保留可直接开始、探索性使用与需要专业介入的能力圈边界')
  }

  const fourQuestionsPattern = /谁判断[\s\S]{0,40}依据什么[\s\S]{0,40}记录什么[\s\S]{0,40}缺什么就停止/
  if (!fourQuestionsPattern.test(chapterSix) || !fourQuestionsPattern.test(appendix)) {
    errors.push('第6章与附录A：关键控制点必须保留“谁判断、依据什么、记录什么、缺什么就停止”的可填写规则')
  }

  if (!chapterSix.includes('探索轨不是受控运行的简化版') || !appendix.includes('选择探索轨或受控运行轨')) {
    errors.push('第6章与附录A：必须区分可逆探索与受控运行，并说明切换条件')
  }

  if (!chapterFive.includes('探索性材料') || !chapterFive.includes('正式运行上下文') || !chapterFive.includes('权威知识')) {
    errors.push('第5章：必须说明探索性材料不能自动升级为正式上下文或权威知识')
  }

  if (!chapterNine.includes('模型层') || !chapterNine.includes('没有统一的失效步数') || !chapterNine.includes('关键检查点')) {
    errors.push('第9章：必须区分Agent的模型、任务环境与控制边界，并避免固定步数阈值')
  }

  if (!chapterEleven.includes('单位任务可归属总成本') || !chapterEleven.includes('失败、重试、未采用输出')) {
    errors.push('第11章：必须以单位任务、失败重试与人工接管审视规模经济性')
  }

  if (!chapterEleven.includes('本期证据如何改变信心') || !chapterEleven.includes('先检查指标会奖励什么行为')) {
    errors.push('第11章：必须说明证据如何更新判断，并防止指标和激励将团队推向错误行为')
  }

  if (!chapterEight.includes('加入机会成本与二阶效应，再作取舍') || !chapterEight.includes('可用的Owner、审核与回退能力决定并行数量')) {
    errors.push('第8章：扩展排序必须保留机会成本、二阶影响与能力约束，不能依赖固定加权分或并行数量')
  }

  if (!chapterFourteen.includes('耦合与传播方式')) {
    errors.push('第14章：依赖设计必须说明耦合升高时的传播风险、验证与回退要求')
  }

  if (!chapterSeven.includes('员工可直接使用的暂停、拒绝与上报话术') || !chapterSeven.includes('任何人都可以暂停或转人工')) {
    errors.push('第7章：必须提供员工可直接使用的暂停、拒绝与上报话术，并明确暂停/转人工权利')
  }

  if (!chapterEleven.includes('评测后的反证式决策卡') || !chapterEleven.includes('即使改善仍应暂停/缩小') || !chapterEleven.includes('唯一权威版本')) {
    errors.push('第11章：指标说明必须包含反证式继续、缩小与暂停决策')
  }

  if (!chapterTwelve.includes('角色、决定权与替补：不能只写一个 Owner 名称') || !chapterTwelve.includes('AI Champion')) {
    errors.push('第12章：必须明确角色决定权、替补边界及 AI Champion 的非审批职责')
  }

  if (!chapterTwelve.includes('先检查激励没有把正确行为推走')) {
    errors.push('第12章：必须检查激励是否错误奖励调用量、演示或扩大，并支持报告失败和正确暂停')
  }

  if (!appendix.includes('当前不优先的备选场景/非 AI 替代方案') || !appendix.includes('耦合与传播：')) {
    errors.push('附录A用例立项卡：必须保留机会成本、二阶影响以及耦合/单点故障的最小记录')
  }

  if (!executiveSummary.includes('一个可调整的示例节奏') || !executiveSummary.includes('高管的反证追问') || !executiveSummary.includes('第 11 章的反证式决策卡')) {
    errors.push('executive-summary.md：90天路线必须保持为可调整示例，并把详细反证决策指向第11章唯一权威卡')
  }

  if (chapterSixteen.includes('第 5 章场景标准')) {
    errors.push('第16章：场景选择标准已位于第6章，不得保留“第5章场景标准”的过期引用')
  }

  if (!appendix.includes('## 资产地图：按阶段与风险只取当前必需的资产') || !templates.includes('## 阶段 × 风险资产地图')) {
    errors.push('附录A与模板入口：必须保留按阶段与风险选择最小资产的低摩擦导航')
  }

  const assetAnchors = [...new Set([...appendix.matchAll(/#(asset-[a-z0-9-]+)/g), ...templates.matchAll(/#(asset-[a-z0-9-]+)/g)].map((match) => match[1]))]
  for (const anchor of assetAnchors) {
    if (!appendix.includes(`<a id="${anchor}"></a>`)) errors.push(`附录A：语义锚点“#${anchor}”缺少对应目标`)
  }

  for (const heading of ['## 一、唯一的核心问题', '## 二、唯一的决策链', '## 三、核心术语与边界', '## 四、阶段闸门与证据', '## 五、入口页面的职责边界', '## 六、变更与复核规则']) {
    if (!decisionKernel.includes(heading)) errors.push(`.handbook/核心决策内核.md：缺少必需章节“${heading}”`)
  }

  if (!decisionKernel.includes('探索轨') || !maintenanceCadence.includes('探索与受控运行')) {
    errors.push('内部维护资产：必须保留探索轨与受控运行轨的风险相称切换规则')
  }

  for (const chapter of ['开篇：战略与业务对齐', '第 2 章：自诊断', '第 6 章：最小闭环', '第 9 章：Agent 与自动化', '第 11 章：价值与评测', '第 15 章：安全与合规', '第 16 章：案例集']) {
    if (!chapterResponsibilityMap.includes(chapter)) errors.push(`.handbook/章节职责卡.md：缺少关键章节职责“${chapter}”`)
  }

  if (!appendix.includes('## 55. 第二使用者复现与接棒验证记录模板')) {
    errors.push('17-附录A-可直接复用的清单与模板.md：缺少第二使用者复现与接棒验证记录模板')
  }

  for (const heading of ['## 二、月度轻量复核（30–60 分钟）', '## 三、季度深度复核（半天）', '## 四、发布质量门', '## 五、变更记录模板']) {
    if (!maintenanceCadence.includes(heading)) errors.push(`.handbook/维护节奏与质量门.md：缺少必需章节“${heading}”`)
  }

  if (!maintenanceCadence.includes('关键行动还应能回答“谁判断、依据什么、记录什么、缺什么就停止”')) {
    errors.push('.handbook/维护节奏与质量门.md：必须维护关键行动的四问规则')
  }

  if (!chapterResponsibilityMap.includes('可直接使用的暂停/拒绝/上报话术') || !chapterResponsibilityMap.includes('反证式指标解释')) {
    errors.push('.handbook/章节职责卡.md：必须反映员工升级语言和评测反证职责')
  }
}

if (errors.length) {
  console.error('内容校验失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`内容校验通过：检查了 ${files.length} 个Markdown文件的本地链接及 P0 一致性规则。`)
