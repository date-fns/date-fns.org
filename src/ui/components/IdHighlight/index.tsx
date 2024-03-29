import { match } from 'assert'
import { FunctionComponent, h } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import { isInViewport } from '~/utils/dom'
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

    // TODO: Use scrollIntoViewIfNeeded(span, { behavior: 'smooth' }) with marginTop for page type
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
