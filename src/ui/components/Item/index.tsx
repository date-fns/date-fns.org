import classNames from 'classnames'
import { Fragment, FunctionComponent, h } from 'preact'
import { Ref } from 'preact/hooks'
import { highlightMarkdown } from '~/utils/docs'
import { HighlightQuery } from '../HighlightQuery'
import { Markdown } from '../Markdown'
import { RichText } from '../RichText'
import * as styles from './styles.css'

interface Props {
  title: string
  summary: string | undefined
  active: boolean
  code: boolean
  query?: string
  activeRef?: Ref<HTMLDivElement>
}

export const Item: FunctionComponent<Props> = ({
  title,
  summary,
  active,
  code,
  query,
  activeRef,
}) => (
  <div
    class={classNames(styles.item, active && styles.active)}
    ref={(active && activeRef) || undefined}
  >
    <div>
      <h4 class={classNames(styles.title, code && styles.codeTitle)}>
        <HighlightQuery text={title} query={query} />
      </h4>

      {summary && (
        <p class={styles.summary}>
          <RichText>
            <Markdown value={highlightMarkdown(summary, query)} />
          </RichText>
        </p>
      )}
    </div>

    <div class={styles.icon} />
  </div>
)
