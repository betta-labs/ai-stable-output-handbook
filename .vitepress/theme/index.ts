// 运行手册档案馆：扩展默认主题，只调整阅读体验与信息层级，不复制正文内容。
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { installAnalytics } from './analytics'

export default {
  extends: DefaultTheme,
  enhanceApp({ router }) {
    installAnalytics(router)
  }
}
