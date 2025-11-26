import { h, FunctionComponent } from 'preact'
import { useTheme } from '~/ui/hooks/useTheme'
import * as styles from './styles.css'

export const ThemeToggle: FunctionComponent = () => {
  const { theme, toggleTheme, effectiveTheme } = useTheme()

  return (
    <button
      class={styles.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${effectiveTheme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Current theme: ${effectiveTheme}. Click to switch to ${
        effectiveTheme === 'dark' ? 'light' : 'dark'
      }`}
    >
      {effectiveTheme === 'dark' ? (
        <span class={styles.icon}>☀️</span>
      ) : (
        <span class={styles.icon}>🌙</span>
      )}
    </button>
  )
}

