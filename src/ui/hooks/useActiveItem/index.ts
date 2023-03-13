import { useEffect, useRef, useState } from 'preact/hooks'
import {
  scrollIntoViewIfNeeded,
  ScrollIntoViewIfNeededOptions,
} from '~/utils/dom'

export function useActiveItem(
  id: unknown,
  options?: ScrollIntoViewIfNeededOptions
) {
  const activeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollIntoViewIfNeeded(activeRef.current, options)
  }, [id])

  return { activeRef }
}
