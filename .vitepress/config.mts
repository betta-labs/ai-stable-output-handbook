/**
 * 运行手册档案馆：以证据、版本、控制点和任务分流组织阅读。
 * 该配置只提供阅读层；仓库根目录的Markdown、事实卡与证据包仍是唯一内容真源。
 */
import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import path from 'node:path'
import { pageMeta, pageRoutes, routeForSource } from './page-meta'

const SITE_URL = 'https://handbook.sanage.xyz'
const REPOSITORY_URL = 'https://github.com/betta-labs/ai-stable-output-handbook'
const DEFAULT_DESCRIPTION = '面向业务、交付、治理与培训的企业 AI 方法手册：从最小闭环到可复核、可维护、可接管的运行系统。'
const requestedBase = process.env.VITEPRESS_BASE ?? '/'
const BASE = (() => {
  const trimmed = requestedBase.trim().replace(/^\/+|\/+$/g, '')
  return trimmed ? `/${trimmed}/` : '/'
})()
const assetUrl = (file: string) => `${BASE}${file.replace(/^\//, '')}`
const OG_IMAGE = `${SITE_URL}/og-handbook.png`
const AUTHOR_URL = `${SITE_URL}/appendices/about-the-author`
const PUBLISHER = { '@type': 'Organization', name: 'SANAGE', url: 'https://sanage.xyz/' }

