/**
 * 运行手册档案馆：以证据、版本、控制点和任务分流组织阅读。
 * 该配置只提供阅读层；仓库根目录的Markdown、事实卡与证据包仍是唯一内容真源。
 */
import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
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

const sidebar: DefaultTheme.Sidebar = {
  '/handbook/': [
    { text: '阅读入口', items: [{ text: '先定位你的问题', link: '/start' }, { text: '自序', link: '/handbook/preface' }] },
    { text: '第一部分：认知与诊断', collapsed: false, items: [
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
  '/evidence/': [{ text: '证据与案例', items: [
    { text: '案例与证据说明', link: '/cases' }, { text: 'P2 试点证据包', link: '/evidence/pilot-evidence-pack' }, { text: '模型与工具事实卡登记册', link: '/facts/model-and-tool-fact-register' }
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
    transformItems: (items) => items.filter((item) => item.url !== '/404').map((item) => ({
      ...item,
      changefreq: item.url === '/' || item.url.startsWith('/updates') ? 'weekly' : 'monthly',
      priority: item.url === '/' ? 1 : item.url.startsWith('/handbook/') ? 0.9 : 0.7
    }))
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
    const isHome = canonical === `${SITE_URL}/`
    const title = isHome ? '企业 AI 稳定产出手册' : meta?.title ?? context.title
    const description = meta?.description ?? context.description ?? DEFAULT_DESCRIPTION
    const lastUpdated = context.pageData.lastUpdated ? new Date(context.pageData.lastUpdated).toISOString() : undefined
    const publishedAt = '2026-08-21T00:00:00+08:00'
    const breadcrumb = [{ '@type': 'ListItem', position: 1, name: '首页', item: SITE_URL }]
    if (!isHome) breadcrumb.push({ '@type': 'ListItem', position: 2, name: title, item: canonical })
    const schema = isHome
      ? { '@context': 'https://schema.org', '@graph': [
        { '@type': 'WebSite', name: '企业 AI 稳定产出手册', url: SITE_URL, inLanguage: 'zh-Hans', description: DEFAULT_DESCRIPTION, publisher: PUBLISHER },
        { '@type': 'Book', name: '企业 AI 稳定产出手册', version: '2.0.0', inLanguage: 'zh-Hans', author: { '@type': 'Person', name: 'Jace', url: AUTHOR_URL }, publisher: PUBLISHER, license: 'https://creativecommons.org/licenses/by-nc/4.0/deed.zh-hans', url: SITE_URL, sameAs: REPOSITORY_URL, image: OG_IMAGE, description: DEFAULT_DESCRIPTION }
      ] }
      : { '@context': 'https://schema.org', '@graph': [
        { '@type': 'Article', headline: title, description, inLanguage: 'zh-Hans', url: canonical, mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }, image: OG_IMAGE, datePublished: publishedAt, ...(lastUpdated ? { dateModified: lastUpdated } : {}), author: { '@type': 'Person', name: 'Jace', url: AUTHOR_URL }, publisher: PUBLISHER, isPartOf: { '@type': 'Book', name: '企业 AI 稳定产出手册', url: SITE_URL } },
        { '@type': 'BreadcrumbList', itemListElement: breadcrumb }
      ] }
    return [
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { name: 'description', content: description }],
      ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
      ['meta', { property: 'og:type', content: isHome ? 'website' : 'article' }],
      ['meta', { property: 'og:locale', content: 'zh_CN' }],
      ['meta', { property: 'og:site_name', content: '企业 AI 稳定产出手册' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonical }],
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

      markdown.renderer.rules.link_open = (tokens, index, options, env, self) => {
        const href = tokens[index].attrGet('href')
        if (href?.startsWith('facts/')) {
          const source = decodeURIComponent(href)
          const handbookRoute = pageRoutes[source]
          if (handbookRoute) tokens[index].attrSet('href', routeForSource(source))
        }
        return defaultLinkRender(tokens, index, options, env, self)
      }
    }
  },
  themeConfig: {
    logo: '/brand-mark.svg',
    siteTitle: '企业 AI 稳定产出手册',
    nav: [
      { text: '从问题开始', link: '/start' }, { text: '手册', link: '/handbook/preface', activeMatch: '^/handbook/' },
      { text: '模板', link: '/templates', activeMatch: '^/appendices/|^/templates' }, { text: '案例与证据', link: '/cases', activeMatch: '^/cases|^/evidence/|^/facts/' },
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
