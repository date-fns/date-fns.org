import { match } from 'assert'
import { FunctionComponent, h } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import * as styles from './styles.css'

interface IdHightlightProps {
  id: string | undefined
  match?: (id: string, hash: string) => boolean
}

export const IdHightlight: FunctionComponent<IdHightlightProps> = ({
  id,
  children,
  match,
}) => {
  const spanRef = useRef<HTMLSpanElement>(null)
  const stopAnimation = useRef<() => void>()

  useEffect(() => {
    if (!id || spanRef.current === null) return

    const skip = match
      ? !match(id, location.hash)
      : location.hash.slice(1) !== id
    if (skip) return

    stopAnimation.current?.()

    const span = spanRef.current

    !isInViewport(span) && span.scrollIntoView({ behavior: 'smooth' })

    const cbOut = () => {
      span.removeEventListener('transitionend', cbOut)

      span.classList.remove(styles.highlightIn)
      span.classList.remove(styles.highlightOut)

      stopAnimation.current = undefined
    }

    const cbIn = () => {
      span.removeEventListener('transitionend', cbIn)

      span.addEventListener('transitionend', cbOut)
      span.classList.add(styles.highlightOut)
    }

    stopAnimation.current = () => {
      span.removeEventListener('transitionend', cbIn)
      cbOut()
      stopAnimation.current = undefined
    }

    spanRef.current.addEventListener('transitionend', cbIn)
    span.classList.add(styles.highlightIn)
  }, [id, location.hash, spanRef.current])

  return (
    <span ref={spanRef} class={styles.text}>
      {children}
    </span>
  )
}

function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
