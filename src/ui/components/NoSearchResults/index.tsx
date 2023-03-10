import { Fragment, FunctionComponent, h } from 'preact'
import { RichText } from '../RichText'
import * as styles from './styles.css'

interface NoSearchResultsProps {
  noun: string
  query: [string, (query: string) => void]
}

export const NoSearchResults: FunctionComponent<NoSearchResultsProps> = ({
  noun,
  query: [query, setQuery],
}) => {
  return (
    <RichText>
      No {noun} found for <span class={styles.query}>{query}</span>.{' '}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          setQuery('')
        }}
      >
        Clear query
      </a>
    </RichText>
  )
}
