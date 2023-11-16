import classNames from 'classnames'
import isEqual from 'lodash/isEqual'
import { ComponentChildren, h, JSX, RefObject } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

import * as styles from './styles.css'

export const DropInner = Inner

export interface DropArea {
  x: number
  y: number
  width: number
  height: number
}

export type DropPosition = 'above' | 'below' | 'left' | 'right'

export interface DropProps {
  children: ComponentChildren
  area: DropArea
  ghost?: boolean
  innerRef?: RefObject<HTMLDivElement | undefined>
  onClick?: JSX.MouseEventHandler<any>
  preferPosition?: DropPosition
}

/**
 * Floating popup, used for dropdown menus, tooltips, etc.
 */
export function Drop({
  area,
  children,
  ghost,
  innerRef,
  onClick,
  preferPosition,
}: DropProps) {
  const [trianglePosition, setTrianglePosition] = useState<TrianglePosition>(
    'below'
  )

  const [wrapper, setWrapper] = useState<HTMLDivElement | undefined>(undefined)
  const [wrapperArea, setWrapperArea] = useState<DropArea | undefined>(
    undefined
  )

  useEffect(() => {
    if (!wrapper || !wrapperArea?.width) return

    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const width = wrapperArea.width
    const height = wrapperArea.height

    wrapper.style.opacity = '1'

    let verticalLeft = area.x + area.width / 2 - width / 2
    if (verticalLeft < 0) verticalLeft = 0
    else if (verticalLeft + width > windowWidth)
      verticalLeft = windowWidth - width

    let horizontalTop = area.y + area.height / 2 - height / 2
    if (horizontalTop < 0) horizontalTop = 0
    else if (horizontalTop + height > windowHeight)
      horizontalTop = windowHeight - height

    const positioning = {
      below: () => {
        const belowTop = area.y + area.height
        if (belowTop + height < windowHeight) {
          wrapper.style.top = `${belowTop}px`
          wrapper.style.left = `${verticalLeft}px`
          setTrianglePosition('above')
          return true
        }
        return false
      },

      above: () => {
        const aboveTop = area.y - height
        if (aboveTop > 0) {
          wrapper.style.top = `${aboveTop}px`
          wrapper.style.left = `${verticalLeft}px`
          setTrianglePosition('below')
          return true
        }
        return false
      },

      left: () => {
        const left = area.x - width
        if (left > 0) {
          wrapper.style.top = `${horizontalTop}px`
          wrapper.style.left = `${left}px`
          setTrianglePosition('right')
          return true
        }
        return false
      },

      right: () => {
        const right = area.x + area.width
        if (right + width < windowWidth) {
          wrapper.style.top = `${horizontalTop}px`
          wrapper.style.left = `${right}px`
          setTrianglePosition('left')
          return true
        }
        return false
      },
    }

    if (preferPosition === 'left') {
      circlePositioning([positioning.left, positioning.right])
    } else if (preferPosition === 'right') {
      circlePositioning([positioning.right, positioning.left])
    } else if (preferPosition === 'above') {
      circlePositioning([positioning.above, positioning.below])
    } else {
      circlePositioning([positioning.below, positioning.above])
    }
  }, [
    trianglePosition,
    wrapper,
    wrapperArea?.width,
    wrapperArea?.height,
    area.x,
    area.width,
    area.y,
    area.height,
    preferPosition,
  ])

  const wrapperCallback = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el) return
      if (innerRef) innerRef.current = el
      setWrapper(el)
    },
    [innerRef]
  )

  useEffect(() => {
    const newArea = wrapper?.getBoundingClientRect()
    if (!isEqual(newArea, wrapperArea)) setWrapperArea(newArea)
  })

  return (
    <div
      class={classNames(
        styles.drop,
        ghost && styles.ghost,
        ['above', 'below'].includes(trianglePosition) && styles.vertical
      )}
      ref={wrapperCallback}
      onClick={onClick}
    >
      {(trianglePosition === 'above' || trianglePosition === 'left') && (
        <Triangle position={trianglePosition} />
      )}

      <Inner>
        {typeof children === 'string' ? (
          <div class={styles.string}>{children}</div>
        ) : (
          children
        )}
      </Inner>

      {(trianglePosition === 'below' || trianglePosition === 'right') && (
        <Triangle position={trianglePosition} />
      )}
    </div>
  )
}

function circlePositioning(fns: Array<() => void | boolean>) {
  for (let i = 0; i < fns.length; i++) {
    if (fns[i]?.()) return
  }
}

export type TrianglePosition = 'above' | 'below' | 'left' | 'right'

interface TriangleProps {
  position: TrianglePosition
}

function Triangle(position: TriangleProps) {
  return (
    <div
      class={classNames(styles.triangle, styles.position[position.position])}
    ></div>
  )
}

interface InnerProps {
  children: ComponentChildren
}

function Inner({ children }: InnerProps) {
  return <div class={classNames(styles.inner)}>{children} </div>
}
