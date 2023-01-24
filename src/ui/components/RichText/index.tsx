import { ComponentChildren, FunctionComponent, h } from 'preact'
import * as styles from './styles.css'

interface Props {
  children: ComponentChildren
}

export const RichText: FunctionComponent<Props> = ({ children }) => (
  <div class={styles.content}>{children}</div>
)
