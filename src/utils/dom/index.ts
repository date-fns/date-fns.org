import { consoleTestResultHandler } from 'tslint/lib/test'

export interface ScrollIntoViewIfNeededOptions extends ScrollToOptions {
  marginTop?: number
}

export function scrollIntoViewIfNeeded(
  element: HTMLElement | null,
  { marginTop, behavior }: ScrollIntoViewIfNeededOptions = {}
): void {
  if (!element) return

  const parent = findParentWithScroll(element)
  if (!parent) return

  const rect = element.getBoundingClientRect()
  const parentRect = parent.getBoundingClientRect()

  if (isRectInViewport({ rect, parentRect, marginTop })) return

  const top = element.offsetTop - parent.offsetTop - (marginTop || 0)
  parent.scrollTo({ top, behavior })
}

export function isInViewport(
  element: HTMLElement,
  marginTop?: number
): boolean {
  const parent = findParentWithScroll(element)
  if (!parent) return true

  const rect = element.getBoundingClientRect()
  const parentRect = parent.getBoundingClientRect()

  return isRectInViewport({ rect, parentRect, marginTop })
}

interface IsRectInViewportProps {
  rect: DOMRect
  parentRect: DOMRect
  marginTop: number | undefined
}

function isRectInViewport({
  rect,
  parentRect,
  marginTop,
}: IsRectInViewportProps) {
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
