import { h, FunctionComponent } from 'preact'
import shuffle from 'lodash/shuffle'
import { useMemo, useState } from 'preact/hooks'
import { books } from './constants'
import * as styles from './styles.css'

export const BooksWidget: FunctionComponent = () => {
  const shuffledBooks = useMemo(() => shuffle(books), [])
  const [bookIndex, setBookIndex] = useState(0)
  const book = shuffledBooks[bookIndex]

  return (
    <div>
      <a
        class={styles.container}
        href={book.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img class={styles.cover} src={book.cover} />

        <div class={styles.text}>
          <div class={styles.header}>
            <div class={styles.title}>{book.title}</div>
            <div class={styles.description}>{book.description}</div>
          </div>

          <button class={styles.link}>Get the book</button>
        </div>
      </a>

      <div class={styles.badge}>
        <div class={styles.badgeLabel}>☝️ Support date-fns, buy a book 🙏</div>

        <button
          class={styles.badgeNext}
          onClick={() => {
            let newIndex = bookIndex + 1
            if (newIndex > books.length - 1) {
              newIndex = 0
            }
            setBookIndex(newIndex)
          }}
        >
          Next book
        </button>
      </div>
    </div>
  )
}
