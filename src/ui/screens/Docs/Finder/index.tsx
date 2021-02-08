import { h, FunctionComponent } from 'preact'
// import { trackAction } from 'app/acts/tracking_acts'
import debounce from 'lodash/debounce'
import { useCallback, useState } from 'preact/hooks'
import { Container, Loading, Search, SearchField } from './style.css'
import { CancelButton } from './CancelButton'
import { NoResults } from './NoResults'
import { Categories } from './Categories'
import { Widget } from './Widget'
import { filterPages } from './utils'
import { useQuery } from '~/utils/useQuery'
import { db, PACKAGE_NAME, Submodule } from '@date-fns/date-fns-db'
import { where } from 'typesaurus'

type FIXME = any

interface Props {
  selectedVersion: string
  selectedPage: string
  selectedSubmodule: Submodule
}

export const Finder: FunctionComponent<Props> = ({
  selectedSubmodule,
  selectedVersion,
  selectedPage,
}) => {
  const [query, setQuery] = useState('')

  const trackSearch = useCallback(
    debounce((newQuery: string) => {
      // FIXME:
      // trackAction('Search', { query: newQuery })
    }, 500),
    []
  )

  const [versions, { loading }] = useQuery(db.versions, [
    where('package', '==', PACKAGE_NAME),
    where('version', '==', selectedVersion),
  ])

  if (versions && versions.length === 1) {
    const { pages, categories } = versions[0].data
    const filteredPages = filterPages(pages, query, selectedSubmodule)

    return (
      <Container>
        <Search tag="header">
          <SearchField
            tag="input"
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
        </Search>

        {filteredPages.length === 0 ? (
          <NoResults />
        ) : (
          <Categories
            pages={filteredPages}
            categories={categories}
            selectedVersion={selectedVersion}
            selectedSubmodule={selectedSubmodule}
            selectedPage={selectedPage}
          />
        )}

        <Widget />
      </Container>
    )
  } else if (loading) {
    return (
      <Container>
        <Loading>Loading...</Loading>
      </Container>
    )
  } else {
    // FIXME:
    return (
      <Container>
        <Loading>Error!</Loading>
      </Container>
    )
  }
}
