import { h, FunctionComponent } from 'preact'
import { Page } from '@date-fns/date-fns-db'
import { parse } from 'json-bond'
import { JSDoc } from './JSDoc'
import { MarkdownDoc } from './MarkdownDoc'

interface Props {
  page: Page
}

export const Content: FunctionComponent<Props> = ({ page }) => {
  switch (page.type) {
    case 'jsdoc':
      return <JSDoc doc={parse(page.doc)} />
    case 'markdown':
      return <MarkdownDoc markdown={page.markdown} />
  }
}
