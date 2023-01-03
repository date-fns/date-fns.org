import { h } from 'preact'
import * as styles from './styles.css'

export const NoResults = () => (
  <div class={styles.noResultsContainer}>
    <p class={styles.noResultsText}>Your search didn't match any results.</p>
  </div>
)
