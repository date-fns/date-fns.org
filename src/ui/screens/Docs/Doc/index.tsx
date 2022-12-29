import { h, FunctionComponent } from 'preact'
import { Container } from './style.css'
import { Content } from './Content'
import { DocLinkContext } from '~/ui/router/DocLinkContext'
import { useEffect } from 'preact/hooks'
import { useRead } from '@typesaurus/preact'
import { db, Submodule, packageName } from '@date-fns/docs/db'

const SCROLL_OFFSET = 35

interface Props {
  selectedVersion: string
  selectedPage: string
  selectedSubmodule: Submodule
}

export const Doc: FunctionComponent<Props> = ({
  selectedPage,
  selectedVersion,
  selectedSubmodule,
}) => {
  const [pages, { loading }] = useRead(
    db.pages.query(($) => [
      $.field('package').equal(packageName),
      $.field('version').equal(selectedVersion),
      $.field('slug').equal(selectedPage),
      $.field('submodules').contains(selectedSubmodule),
    ])
  )

  useEffect(() => {
    if (pages && location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''))
      if (!element) {
        return
      }
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition - SCROLL_OFFSET

      window.scrollTo({
        top: offsetPosition,
      })
    }
  }, [loading])

  if (pages && pages.length >= 1) {
    const page = pages[0].data
    return (
      <DocLinkContext.Provider
        value={{ version: selectedVersion, submodule: selectedSubmodule }}
      >
        <Container>
          <Content page={page} />
        </Container>
      </DocLinkContext.Provider>
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
