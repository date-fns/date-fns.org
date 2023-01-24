import { FunctionComponent, h } from 'preact'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css?global'
import './global.css?global'
import * as styles from './styles.css'

interface CodeProps {
  value: string | JSX.Element
}
export const Code: FunctionComponent<CodeProps> = ({ value }) =>
  typeof value === 'string' ? (
    <CodeHighlight value={value} />
  ) : (
    <CodeComponent value={value} />
  )

interface CodeComponentProps {
  value: JSX.Element
}

export const CodeComponent: FunctionComponent<CodeComponentProps> = ({
  value,
}) => {
  return (
    <pre class={styles.pre}>
      <code class={styles.code}>{value}</code>
    </pre>
  )
}

interface CodeHighlightProps {
  value: string
}

function CodeHighlight({ value }: CodeHighlightProps) {
  const html = Prism.highlight(value, Prism.languages.javascript, 'javascript')

  return (
    <pre class={styles.pre}>
      <code class={styles.code} dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  )
}
