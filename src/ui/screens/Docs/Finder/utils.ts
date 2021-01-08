import { PagePreview } from '@date-fns/date-fns-db'
import { Submodule } from '~/types/submodule'

export function filterPages(
  pages: PagePreview[],
  dirtyQuery: string,
  selectedSubmodule: Submodule
) {
  let filteredPages = pages

  if (dirtyQuery) {
    const query = dirtyQuery.toLowerCase()

    filteredPages = filteredPages.filter(
      (page) =>
        page.category.toLowerCase().includes(query) ||
        page.title.toLowerCase().includes(query) ||
        page.summary.toLowerCase().includes(query)
    )
  }

  return filteredPages.filter((page) => {
    const { category, slug } = page

    if (category === 'General' || category === 'Types') {
      return true
    } else {
      return (selectedSubmodule === Submodule.FP) === slug.startsWith('fp')
    }
  })
}
