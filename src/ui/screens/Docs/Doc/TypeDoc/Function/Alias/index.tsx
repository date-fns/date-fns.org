import { FunctionComponent, h } from 'preact'
import * as styles from './styles.css'

interface Props {
  alias: string
}

export const Alias: FunctionComponent<Props> = ({
  alias
}) => (
  <div class={styles.alias}>
    This function is available as alias <code>{alias}</code>.
  </div>
)
