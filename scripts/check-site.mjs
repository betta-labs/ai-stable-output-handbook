/**
 * 运行手册档案馆：构建后验证关键SEO产物和阅读入口，避免把无索引或无规范链接的站点发布出去。
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'

const DIST = path.join(process.cwd(), '.vitepress', 'dist')
const expectedBase = process.env.VITEPRESS_EXPECTED_BASE ?? '/'
const normalizedBase = (() => {
  const trimmed = expectedBase.trim().replace(/^\/+|\/+$/g, '')
  return trimmed ? `/${trimmed}/` : '/'
})()
const requiredFiles = ['index.html', 'robots.txt', 'sitemap.xml', 'site.webmanifest', 'og-handbook.svg', 'handbook/preface.html', 'templates.html', 'download.html']
const failures = []

for (const file of requiredFiles) {
  try { await readFile(path.join(DIST, file)) } catch { failures.push(`缺少构建产物：${file}`) }
}

const index = await readFile(path.join(DIST, 'index.html'), 'utf8').catch(() => '')
const sitemap = await readFile(path.join(DIST, 'sitemap.xml'), 'utf8').catch(() => '')
const robots = await readFile(path.join(DIST, 'robots.txt'), 'utf8').catch(() => '')
for (const signal of ['rel="canonical"', 'property="og:title"', 'name="twitter:card"', 'application/ld+json', 'lang="zh-Hans"']) {
  if (!index.includes(signal)) failures.push(`首页缺少SEO信号：${signal}`)
}
if (normalizedBase !== '/' && !index.includes(`href="${normalizedBase}assets/`)) {
  failures.push(`首页未使用预期的项目页资源前缀：${normalizedBase}`)
}
if (index.includes('layout: page')) failures.push('首页frontmatter被错误渲染为正文。')
if (!sitemap.includes('https://handbook.sanage.xyz/handbook/preface')) failures.push('站点地图未包含手册章节入口。')
if (!robots.includes('https://handbook.sanage.xyz/sitemap.xml')) failures.push('robots.txt 未声明站点地图。')

if (failures.length) {
  console.error('站点校验失败：')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('站点校验通过：关键页面、SEO头信息、sitemap 与 robots.txt 均已生成。')
