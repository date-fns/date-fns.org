import { FunctionComponent, h } from 'preact'
// import { trackAction } from 'app/acts/tracking_acts'
import { packageName } from '@date-fns/docs/consts'
import { db } from '@date-fns/docs/db'
import type { DateFnsDocs } from '@date-fns/docs/types'
import { useRead } from '@typesaurus/preact'
import { useState } from 'preact/hooks'
import { Search } from '~/ui/components/Search'
import { Categories } from './Categories'
import { NoResults } from './NoResults'
import * as styles from './styles.css'
import { filterPages } from './utils'
import { Widget } from './Widget'
import { useQuery } from '~/ui/hooks/useQuery'

interface FinderProps {
  selectedVersion: string
  selectedPage: string
  selectedSubmodule: DateFnsDocs.Submodule
  onNavigate(): void
}

export const Finder: FunctionComponent<FinderProps> = ({
  selectedSubmodule,
  selectedVersion,
  selectedPage,
  onNavigate,
}) => {
  const { query, setQuery, searchRef } = useQuery()

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
        <Search query={[query, setQuery]} inputRef={searchRef} />

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
              query={query}
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