// VitePress 死链检查按源码路径比较，而本站把源码重写为英文路由；
// 这里从 pageRoutes 生成合法路径白名单（含路由与源码两种形式），避免误报。
const knownLinkPaths = new Set<string>()
for (const source of Object.keys(pageRoutes)) {
  const withoutExt = source.replace(/\.md$/, '')
  knownLinkPaths.add(withoutExt)
  knownLinkPaths.add(withoutExt.replace(/\/index$/, ''))
  knownLinkPaths.add(routeForSource(source).replace(/^\//, '').replace(/\/$/, ''))
}
// 源码路径 → 重写路径 的反查表：相对链接按源码目录书写，而不是按重写后的路由目录。
const sourceByRewritten = new Map<string, string>()
for (const [source, rewritten] of Object.entries(pageRoutes)) sourceByRewritten.set(rewritten, source)

const sidebar: DefaultTheme.Sidebar = {
  '/learn/': [
    { text: '专题入口', items: [
      { text: '企业 AI 落地指南', link: '/learn/enterprise-ai' },
      { text: '企业 AI Agent 落地指南', link: '/learn/ai-agent' },
      { text: 'AI 输出质量与稳定产出指南', link: '/learn/ai-reliability' }
    ] },
    { text: '企业 AI 落地', collapsed: false, items: [
      { text: '企业 AI 怎么落地', link: '/learn/enterprise-ai/implementation' },
      { text: '最小闭环怎么设计', link: '/learn/enterprise-ai/minimum-closed-loop' },
      { text: 'AI ROI 怎么算', link: '/learn/enterprise-ai/roi' }
    ] },
    { text: '企业 AI Agent', collapsed: false, items: [
      { text: 'AI Agent 如何治理', link: '/learn/ai-agent/governance' },
      { text: 'Agent 与工作流的区别', link: '/learn/ai-agent/workflow-vs-agent' }
    ] },
    { text: 'AI 稳定产出', collapsed: false, items: [
      { text: 'AI 输出不稳定怎么办', link: '/learn/ai-reliability/output-quality' },
      { text: '企业 AI 知识库怎么建设', link: '/learn/ai-reliability/knowledge-base' },
      { text: 'AI 效果怎么评测', link: '/learn/ai-reliability/evaluation' }
    ] }
  ],
  '/handbook/': [
    { text: '阅读入口', items: [
      { text: '高管执行摘要', link: '/executive-summary' },
      { text: '角色化快速开始', link: '/quickstart' },
      { text: '先定位你的问题', link: '/start' },
      { text: '开篇：企业 AI 战略与业务对齐', link: '/handbook/ai-strategy-and-alignment' },
      { text: '自序', link: '/handbook/preface' }
    ] },
    { text: '第一部分：认知与诊断', collapsed: false, items: [
      { text: '开篇：企业 AI 战略与业务对齐', link: '/handbook/ai-strategy-and-alignment' },
      { text: '第 1 章：为什么难以稳定产出', link: '/handbook/why-ai-output-is-unstable' },
      { text: '第 2 章：自诊断', link: '/handbook/diagnose-your-constraint' },
      { text: '第 3 章：认知校准', link: '/handbook/calibrate-ai-capabilities' }
    ] },
    { text: '第二部分：方法与基础', items: [
      { text: '第 4 章：可复现工作流', link: '/handbook/from-generation-to-reproducible-workflows' },
      { text: '第 5 章：数据、知识与上下文', link: '/handbook/data-knowledge-and-context' }
    ] },
    { text: '第三部分：执行与落地', items: [
      { text: '第 6 章：最小闭环设计', link: '/handbook/design-a-minimum-closed-loop' },
      { text: '第 7 章：日常人机协作', link: '/handbook/daily-human-ai-collaboration' },
      { text: '第 8 章：扩展与优先级', link: '/handbook/scale-use-cases-with-priority' }
    ] },
    { text: '第四部分：进阶决策', items: [
      { text: '第 9 章：Agent 与自动化治理', link: '/handbook/agent-and-automation-governance' },
      { text: '第 10 章：RAG、微调与多模态', link: '/handbook/rag-finetuning-and-multimodal' }
    ] },
    { text: '第五部分：度量与治理', items: [
      { text: '第 11 章：价值与评测', link: '/handbook/value-and-evaluation' },
      { text: '第 12 章：治理与组织协同', link: '/handbook/governance-and-organization' },
      { text: '第 13 章：人机协同与组织生产', link: '/handbook/human-ai-collaboration-and-work' },
      { text: '第 14 章：依赖与韧性', link: '/handbook/ai-dependency-and-resilience' },
      { text: '第 15 章：安全与合规', link: '/handbook/security-and-compliance' }
    ] },
    { text: '第六部分：案例与收束', items: [
      { text: '第 16 章：公开案例与教学情景', link: '/handbook/public-cases-and-teaching-scenarios' },
      { text: '后记：从个人提效到企业级稳定产出', link: '/handbook/afterword' }
    ] }
  ],
  '/appendices/': [{ text: '附录与方法资产', items: [
    { text: '模板总览', link: '/templates' }, { text: '附录 A：清单与模板', link: '/appendices/reusable-checklists-and-templates' },
    { text: '附录 B：指标与评测', link: '/appendices/metrics-and-evaluation' }, { text: '附录 C：工具与平台参考', link: '/appendices/tools-and-platforms' },
    { text: '附录 D：来源与事实维护', link: '/appendices/sources-cases-and-fact-maintenance' }, { text: '附录 E：关于作者', link: '/appendices/about-the-author' },
    { text: '附录 F：术语表', link: '/appendices/glossary' }, { text: '附录 G：Failure Casebook', link: '/appendices/ai-failure-casebook' }
  ] }],
  '/cases/': [{ text: '企业 AI 落地案例库', items: [
    { text: '案例库首页', link: '/cases/' }, { text: '案例与证据阅读指南', link: '/cases/guide' }, { text: '案例写作模板', link: '/cases/template' },
    { text: 'OpenAI 企业案例', link: '/cases/openai-enterprise' }, { text: 'Anthropic 企业案例', link: '/cases/anthropic-enterprise' }
  ] }],
  '/evidence/': [{ text: '证据与案例', items: [
    { text: '案例库首页', link: '/cases/' }, { text: '案例与证据阅读指南', link: '/cases/guide' }, { text: 'P2 试点证据包', link: '/evidence/pilot-evidence-pack' }, { text: '模型与工具事实卡登记册', link: '/facts/model-and-tool-fact-register' }
  ] }],
  '/facts/': [{ text: '动态事实', items: [
    { text: '模型与工具事实卡登记册', link: '/facts/model-and-tool-fact-register' }, { text: '来源与事实维护规范', link: '/appendices/sources-cases-and-fact-maintenance' }
  ] }]
}

function sourceForPage(page: string): string {
  return Object.entries(pageRoutes).find(([, route]) => route === page)?.[0] ?? page
}

export default defineConfig({
  lang: 'zh-Hans',
  title: '企业 AI 稳定产出手册',
  titleTemplate: false,
  base: BASE,
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ['README.md', 'LICENSE', '.github/**', 'node_modules/**'],
  rewrites: pageRoutes,
  ignoreDeadLinks: [(url: string) => {
    let normalized = url.replace(/^\.?\//, '').split(/[?#]/)[0].replace(/\/$/, '')
    try { normalized = decodeURIComponent(normalized) } catch { /* 保留原值 */ }
    return knownLinkPaths.has(normalized)
  }],
  head: [
    ['meta', { name: 'author', content: 'Jace' }],
    ['meta', { name: 'application-name', content: '企业 AI 稳定产出手册' }],
    ['meta', { name: 'theme-color', content: '#164E45' }],
    ['meta', { name: 'color-scheme', content: 'light' }],
    ['link', { rel: 'icon', href: assetUrl('brand-mark.svg'), type: 'image/svg+xml' }],
    ['link', { rel: 'manifest', href: assetUrl('site.webmanifest') }],
    ['link', { rel: 'preconnect', href: 'https://www.googletagmanager.com' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-13K05JQ5Z9' }],
    ['script', {}, "window.dataLayer = window.dataLayer || []; window.gtag = window.gtag || function(){window.dataLayer.push(arguments)}; window.gtag('js', new Date()); window.gtag('config', 'G-13K05JQ5Z9', { send_page_view: false });"]
  ],
  sitemap: {
    hostname: SITE_URL,
    lastmodDateOnly: true,
    transformItems: (items) => items
      .filter((item) => new URL(item.url, SITE_URL).pathname !== '/404')
      .map((item) => {
        const path = new URL(item.url, SITE_URL).pathname
        return {
          ...item,
          changefreq: path === '/' || path.startsWith('/updates') ? 'weekly' : 'monthly',
          priority: path === '/' ? 1 : path.startsWith('/handbook/') ? 0.9 : 0.7
        }
      })
  },
  transformPageData(pageData) {
    const meta = pageMeta[pageData.relativePath]
    if (!meta) return pageData
    pageData.title = meta.title
    pageData.description = meta.description
    pageData.frontmatter = { ...pageData.frontmatter, title: meta.title, description: meta.description }
    return pageData
  },
  transformHead(context) {
    if (context.page === '404.md') return [['meta', { name: 'robots', content: 'noindex, nofollow' }]]
    const source = sourceForPage(context.page)
    const meta = pageMeta[source]
    const canonical = new URL(routeForSource(source), SITE_URL).toString()
    const canonicalUrl = source.endsWith('/index.md') && !canonical.endsWith('/') ? `${canonical}/` : canonical
    const isHome = canonicalUrl === `${SITE_URL}/`
    const isAbout = canonicalUrl === `${SITE_URL}/about`
    const title = isHome ? '企业 AI 稳定产出手册' : meta?.title ?? context.title
    const description = meta?.description ?? context.description ?? DEFAULT_DESCRIPTION
    const lastUpdated = context.pageData.lastUpdated ? new Date(context.pageData.lastUpdated).toISOString() : undefined
    const publishedAt = '2026-08-21T00:00:00+08:00'
    const breadcrumb = [{ '@type': 'ListItem', position: 1, name: '首页', item: SITE_URL }]
    if (!isHome) breadcrumb.push({ '@type': 'ListItem', position: 2, name: title, item: canonical })
    const schema = isHome
      ? { '@context': 'https://schema.org', '@graph': [
        { '@type': 'WebSite', name: '企业 AI 稳定产出手册', url: SITE_URL, inLanguage: 'zh-Hans', description: DEFAULT_DESCRIPTION, publisher: PUBLISHER },
        { '@type': 'Book', name: '企业 AI 稳定产出手册', version: '2.0.0', inLanguage: 'zh-Hans', author: { '@type': 'Person', name: 'Jace', url: AUTHOR_URL }, publisher: PUBLISHER, license: 'https://creativecommons.org/licenses/by-nc/4.0/deed.zh-hans', url: canonicalUrl, sameAs: REPOSITORY_URL, image: OG_IMAGE, description: DEFAULT_DESCRIPTION }
      ] }
      : isAbout
        ? { '@context': 'https://schema.org', '@graph': [
          { '@type': 'ProfilePage', name: title, description, inLanguage: 'zh-Hans', url: canonicalUrl, mainEntity: { '@type': 'Person', name: 'Jace', url: canonicalUrl, description, email: 'jacejacejia@gmail.com', knowsAbout: ['企业 AI 落地', 'AI Agent 治理', 'AI 评测', 'AI 工作流', 'AI 稳定产出'], sameAs: REPOSITORY_URL } },
          { '@type': 'BreadcrumbList', itemListElement: breadcrumb }
        ] }
        : { '@context': 'https://schema.org', '@graph': [
          { '@type': 'Article', headline: title, description, inLanguage: 'zh-Hans', url: canonicalUrl, mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl }, image: OG_IMAGE, datePublished: publishedAt, ...(lastUpdated ? { dateModified: lastUpdated } : {}), author: { '@type': 'Person', name: 'Jace', url: AUTHOR_URL }, publisher: PUBLISHER, isPartOf: { '@type': 'Book', name: '企业 AI 稳定产出手册', url: SITE_URL } },
          { '@type': 'BreadcrumbList', itemListElement: breadcrumb }
        ] }
    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { name: 'description', content: description }],
      ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
      ['meta', { property: 'og:type', content: isHome ? 'website' : 'article' }],
      ['meta', { property: 'og:locale', content: 'zh_CN' }],
      ['meta', { property: 'og:site_name', content: '企业 AI 稳定产出手册' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:image', content: OG_IMAGE }],
      ['meta', { property: 'og:image:secure_url', content: OG_IMAGE }],
      ['meta', { property: 'og:image:type', content: 'image/png' }],
      ['meta', { property: 'og:image:width', content: '1200' }],
      ['meta', { property: 'og:image:height', content: '630' }],
      ['meta', { property: 'og:image:alt', content: '企业 AI 稳定产出手册：让企业 AI 的结果成为可运行的方法' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: OG_IMAGE }],
      ['meta', { name: 'twitter:image:alt', content: '企业 AI 稳定产出手册：让企业 AI 的结果成为可运行的方法' }],
      ...(!isHome ? [
        ['meta', { property: 'article:published_time', content: publishedAt }],
        ...(lastUpdated ? [['meta', { property: 'article:modified_time', content: lastUpdated }]] : [])
      ] : []),
      ['script', { type: 'application/ld+json' }, JSON.stringify(schema)]
    ]
  },
  markdown: {
    lineNumbers: false,
    config(markdown) {
      const fallbackRender = (tokens, index, options, _env, self) => self.renderToken(tokens, index, options)
      const defaultLinkRender = markdown.renderer.rules.link_open ?? fallbackRender

      // VitePress 会把相对 .md 链接按源码路径渲染成相对 URL，但本站通过 pageRoutes 把源码重写为英文路由；
      // 这里统一把可解析的 .md 链接重写为真实路由，避免正文链接指向不存在的源码路径。
      const resolveSourcePath = (envRelativePath: string, rawTarget: string): string | null => {
        let target = rawTarget
        try { target = decodeURIComponent(rawTarget) } catch { /* 保留原值 */ }
        const clean = target.split('#')[0].split('?')[0]
        if (!clean.endsWith('.md')) return null
        const sourcePath = sourceByRewritten.get(envRelativePath) ?? envRelativePath
        const base = path.posix.dirname(sourcePath)
        const resolved = clean.startsWith('/')
          ? clean.replace(/^\//, '')
          : path.posix.normalize(path.posix.join(base, clean))
        return resolved
      }

      markdown.renderer.rules.link_open = (tokens, index, options, env, self) => {
        const href = tokens[index].attrGet('href')
        if (href && env?.relativePath) {
          const resolved = resolveSourcePath(env.relativePath as string, href)
          if (resolved && pageRoutes[resolved]) {
            const hash = href.includes('#') ? `#${href.split('#').slice(1).join('#')}` : ''
            tokens[index].attrSet('href', `${routeForSource(resolved)}${hash}`)
          }
        }
        return defaultLinkRender(tokens, index, options, env, self)
      }
    }
  },
  themeConfig: {
    logo: '/brand-mark.svg',
    siteTitle: '企业 AI 稳定产出手册',
    nav: [
      { text: '快速开始', link: '/quickstart' }, { text: '从问题开始', link: '/start' }, { text: '专题', link: '/learn/enterprise-ai', activeMatch: '^/learn/' }, { text: '手册', link: '/handbook/preface', activeMatch: '^/handbook/' },
      { text: '模板', link: '/templates', activeMatch: '^/appendices/|^/templates' }, { text: '案例与证据', link: '/cases/', activeMatch: '^/cases/|^/evidence/|^/facts/' },
      { text: '更新', link: '/updates' }, { text: '下载 PDF', link: '/download' }
    ],
    sidebar,
    outline: { level: [2, 3], label: '本页索引' },
    search: { provider: 'local', options: { detailedView: true } },
    socialLinks: [{ icon: 'github', link: REPOSITORY_URL }],
    editLink: { pattern: `${REPOSITORY_URL}/edit/main/:path`, text: '在 GitHub 中建议修订' },
    docFooter: { prev: '上一页', next: '下一页' },
    lastUpdated: { text: '最近更新' },
    footer: { message: '内容采用 CC BY-NC 4.0 许可；商业用途请先获得授权。', copyright: 'Copyright © 2026 Jace · betta-labs' },
    externalLinkIcon: true
  }
})
