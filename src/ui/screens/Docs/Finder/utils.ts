import type { DateFnsDocs } from '@date-fns/docs'

export function filterPages(
  pages: DateFnsDocs.PagePreview[],
  dirtyQuery: string,
  selectedSubmodule: DateFnsDocs.Submodule
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
