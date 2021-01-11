import { h, FunctionComponent } from 'preact'
import { Markdown } from '~/ui/components/Markdown'
import { Submodule } from '@date-fns/date-fns-db'

interface Props {
  markdown: string
  selectedSubmodule: Submodule
  selectedVersion: string
}

export const MarkdownDoc: FunctionComponent<Props> = ({
  markdown,
  selectedSubmodule,
  selectedVersion,
}) => (
  <Markdown
    value={markdown}
    selectedSubmodule={selectedSubmodule}
    selectedVersion={selectedVersion}
  />
)
