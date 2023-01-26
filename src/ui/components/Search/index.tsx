import { FunctionComponent, h } from 'preact'
// import { trackAction } from 'app/acts/tracking_acts'
import debounce from 'lodash/debounce'
import { StateUpdater, useCallback } from 'preact/hooks'
import * as styles from './styles.css'
import classNames from 'classnames'

interface SearchProps {
  query: [string, StateUpdater<string>]
  bordered?: boolean
}

export const Search: FunctionComponent<SearchProps> = ({
  query: [query, setQuery],
  bordered,
}) => {
  const trackSearch = useCallback(
    debounce((newQuery: string) => {
      // FIXME:
      // trackAction('Search', { query: newQuery })
    }, 500),
    []
  )

  return (
    <header class={classNames(styles.search, bordered && styles.bordered)}>
      <input
        class={styles.input}
        autoFocus
        type="text"
        name="search"
        placeholder="Search"
        value={query}
        onInput={(e) => {
          const newQuery = (e.target as HTMLInputElement).value
          trackSearch(newQuery)
          setQuery(newQuery)
        }}
      />

      {query.trim().length > 0 && <Cancel setQuery={setQuery} />}
    </header>
  )
}

interface CancelProps {
  setQuery(query: string): void
}

function Cancel({ setQuery }: CancelProps) {
  return (
    <div
      class={styles.cancel}
      onClick={() => {
        // FIXME:
        // trackAction('Search Cleared')
        setQuery('')
      }}
    />
  )
}
