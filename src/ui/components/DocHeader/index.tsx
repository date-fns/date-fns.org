import { ComponentChildren, FunctionComponent, h } from 'preact'
import * as styles from './styles.css'

interface Props {
  children: ComponentChildren
}

export const DocHeader: FunctionComponent<Props> = ({ children }) => (
  <h1 class={styles.header}>{children}</h1>
)
