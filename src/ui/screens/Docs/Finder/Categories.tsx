import type { DateFnsDocs } from '@date-fns/docs/types'
import { FunctionComponent, h } from 'preact'
import { Items } from './Items'
import * as styles from './styles.css'

interface Props {
  categories: string[]
  pages: DateFnsDocs.PagePreview[]
  selectedVersion: string
  selectedSubmodule: DateFnsDocs.Submodule
  selectedPage: string
  onNavigate(): void
  query: string
  activeRef: (element: HTMLDivElement | null) => void
}

export const Categories: FunctionComponent<Props> = ({
  categories,
  pages,
  selectedVersion,
  selectedSubmodule,
  selectedPage,
  onNavigate,
  query,
  activeRef,
}) => (
  <ul class={styles.categoriesList}>
    {categories.map((category) => {
      const categoryPages = pages.filter((page) => page.category === category)

      if (categoryPages.length === 0) {
        return null
      }

      return (
        <li class={styles.category} key={category}>
          <h3 class={styles.categoryHeader}>{category}</h3>

          <div>
            <Items
              pages={categoryPages}
              selectedVersion={selectedVersion}
              selectedSubmodule={selectedSubmodule}
              selectedPage={selectedPage}
              onNavigate={onNavigate}
              query={query}
              activeRef={activeRef}
            />
          </div>
        </li>
      )
    })}
  </ul>
)
