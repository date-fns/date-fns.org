import classNames from 'classnames'
import { Fragment, FunctionComponent, h } from 'preact'
import * as styles from './styles.css'

interface Props {
  title: string
  summary: string | undefined
  selected: boolean
  code: boolean
}

export const Item: FunctionComponent<Props> = ({
  title,
  summary,
  selected,
  code,
}) => (
  <div class={classNames(styles.item, selected && styles.selected)}>
    <div>
      <h4 class={classNames(styles.title, code && styles.codeTitle)}>
        {title}
      </h4>

      {styles.summary && <p class={styles.summary}>{summary}</p>}
    </div>

    <div class={styles.icon} />
  </div>
)
