import { initializeApp } from 'firebase/app'
import { CONFIG, SENTRY_URL } from '~/constants'
import { initSentry } from '~/utils/sentry'

// Initialize theme before rendering to prevent flash
function initTheme() {
  const THEME_STORAGE_KEY = 'date-fns-theme'
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  let theme: 'light' | 'dark' = 'light'
  
  if (stored === 'dark') {
    theme = 'dark'
  } else if (stored === 'light') {
    theme = 'light'
  } else {
    // Auto mode - use system preference
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  
  document.documentElement.setAttribute('data-theme', theme)
  if (theme === 'dark') {
    document.documentElement.classList.add('dark-theme')
    document.documentElement.classList.remove('light-theme')
  } else {
    document.documentElement.classList.add('light-theme')
    document.documentElement.classList.remove('dark-theme')
  }
}

initTheme()

initializeApp(CONFIG.firebaseApp)
initSentry(SENTRY_URL)
