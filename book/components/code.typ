// components/code.typ — 代码块统一样式
// 职责：块级代码 / 行内代码的字体、背景、内边距、语言标签。
// Pandoc 将 Markdown 代码块转为 Typst 原生 ```lang ... ``` 格式，
// 因此通过 show raw.where(block: true) 全局控制，无需重新解析。
//
// 本文件导出 code-styles()，由 styles.typ 的 book-styles() 统一调用。

#import "../metadata.typ": c-ink, c-secondary, c-muted, c-border, c-bg-soft

// 语言标签的显示名映射
#let lang-display = (
  "bash": "Shell",
  "sh": "Shell",
  "shell": "Shell",
  "zsh": "Shell",
  "python": "Python",
  "py": "Python",
  "javascript": "JavaScript",
  "js": "JavaScript",
  "typescript": "TypeScript",
  "ts": "TypeScript",
  "json": "JSON",
  "yaml": "YAML",
  "yml": "YAML",
  "toml": "TOML",
  "xml": "XML",
  "html": "HTML",
  "css": "CSS",
  "sql": "SQL",
  "go": "Go",
  "rust": "Rust",
  "java": "Java",
  "c": "C",
  "cpp": "C++",
  "ruby": "Ruby",
  "php": "PHP",
  "swift": "Swift",
  "kotlin": "Kotlin",
  "dart": "Dart",
  "lua": "Lua",
  "r": "R",
  "matlab": "MATLAB",
  "dockerfile": "Dockerfile",
  "makefile": "Makefile",
  "diff": "Diff",
  "text": "Text",
  "plaintext": "Text",
  "ini": "INI",
  "conf": "Config",
  "env": "Env",
  "prompt": "Prompt",
)

#let code-styles(body) = {

  // ============ 块级代码 ============
  show raw.where(block: true): it => {
    set par(first-line-indent: 0em)

    let lang = it.lang
    let label = if lang != none and lang != "" {
      lang-display.at(lang, default: lang)
    } else {
      none
    }

    block(
      width: 100%,
      fill: c-bg-soft,
      stroke: 0.5pt + c-border,
      inset: (x: 9pt, y: 7pt),
      radius: 2pt,
      above: 8pt,
      below: 8pt,
      breakable: true,
    )[
      // 语言标签（右上角）
      #if label != none {
        place(
          top + right,
          dx: -2pt,
          dy: 2pt,
        )[
          #text(
            font: "Menlo",
            size: 7pt,
            fill: c-muted,
            tracking: 0.5pt,
          )[#label]
        ]
      }

      // 代码本体
      #set text(
        font: ("Menlo", "Songti SC"),
        size: 8.2pt,
        fill: c-ink,
        lang: "en",
      )
      #it
    ]
  }

  // ============ 行内代码 ============
  show raw.where(block: false): set text(
    font: ("Menlo", "Songti SC"),
    size: 0.92em,
    fill: rgb("#8b2f25"),
  )

  body
}
