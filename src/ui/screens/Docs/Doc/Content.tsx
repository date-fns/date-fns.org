import { h, FunctionComponent } from 'preact'
import { Page } from '@date-fns/docs/db'
import { parse } from 'typeroo/json'
import { JSDoc } from './JSDoc'
import { MarkdownDoc } from './MarkdownDoc'

interface Props {
  page: Page
}

export const Content: FunctionComponent<Props> = ({ page }) => {
  switch (page.type) {
    case 'tsdoc':
      return (
        <pre>
          <code>{JSON.stringify(page)}</code>
        </pre>
      )

    case 'jsdoc':
      return <JSDoc doc={parse(page.doc)} />

    case 'markdown':
      return <MarkdownDoc markdown={page.markdown} />
  }
}
