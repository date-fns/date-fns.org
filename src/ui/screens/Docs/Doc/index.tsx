import { packageName } from '@date-fns/docs/consts'
import { db } from '@date-fns/docs/db'
import type { DateFnsDocs } from '@date-fns/docs/types'
import { useRead } from '@typesaurus/preact'
import { FunctionComponent, h } from 'preact'
import { useEffect } from 'preact/hooks'
import { RichText } from '~/ui/components/RichText'
import { DocLinkContext } from '~/ui/router/DocLinkContext'
import { Content } from './Content'
import * as styles from './styles.css'

const SCROLL_OFFSET = 35

interface Props {
  selectedVersion: string
  selectedPage: string
  selectedSubmodule: DateFnsDocs.Submodule
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
        <div class={styles.wrapper}>
          <RichText>
            <Content page={page} />
          </RichText>
        </div>
      </DocLinkContext.Provider>
    )
  } else if (pages && pages.length === 0) {
    return (
      <div class={styles.wrapper}>
        This page is not available for this version or this submodule
      </div>
    )
  } else if (loading) {
    return <div class={styles.wrapper}>Loading...</div>
  } else {
    // FIXME:
    return <div class={styles.wrapper}>Error!</div>
  }
}
