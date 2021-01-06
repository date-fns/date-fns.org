import { h, FunctionComponent } from 'preact'
import shuffle from 'lodash/shuffle'
import { useMemo, useState } from 'preact/hooks'
import { books } from './constants'
import {
  Container,
  Badge,
  BadgeLabel,
  BadgeNext,
  Cover,
  Text,
  Header,
  Title,
  Description,
  Link,
} from './style.css'

export const BooksBanner: FunctionComponent = () => {
  const shuffledBooks = useMemo(() => shuffle(books), [])
  const [bookIndex, setBookIndex] = useState(0)
  const book = shuffledBooks[bookIndex]
  
  return (
    <div>
      <Container
        tag="a"
        href={book.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Cover tag="img" src={book.cover} />

        <Text>
          <Header>
            <Title>{book.title}</Title>
            <Description>
              {book.description}
            </Description>
          </Header>

          <Link tag="button">Get the book</Link>
        </Text>
      </Container>

      <Badge>
        <BadgeLabel>
          ☝️ Support date-fns, buy a book 🙏
        </BadgeLabel>

        <BadgeNext
          tag="button"
          onClick={() => {
            let newIndex = bookIndex + 1
            if (newIndex > books.length - 1) {
              newIndex = 0
            }
            setBookIndex(newIndex)
          }}
        >
          Next book
        </BadgeNext>
      </Badge>
    </div>
  )
}

