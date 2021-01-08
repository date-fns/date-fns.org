import { h, FunctionComponent } from 'preact'
import { Code } from '~/ui/components/Code'

interface Props {
  value: string
  language?: string
}

export const MarkdownCode: FunctionComponent<Props> = ({ value, language }) => {
  return (
    <Code value={value} options={{ readOnly: true, mode: getMode(language) }} />
  )
}

function getMode(language?: string): string {
  if (!language || language === 'js') {
    return 'javascript'
  }

  return language
}
