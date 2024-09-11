import classNames from 'classnames'
import { ComponentChildren, FunctionComponent, h } from 'preact'
import { createPortal } from 'preact/compat'
import { MutableRef, useEffect } from 'preact/hooks'
import { ModalPortalCloseIcon } from './CloseIcon'
import * as styles from './styles.css'

export interface ModalPortalProps {
  children: ComponentChildren
  close: () => void
  bare?: boolean
  size?: keyof typeof styles.window
  closeOnOverlayClick?: boolean
  adjusted?: boolean
  overlayRef?: MutableRef<HTMLDivElement | null>
}

export const ModalPortal: FunctionComponent<ModalPortalProps> = ({
  children,
  close,
  bare,
  size = 'medium',
  closeOnOverlayClick,
  adjusted,
  overlayRef,
}) => {
  const portals = document.getElementById('portals')

  useEffect(() => {
    if (!portals) return
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = 'auto')
  }, [portals])

  if (!portals) return null

  return createPortal(
    <div
      class={classNames(styles.overlay, !!adjusted && styles.overlayAdjusted)}
      ref={overlayRef}
      data-testid="modal-overlay"
    >
      {bare ? (
        children
      ) : (
        <div
          class={styles.windowWrapper}
          onClick={(e: MouseEvent) => {
            if (closeOnOverlayClick) e.target === e.currentTarget && close()
          }}
        >
          <div class={styles.window[size]}>
            <button class={styles.close} onClick={close}>
              <ModalPortalCloseIcon />
            </button>

            {children}
          </div>
        </div>
      )}
    </div>,
    portals
  )
}
