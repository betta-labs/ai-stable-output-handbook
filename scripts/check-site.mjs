/**
 * 运行手册档案馆：构建后验证关键SEO产物和阅读入口，避免把无索引或无规范链接的站点发布出去。
 */
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'

const DIST = path.join(process.cwd(), '.vitepress', 'dist')
const expectedBase = process.env.VITEPRESS_EXPECTED_BASE ?? '/'
const normalizedBase = (() => {
  const trimmed = expectedBase.trim().replace(/^\/+|\/+$/g, '')
  return trimmed ? `/${trimmed}/` : '/'
})()
const requiredFiles = ['index.html', '404.html', 'robots.txt', 'sitemap.xml', 'site.webmanifest', 'og-handbook.svg', 'og-handbook.png', 'handbook/preface.html', 'templates.html', 'download.html', 'learn/enterprise-ai/index.html', 'learn/ai-agent/index.html', 'learn/ai-reliability/index.html', 'about.html']
const failures = []

async function findHtmlFiles(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const relative = path.join(prefix, entry.name)
    if (entry.isDirectory()) files.push(...await findHtmlFiles(path.join(directory, entry.name), relative))
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(relative)
  }
  return files
}

const metaContent = (html, attribute, value) => {
  const tag = (html.match(/<meta\b[^>]*>/gi) ?? []).find((candidate) => new RegExp(`${attribute}="${value}"`, 'i').test(candidate))
  return tag?.match(/content="([^"]*)"/i)?.[1] ?? ''
}
const seenTitles = new Map()
const seenDescriptions = new Map()

for (const file of requiredFiles) {
  try { await readFile(path.join(DIST, file)) } catch { failures.push(`缺少构建产物：${file}`) }
}

const index = await readFile(path.join(DIST, 'index.html'), 'utf8').catch(() => '')
const sitemap = await readFile(path.join(DIST, 'sitemap.xml'), 'utf8').catch(() => '')
const robots = await readFile(path.join(DIST, 'robots.txt'), 'utf8').catch(() => '')
for (const signal of ['rel="canonical"', 'name="robots"', 'property="og:title"', 'property="og:image:width"', 'name="twitter:card"', 'application/ld+json', 'G-13K05JQ5Z9', 'lang="zh-Hans"']) {
  if (!index.includes(signal)) failures.push(`首页缺少SEO信号：${signal}`)
}
if (normalizedBase !== '/' && !index.includes(`href="${normalizedBase}assets/`)) {
  failures.push(`首页未使用预期的项目页资源前缀：${normalizedBase}`)
}
if (index.includes('layout: page')) failures.push('首页frontmatter被错误渲染为正文。')
if (!index.includes('og-handbook.png')) failures.push('首页未使用PNG社交分享图。')
if (index.includes('og-handbook.svg')) failures.push('首页仍将SVG用作社交分享图。')
const notFound = await readFile(path.join(DIST, '404.html'), 'utf8').catch(() => '')
if (!notFound.includes('name="robots" content="noindex, nofollow"')) failures.push('404页面缺少noindex索引控制。')
if (!sitemap.includes('https://handbook.sanage.xyz/handbook/preface')) failures.push('站点地图未包含手册章节入口。')
if (!sitemap.includes('https://handbook.sanage.xyz/learn/enterprise-ai')) failures.push('站点地图未包含学习专题入口。')
if (!sitemap.includes('https://handbook.sanage.xyz/about')) failures.push('站点地图未包含关于作者页面。')
if (!robots.includes('https://handbook.sanage.xyz/sitemap.xml')) failures.push('robots.txt 未声明站点地图。')
if (sitemap.includes('https://handbook.sanage.xyz/404')) failures.push('站点地图不应包含 404 页面。')
if (!sitemap.includes('<loc>https://handbook.sanage.xyz/</loc><lastmod>')) failures.push('站点地图缺少首页条目。')
if (!/https:\/\/handbook\.sanage\.xyz\/<\/loc><lastmod>[^<]*<\/lastmod><changefreq>weekly<\/changefreq><priority>1\.0<\/priority>/.test(sitemap)) {
  failures.push('首页在站点地图中应标记为 weekly / priority 1.0。')
}

for (const file of await findHtmlFiles(DIST)) {
  const html = await readFile(path.join(DIST, file), 'utf8')
  if (file === '404.html') continue
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() ?? ''
  const description = metaContent(html, 'name', 'description')
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] ?? ''
  const robotsMeta = metaContent(html, 'name', 'robots')
  if (!title) failures.push(`${file} 缺少页面标题。`)
  if (!description) failures.push(`${file} 缺少页面摘要。`)
  if (!canonical.startsWith('https://handbook.sanage.xyz/')) failures.push(`${file} 缺少自定义域名canonical。`)
  if (/^learn\/[^/]+\/index\.html$/.test(file) && !canonical.endsWith('/')) failures.push(`${file} 的 canonical 应为目录式（带尾斜杠）。`)
  if (!robotsMeta.includes('index, follow')) failures.push(`${file} 缺少可索引robots规则。`)
  for (const signal of ['property="og:title"', 'property="og:image"', 'name="twitter:card"', 'application/ld+json']) {
    if (!html.includes(signal)) failures.push(`${file} 缺少页面级SEO信号：${signal}`)
  }
  if (title) {
    const prior = seenTitles.get(title)
    if (prior) failures.push(`${file} 与 ${prior} 使用重复标题：${title}`)
    else seenTitles.set(title, file)
  }
  if (description) {
    const prior = seenDescriptions.get(description)
    if (prior) failures.push(`${file} 与 ${prior} 使用重复摘要。`)
    else seenDescriptions.set(description, file)
  }
}

if (failures.length) {
  console.error('站点校验失败：')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('站点校验通过：关键页面、SEO头信息、sitemap 与 robots.txt 均已生成。')
