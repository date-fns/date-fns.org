import { h, FunctionComponent } from 'preact'
import { Code } from 'ui/components/Code'

interface Props {
  value: string
  language?: string
}

export const MarkdownCode: FunctionComponent<Props> = ({ value, language }) => {
  if (!language || language === 'js') {
    language = 'javascript'
  }

  return <Code value={value} options={{ readOnly: true, mode: language }} />
}
