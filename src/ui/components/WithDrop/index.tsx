import classNames from 'classnames'
import { debounce } from 'js-fns'
import { ComponentChildren, h } from 'preact'
import { createPortal } from 'preact/compat'
import { useEffect, useRef, useState } from 'preact/hooks'
import { Drop, DropPosition } from '../Drop'
import * as styles from './styles.css'

export interface WithDropProps {
  drop: ComponentChildren
  children: ComponentChildren
  trigger?: 'hover' | 'click' | 'render'
  'data-testid'?: string
  style?: any
  show?: boolean
  disabled?: boolean
  onShow?: () => void
  onHide?: () => void
  preferPosition?: DropPosition
  inline?: boolean
  block?: boolean
}

export default function WithDrop({
  drop,
  children,
  trigger = 'hover',
  'data-testid': testId,
  style,
  show: forceShow,
  disabled,
  onShow,
  onHide,
  preferPosition,
  inline,
  block,
}: WithDropProps) {
  const portals =
    typeof document !== 'undefined' && document.getElementById('portals')
  const [show, setShowState] = useState(!!forceShow)

  useEffect(() => {
    const newShow = !!forceShow
    if (show !== newShow) setShowState(newShow)
  }, [forceShow])

  function setShow(newShow: boolean) {
    newShow ? onShow?.() : onHide?.()
    setShowState(newShow)
  }
  const [_, setScrollUpdated] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const dropRef = useRef<HTMLDivElement | undefined>(undefined)
  const area = containerRef.current?.getBoundingClientRect()

  useEffect(() => {
    if (!containerRef.current) return
    const listener = debounce(() => setScrollUpdated(Date.now()), 50)
    window.addEventListener('scroll', listener, true)
    window.addEventListener('resize', listener)
    return () => {
      window.removeEventListener('scroll', listener, true)
      window.removeEventListener('resize', listener)
    }
  }, [containerRef.current])

  useEffect(() => {
    if (!show) return

    const listener = (e: MouseEvent) => {
      if (!show || trigger !== 'click' || !dropRef.current || !e.target) return
      const outsideClick = !dropRef.current.contains(e.target as Node)
      if (outsideClick) setShow(false)
    }

    window.addEventListener('click', listener)
    return () => window.removeEventListener('click', listener)
  }, [show])

  useEffect(() => {
    if (!show || trigger !== 'hover') return

    const listener = (e: MouseEvent) => {
      const { x, y } = e
      const dropArea = dropRef.current?.getBoundingClientRect()
      const containerArea = containerRef.current?.getBoundingClientRect()

      const insideDrop =
        dropArea &&
        x >= dropArea.left &&
        x <= dropArea.right &&
        y >= dropArea.top &&
        y <= dropArea.bottom

      const insideContainer =
        containerArea &&
        x >= containerArea.left &&
        x <= containerArea.right &&
        y >= containerArea.top &&
        y <= containerArea.bottom

      if (!forceShow && !insideDrop && !insideContainer) setShow(false)
    }

    document.addEventListener('mousemove', listener)
    return () => document.removeEventListener('mousemove', listener)
  }, [show, trigger, containerRef.current, dropRef.current])

  return (
    <div
      class={classNames(
        inline
          ? styles.inlineWrapper
          : block
          ? styles.blockWrapper
          : styles.wrapper
      )}
      ref={containerRef}
      onMouseEnter={trigger === 'hover' ? () => setShow(true) : undefined}
      onClick={
        trigger === 'click' && !disabled
          ? (e: MouseEvent) => {
              e.preventDefault()
              e.stopPropagation()
              setShow(!show)
            }
          : undefined
      }
      data-testid={testId}
      style={style}
    >
      {children}
      {portals &&
        area &&
        show &&
        drop &&
        createPortal(
          <Drop
            onClick={trigger === 'click' ? () => setShow(!show) : undefined}
            area={area}
            innerRef={dropRef}
            preferPosition={preferPosition}
          >
            {drop}
          </Drop>,
          portals
        )}
    </div>
  )
}
