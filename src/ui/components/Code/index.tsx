import { FunctionComponent, h } from 'preact'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css?global'
import './global.css?global'
import * as styles from './styles.css'

interface CodeProps {
  value: string
}
export const Code: FunctionComponent<CodeProps> = ({ value }) => {
  const html = Prism.highlight(value, Prism.languages.javascript, 'javascript')

  return (
    <pre class={styles.pre}>
      <code class={styles.code} dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  )
}
