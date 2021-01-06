import { h, FunctionComponent } from 'preact'
import { Markdown } from 'ui/components/Markdown'

interface Props {
  markdown: string
  selectedVersion: string
}

export const MarkdownDoc: FunctionComponent<Props> = ({ markdown, selectedVersion }) => (
  <Markdown value={markdown} selectedVersion={selectedVersion} />
)
