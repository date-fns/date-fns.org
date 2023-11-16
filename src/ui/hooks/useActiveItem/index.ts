import { useCallback, useRef } from 'preact/hooks'
import { scrollIntoViewIfNeeded } from '~/utils/dom'

export function useActiveItem(marginTop?: number) {
  const prevRef = useRef<HTMLDivElement | null>(null)
  const activeRef = useCallback((element: HTMLDivElement | null) => {
    const first = prevRef.current === null
    prevRef.current = element
    // Delay to let DOM update
    setTimeout(() =>
      scrollIntoViewIfNeeded(element, {
        marginTop,
        behavior: first ? 'auto' : 'smooth',
      })
    )
  }, [])

  return { activeRef }
}
