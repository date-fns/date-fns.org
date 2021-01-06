import { h, FunctionComponent } from 'preact'
import { useEffect } from 'preact/hooks'
import { useQuery } from '@typesaurus/preact'
import db from 'db'
import { PACKAGE_NAME } from 'common/constants'
import { where } from 'typesaurus'
import { Container } from './style.css'
import { Content } from './Content'

interface Props {
  selectedVersion: string
  selectedDoc: string
}

export const Doc: FunctionComponent<Props> = ({ selectedDoc, selectedVersion }) => {
  useEffect(
    () => {
      window.scrollTo(0, 0)
    },
    [selectedDoc, selectedVersion]
  )

  const [pages, { loading }] = useQuery(db.pages, [
    where('package', '==', PACKAGE_NAME),
    where('version', '==', selectedVersion),
    where('slug', '==', selectedDoc),
  ])

  if (pages && pages.length === 1) {
    const page = pages[0].data
    return (
      <Container>
        <Content page={page} selectedVersion={selectedVersion} />
      </Container>
    )
  } else if (pages && pages.length === 0) {
    return (
      <Container>
        This page is not available for this version
      </Container>
    )
  } else if (loading) {
    return (
      <Container>
        Loading...
      </Container>
    )
  } else {
    // FIXME:
    return (
      <Container>
        Error!
      </Container>
    )
  }
}


