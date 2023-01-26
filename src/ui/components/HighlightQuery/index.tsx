import classNames from 'classnames'
import { Fragment, FunctionComponent, h } from 'preact'
import { useMemo } from 'preact/hooks'
import * as styles from './styles.css'

interface HighlightQueryProps {
  text: string
  query: string
}

export const HighlightQuery: FunctionComponent<HighlightQueryProps> = ({
  text,
  query,
}) => {
  const chunks = useMemo(() => highlightText(text, query), [text, query])

  return (
    <>
      {chunks.map((chunk, index) => (
        <span
          class={classNames(chunk.type === 'query' && styles.highlight)}
          key={index}
        >
          {chunk.text}
        </span>
      ))}
    </>
  )
}

interface Chunk {
  text: string
  type: 'chunk' | 'query'
}

function highlightText(text: string, query: string): Chunk[] {
  if (!text || !query) return [{ text, type: 'chunk' }]

  const chunks: Chunk[] = []
  const textLower = text.toLowerCase()
  const queryLower = query.toLowerCase()
  let lastIndex = 0
  let index = textLower.indexOf(queryLower)

  while (index !== -1) {
    const start = lastIndex
    const end = index

    chunks.push({ text: text.slice(start, end), type: 'chunk' })
    chunks.push({ text: text.slice(end, end + query.length), type: 'query' })

    lastIndex = end + query.length
    index = textLower.indexOf(queryLower, lastIndex)

    if (lastIndex >= text.length) break
  }

  chunks.push({ text: text.slice(lastIndex), type: 'chunk' })

  return chunks
}
