export function trackPageView () {
  if (window.analytics && window.analytics.page) {
    window.analytics.page()
  }
}

export function trackAction (actionName, payload) {
  if (window.analytics && window.analytics.track) {
    window.analytics.track(actionName, payload)
  }
}
