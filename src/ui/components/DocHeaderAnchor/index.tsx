import { h, FunctionComponent } from 'preact'
import * as styles from './styles.css'

interface Props {
  anchor: string
}

export const DocHeaderAnchor: FunctionComponent<Props> = ({ anchor }) => (
  <a class={styles.docHeaderLink} href={`#${anchor}`}>
    #
  </a>
)
