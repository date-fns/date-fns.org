import { h, FunctionComponent } from 'preact'
import { Markdown } from '~/ui/components/Markdown'
import { Submodule } from '@date-fns/date-fns-db'

interface Props {
  markdown: string
}

export const MarkdownDoc: FunctionComponent<Props> = ({ markdown }) => (
  <Markdown value={markdown} />
)
