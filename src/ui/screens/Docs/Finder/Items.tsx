import { h, FunctionComponent, Fragment } from 'preact'
import type { DateFnsDocs } from '@date-fns/docs/types'
import { RouterLink } from '~/ui/router'
import { docLink } from '~/ui/router/docLink'
import * as styles from './styles.css'

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
        isSelected={selectedPage === page.slug}
        onClick={onNavigate}
      >
        <div>
          <h4 class={styles.itemHeader}>{page.title}</h4>
          <p class={styles.itemText}>{page.summary}</p>
        </div>

        <div class={styles.itemIcon} />
      </RouterLink>
    ))}
  </>
)
