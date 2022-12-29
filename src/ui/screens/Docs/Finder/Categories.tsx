import { h, FunctionComponent } from 'preact'
import { PagePreview, Submodule } from '@date-fns/docs/db'
import { Items } from './Items'
import { CategoriesList, Category, CategoryHeader } from './style.css'

interface Props {
  categories: string[]
  pages: PagePreview[]
  selectedVersion: string
  selectedSubmodule: Submodule
  selectedPage: string
  onNavigate(): void
}

export const Categories: FunctionComponent<Props> = ({
  categories,
  pages,
  selectedVersion,
  selectedSubmodule,
  selectedPage,
  onNavigate,
}) => (
  <CategoriesList tag="ul">
    {categories.map((category) => {
      const categoryPages = pages.filter((page) => page.category === category)

      if (categoryPages.length === 0) {
        return null
      }

      return (
        <Category tag="li" key={category}>
          <CategoryHeader tag="h3">{category}</CategoryHeader>

          <div>
            <Items
              pages={categoryPages}
              selectedVersion={selectedVersion}
              selectedSubmodule={selectedSubmodule}
              selectedPage={selectedPage}
              onNavigate={onNavigate}
            />
          </div>
        </Category>
      )
    })}
  </CategoriesList>
)
