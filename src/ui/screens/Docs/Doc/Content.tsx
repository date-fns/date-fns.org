import { h, FunctionComponent } from 'preact'
import type { DateFnsDocs } from '@date-fns/docs/types'
import { parse } from 'typeroo/json'
import { JSDoc } from './JSDoc'
import { MarkdownDoc } from './MarkdownDoc'
import { TSDoc } from './TSDoc'

interface Props {
  page: DateFnsDocs.Page
}

export const Content: FunctionComponent<Props> = ({ page }) => {
  switch (page.type) {
    case 'tsdoc':
      return <TSDoc page={page} />

    case 'jsdoc':
      return <JSDoc doc={parse(page.doc)} />

    case 'markdown':
      return <MarkdownDoc markdown={page.markdown} />
  }
}
