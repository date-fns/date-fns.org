import { h, FunctionComponent, Fragment } from 'preact'
import type { DateFnsDocs } from '@date-fns/docs/types'
import { RouterLink } from '~/ui/router'
import { docLink } from '~/ui/router/docLink'
import * as styles from './styles.css'
import { Item } from '~/ui/components/Item'

interface Props {
  pages: DateFnsDocs.PagePreview[]
  selectedVersion: string
  selectedSubmodule: DateFnsDocs.Submodule
  selectedPage: string
  onNavigate(): void
}

export const Items: FunctionComponent<Props> = ({
  pages,
  selectedVersion,
  selectedSubmodule,
  selectedPage,
  onNavigate,
}) => (
  <>
    {pages.map((page) => (
      <RouterLink
        class={styles.item}
        key={page.slug}
        to={docLink({
          page: page.slug,
          submodule: selectedSubmodule,
          version: selectedVersion,
        })}
        onClick={onNavigate}
      >
        <Item
          title={page.title}
          summary={page.summary}
          selected={selectedPage === page.slug}
          code={
            /* Old versions don't have type */
            !!page.type && page.type !== 'markdown'
          }
        />
      </RouterLink>
    ))}
  </>
)
