import { h, FunctionComponent } from 'preact'
import { Page } from '@date-fns/date-fns-db'
import { parse } from 'json-bond'
import { MigratedDoc } from './MigratedDoc'
import { MarkdownDoc } from './MarkdownDoc'

interface Props {
  page: Page
  selectedVersion: string
}

export const Content: FunctionComponent<Props> = ({ page, selectedVersion }) => {
  switch (page.type) {
    case 'migrated':
      return (
        <MigratedDoc
          doc={parse(page.doc)}
          selectedVersion={selectedVersion}
        />
      )
    case 'markdown':
      return (
        <MarkdownDoc
          markdown={page.markdown}
          selectedVersion={selectedVersion}
        />
      )
  }
}

