import { FunctionComponent, h } from 'preact'
import { SearchCancel } from './style.css'

interface Props {
  setQuery(query: string): void
}

export const CancelButton: FunctionComponent<Props> = ({ setQuery }) => (
  <SearchCancel
    onClick={() => {
      // FIXME:
      // trackAction('Search Cleared')
      setQuery('')
    }}
  />
)