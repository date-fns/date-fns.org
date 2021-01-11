import { h, FunctionComponent } from 'preact'
import { Page, Submodule } from '@date-fns/date-fns-db'
import { parse } from 'json-bond'
import { MigratedDoc } from './MigratedDoc'
import { MarkdownDoc } from './MarkdownDoc'

interface Props {
  page: Page
}

export const Content: FunctionComponent<Props> = ({ page }) => {
  switch (page.type) {
    case 'migrated':
      return <MigratedDoc doc={parse(page.doc)} />
    case 'markdown':
      return <MarkdownDoc markdown={page.markdown} />
  }
}
