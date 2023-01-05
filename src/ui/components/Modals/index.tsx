import { ModalPortal, ModalPortalProps } from '~/ui/components/ModalPortal'
import {
  ComponentChild,
  ComponentChildren,
  createContext,
  FunctionComponent,
  h,
} from 'preact'
import {
  MutableRef,
  Ref,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'preact/hooks'
import { useRefState } from '~/utils/useRefState'

export interface ModalComponent {
  id: string
  component: ComponentChildren
}

export type ModalOverlayRef = MutableRef<HTMLDivElement | null>

export type ModalOnCloseRef = MutableRef<(() => unknown) | null>

export interface ModalAPI {
  modal: ModalComponent | undefined
  props: ShowModalInnerProps
  showModal: ShowModal
  overlayRef: ModalOverlayRef
  onCloseRef: ModalOnCloseRef
}

export type ShowModalInnerProps = Pick<
  ModalPortalProps,
  'size' | 'bare' | 'closeOnOverlayClick' | 'adjusted'
>

export interface ShowModalProps {
  modalId: string
  component: ComponentChild | null
  props?: ShowModalInnerProps
  onClose?: () => unknown
}

export type ShowModal = (props: ShowModalProps) => void

export const ModalsContext = createContext<ModalAPI>({
  modal: undefined,
  props: {},
  showModal: () => {},
  overlayRef: { current: null },
  onCloseRef: { current: null },
})

export interface ModalsProps {
  api: ModalAPI
}

export function Modals({
  api: { modal, props, showModal, overlayRef },
}: ModalsProps) {
  if (!modal) return null
  return (
    <ModalPortal
      close={() => {
        showModal({ modalId: modal.id, component: undefined })
      }}
      overlayRef={overlayRef}
      {...props}
    >
      {modal.component}
    </ModalPortal>
  )
}

export function useModals(): ModalAPI {
  const [modal, setModal] = useRefState<ModalComponent | undefined>(undefined)
  const [props, setProps] = useState<ShowModalInnerProps>({ size: 'medium' })
  const overlayRef: ModalOverlayRef = useRef(null)
  const onCloseRef: ModalOnCloseRef = useRef(null)

  const showModal: ShowModal = ({
    modalId,
    component,
    props: newProps,
    onClose,
  }) => {
    // Call current modal onClose callback
    if (!component) onCloseRef.current?.()
    // Assign new callback
    onCloseRef.current = onClose || null

    // Ignore close if another modal got opened
    if (!component && modalId !== modal.current?.id) return

    setModal(component ? { id: modalId, component } : undefined)
    setProps(newProps || {})
  }

  return { modal: modal.current, props, showModal, overlayRef, onCloseRef }
}

export interface ModalPropsBase {
  close: () => void
  overlayRef: ModalOverlayRef
}

export interface ModalPropsExtra {
  onClose: () => unknown
}

export function createModal<Props extends Record<string, any>>(
  Component: FunctionComponent<Props & ModalPropsBase>,
  innerProps?: Omit<ModalPortalProps, keyof ModalPropsBase | 'children'>
) {
  return (): ((props: Props & ModalPropsExtra) => void) => {
    const modalId = useMemo(() => Date.now().toString(), [])
    const { showModal, overlayRef } = useContext(ModalsContext)

    return ({ onClose, ...props }) => {
      showModal({
        modalId,
        component: (
          // @ts-ignore: we're tricking TypeScript, this is ok
          <Component
            {...props}
            close={() => {
              showModal({ modalId, component: null })
            }}
            overlayRef={overlayRef}
          />
        ),
        props: innerProps,
        onClose,
      })
    }
  }
}
