import { h, FunctionComponent } from 'preact'
import * as styles from './styles.css'

export const HomeText: FunctionComponent = ({ children }) => (
  <div class={styles.text}>{children}</div>
)
