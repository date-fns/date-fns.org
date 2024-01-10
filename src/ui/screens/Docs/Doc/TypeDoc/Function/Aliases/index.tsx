import { FunctionComponent, h } from 'preact'
import * as styles from './styles.css'

interface Props {
  aliases: string[]
}

export const Aliases: FunctionComponent<Props> = ({
  aliases
}) => (
  <div class={styles.alias}>
    Alias(es) available for this function:
    <ul>
      {aliases.map((alias) => (
        <li key={alias}>
          <code>{alias}</code>
        </li>
      ))}
    </ul>
  </div>
)
