import { h, FunctionComponent } from 'preact'
import { Code } from '~/ui/components/Code'

interface Props {
  value: string
  language?: string
}

export const MarkdownCode: FunctionComponent<Props> = ({ value }) => {
  return <Code value={value} />
}
