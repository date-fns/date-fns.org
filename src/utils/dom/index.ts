import { consoleTestResultHandler } from 'tslint/lib/test'

export interface ScrollIntoViewIfNeededOptions extends ScrollToOptions {
  marginTop?: number
}

export function scrollIntoViewIfNeeded(
  element: HTMLElement | null,
  { marginTop, behavior }: ScrollIntoViewIfNeededOptions = {}
): void {
  if (!element) return

  const rect = element.getBoundingClientRect()
  const scrollParent = findParentWithScroll(element)
  console.log({ scrollParent })

  if (!scrollParent) return

  const parentRect = scrollParent.getBoundingClientRect()

  const inViewport =
    rect.top >= parentRect.top + (marginTop || 0) + scrollParent.scrollTop &&
    rect.left >= parentRect.left &&
    rect.bottom <= parentRect.bottom + scrollParent.scrollTop &&
    rect.right <= parentRect.right

  console.log({
    rect,
    parentRect,
    marginTop,
    inViewport,
    scrollTop: scrollParent.scrollTop,
  })

  if (inViewport) return

  scrollParent.scrollTo({
    top: rect.top - parentRect.top - (marginTop || 0),
    behavior,
  })

  // element.scrollIntoView({ behavior })
}

export function isInViewport(
  element: HTMLElement,
  marginTop?: number
): boolean {
  const rect = element.getBoundingClientRect()
  const scrollParent = findParentWithScroll(element)

  if (!scrollParent) return true

  const parentRect = scrollParent.getBoundingClientRect()

  console.log({ rect, parentRect, marginTop })

  return (
    rect.top >= parentRect.top + (marginTop || 0) &&
    rect.left >= parentRect.left &&
    rect.bottom <= parentRect.bottom &&
    rect.right <= parentRect.right
  )
}

function findParentWithScroll(element: HTMLElement): HTMLElement | null {
  let current: HTMLElement | null = element
  while (current) {
    if (current.offsetHeight < current.scrollHeight) {
      return current
    }
    current = current.parentElement
  }
  return null
}
