import classNames from 'classnames'
import { Fragment, FunctionComponent, h } from 'preact'
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
  activeRef?: (element: HTMLDivElement | null) => void
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
    ref={active ? activeRef : undefined}
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

    <Icon />
  </div>
)

function Icon() {
  return (
    <svg
      class={styles.icon}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(1.000000, 1.000000)" stroke="currentColor">
          <path d="M8,0 C3.58883333,0 0,3.58883333 0,8 C0,12.4111667 3.58883333,16 8,16 C12.4111667,16 16,12.4111667 16,8 C16,3.58883333 12.4111667,0 8,0 L8,0 Z"></path>
          <path d="M6.58877841,5.08570076 L9.44276752,8.00597775 L6.59150095,10.9178504"></path>
        </g>
      </g>
    </svg>
  )
}
