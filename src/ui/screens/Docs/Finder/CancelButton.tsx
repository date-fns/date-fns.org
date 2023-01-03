import { FunctionComponent, h } from 'preact'
import * as styles from './styles.css'

interface Props {
  setQuery(query: string): void
}

export const CancelButton: FunctionComponent<Props> = ({ setQuery }) => (
  <div
    class={styles.searchCancel}
    onClick={() => {
      // FIXME:
      // trackAction('Search Cleared')
      setQuery('')
    }}
  />
)
