import classNames from 'classnames'
import { Fragment, FunctionComponent, h } from 'preact'
import { useMemo } from 'preact/hooks'
import * as styles from './styles.css'

interface NoSearchResultsProps {
  noun: string
  query: string
  setQuery: (query: string) => void
}

export const NoSearchResults: FunctionComponent<NoSearchResultsProps> = ({
  noun,
  query,
  setQuery,
}) => {
  return (
    <div>
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
    </div>
  )
}
