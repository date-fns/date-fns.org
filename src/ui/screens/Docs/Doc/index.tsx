import { h, FunctionComponent } from 'preact'
import { useEffect } from 'preact/hooks'
import { useQuery } from '@typesaurus/preact'
import { db, PACKAGE_NAME, Submodule } from '@date-fns/date-fns-db'
import { where } from 'typesaurus'
import { Container } from './style.css'
import { Content } from './Content'

interface Props {
  selectedVersion: string
  selectedDoc: string
  selectedSubmodule: Submodule
}

export const Doc: FunctionComponent<Props> = ({
  selectedDoc,
  selectedVersion,
  selectedSubmodule,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [selectedDoc, selectedVersion])

  const [pages, { loading }] = useQuery(db.pages, [
    where('package', '==', PACKAGE_NAME),
    where('version', '==', selectedVersion),
    where('slug', '==', selectedDoc),
    where('submodules', 'array-contains', selectedSubmodule),
  ])

  if (pages && pages.length >= 1) {
    const page = pages[0].data
    return (
      <Container>
        <Content
          page={page}
          selectedSubmodule={selectedSubmodule}
          selectedVersion={selectedVersion}
        />
      </Container>
    )
  } else if (pages && pages.length === 0) {
    return (
      <Container>
        This page is not available for this version or this submodule
      </Container>
    )
  } else if (loading) {
    return <Container>Loading...</Container>
  } else {
    // FIXME:
    return <Container>Error!</Container>
  }
}
