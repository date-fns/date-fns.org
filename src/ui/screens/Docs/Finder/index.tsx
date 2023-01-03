import { h, FunctionComponent } from 'preact'
// import { trackAction } from 'app/acts/tracking_acts'
import debounce from 'lodash/debounce'
import { useCallback, useState } from 'preact/hooks'
import { CancelButton } from './CancelButton'
import { NoResults } from './NoResults'
import { Categories } from './Categories'
import { Widget } from './Widget'
import { filterPages } from './utils'
import { db } from '@date-fns/docs/db'
import { packageName } from '@date-fns/docs/consts'
import type { DateFnsDocs } from '@date-fns/docs/types'
import { useRead } from '@typesaurus/preact'
import * as styles from './styles.css'

type FIXME = any

interface Props {
  selectedVersion: string
  selectedPage: string
  selectedSubmodule: DateFnsDocs.Submodule
  onNavigate(): void
}

export const Finder: FunctionComponent<Props> = ({
  selectedSubmodule,
  selectedVersion,
  selectedPage,
  onNavigate,
}) => {
  const [query, setQuery] = useState('')

  const trackSearch = useCallback(
    debounce((newQuery: string) => {
      // FIXME:
      // trackAction('Search', { query: newQuery })
    }, 500),
    []
  )

  const [versions, { loading }] = useRead(
    db.versions.query(($) => [
      $.field('package').equal(packageName),
      $.field('version').equal(selectedVersion),
    ])
  )

  if (versions && versions.length >= 1) {
    const { pages, categories } = versions[0].data
    const filteredPages = filterPages(pages, query, selectedSubmodule)

    return (
      <div class={styles.container}>
        <header class={styles.search}>
          <input
            class={styles.searchField}
            autoFocus
            type="text"
            name="search"
            placeholder="Search"
            value={query}
            onInput={(e: FIXME) => {
              const newQuery = e.target.value
              trackSearch(newQuery)
              setQuery(newQuery)
            }}
          />

          {query.length >= 0 && <CancelButton setQuery={setQuery} />}
        </header>

        <div class={styles.content}>
          {filteredPages.length === 0 ? (
            <NoResults />
          ) : (
            <Categories
              pages={filteredPages}
              categories={categories}
              selectedVersion={selectedVersion}
              selectedSubmodule={selectedSubmodule}
              selectedPage={selectedPage}
              onNavigate={onNavigate}
            />
          )}
        </div>

        <Widget />
      </div>
    )
  } else if (loading) {
    return (
      <div class={styles.container}>
        <div class={styles.loading}>Loading...</div>
      </div>
    )
  } else {
    // FIXME:
    return (
      <div class={styles.container}>
        <div class={styles.loading}>Error!</div>
      </div>
    )
  }
}
