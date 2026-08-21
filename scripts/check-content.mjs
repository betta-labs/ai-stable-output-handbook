/**
 * 运行手册档案馆：构建前守住内容真源，阻止失效的本地Markdown链接进入阅读站。
 */
import { access, readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const EXCLUDED_DIRECTORIES = new Set(['.git', '.github', '.vitepress', 'node_modules', 'public', 'scripts', '.ropeproject'])
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
  for (const match of content.matchAll(markdownLink)) {
    const rawTarget = decodeURIComponent(match[1])
    if (isExternal(rawTarget)) continue
    const target = rawTarget.split('#')[0].split('?')[0]
    if (!target) continue
    const absoluteTarget = path.resolve(path.dirname(file), target)
    const candidates = path.extname(absoluteTarget) ? [absoluteTarget] : [absoluteTarget, `${absoluteTarget}.md`, path.join(absoluteTarget, 'README.md')]
    if (!(await Promise.all(candidates.map(exists))).some(Boolean)) errors.push(`${path.relative(ROOT, file)} → ${rawTarget}`)
  }
}

if (errors.length) {
  console.error('发现无法解析的本地Markdown链接：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`内容校验通过：检查了 ${files.length} 个Markdown文件的本地链接。`)
