import { h, FunctionComponent } from 'preact'
import { Markdown } from '~/ui/components/Markdown'

interface Props {
  markdown: string
}

export const MarkdownDoc: FunctionComponent<Props> = ({ markdown }) => (
  <Markdown value={markdown} />
)
