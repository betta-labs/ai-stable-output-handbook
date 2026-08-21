// 运行手册档案馆：仅记录阅读路径和显式点击，不采集表单内容、正文内容或可识别身份的信息。
import type { Router } from 'vitepress'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function send(event: string, parameters: Record<string, string>) {
  window.gtag?.('event', event, parameters)
}

function pageView() {
  send('page_view', {
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title
  })
}

function installClickTracking() {
  document.addEventListener('click', (event) => {
    const target = event.target
    if (!(target instanceof Element)) return
    const link = target.closest('a[href]')
    if (!link) return
    const href = link.getAttribute('href') ?? ''
    const label = link.textContent?.trim().replace(/\s+/g, ' ').slice(0, 80) || href
    const markedEvent = link.getAttribute('data-analytics')
    if (markedEvent) {
      send(markedEvent, { link_text: label, link_url: link.href, page_path: window.location.pathname })
    } else if (link.closest('.VPNav')) {
      send('handbook_navigation_click', { link_text: label, link_url: link.href, page_path: window.location.pathname })
    } else if (href.includes('github.com/betta-labs/ai-stable-output-handbook')) {
      send('handbook_outbound_click', { link_text: label, link_url: link.href, page_path: window.location.pathname })
    }
  }, { capture: true })
}

export function installAnalytics(router: Router) {
  if (typeof window === 'undefined') return
  const previousHook = router.onAfterRouteChanged
  router.onAfterRouteChanged = (to) => {
    previousHook?.(to)
    queueMicrotask(pageView)
  }
  installClickTracking()
  queueMicrotask(pageView)
}
