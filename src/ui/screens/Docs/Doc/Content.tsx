import { h, FunctionComponent } from 'preact'
import { Page, Submodule } from '@date-fns/date-fns-db'
import { parse } from 'json-bond'
import { MigratedDoc } from './MigratedDoc'
import { MarkdownDoc } from './MarkdownDoc'

interface Props {
  page: Page
  selectedSubmodule: Submodule
  selectedVersion: string
}

export const Content: FunctionComponent<Props> = ({
  page,
  selectedSubmodule,
  selectedVersion,
}) => {
  switch (page.type) {
    case 'migrated':
      return (
        <MigratedDoc
          doc={parse(page.doc)}
          selectedSubmodule={selectedSubmodule}
          selectedVersion={selectedVersion}
        />
      )
    case 'markdown':
      return (
        <MarkdownDoc
          markdown={page.markdown}
          selectedSubmodule={selectedSubmodule}
          selectedVersion={selectedVersion}
        />
      )
  }
}
