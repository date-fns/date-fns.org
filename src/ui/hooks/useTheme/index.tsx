import { useState, useEffect } from 'preact/hooks'

export type Theme = 'light' | 'dark' | 'auto'

const THEME_STORAGE_KEY = 'date-fns-theme'

/**
 * Gets the initial theme from localStorage or system preference
 */
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'auto'
  
  const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
  if (stored && ['light', 'dark', 'auto'].includes(stored)) {
    return stored
  }
  return 'auto'
}

/**
 * Gets the effective theme (resolves 'auto' to 'light' or 'dark')
 */
function getEffectiveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  return theme
}

/**
 * Applies the theme to the document
 */
function applyTheme(theme: Theme) {
  const effectiveTheme = getEffectiveTheme(theme)
  document.documentElement.setAttribute('data-theme', effectiveTheme)
  
  if (effectiveTheme === 'dark') {
    document.documentElement.classList.add('dark-theme')
    document.documentElement.classList.remove('light-theme')
  } else {
    document.documentElement.classList.add('light-theme')
    document.documentElement.classList.remove('dark-theme')
  }
}

/**
 * Hook to manage theme state with localStorage persistence
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    // Apply initial theme
    applyTheme(theme)

    // Listen for system theme changes when in auto mode
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => {
        applyTheme('auto')
      }
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    applyTheme(newTheme)
  }

  const toggleTheme = () => {
    const effectiveTheme = getEffectiveTheme(theme)
    setTheme(effectiveTheme === 'dark' ? 'light' : 'dark')
  }

  return {
    theme,
    setTheme,
    toggleTheme,
    effectiveTheme: getEffectiveTheme(theme),
  }
}

