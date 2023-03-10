import { PagePreview, Submodule } from '@date-fns/docs/db'

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

  return filteredPages.filter((page) =>
    page.submodules.includes(selectedSubmodule)
  )
}
