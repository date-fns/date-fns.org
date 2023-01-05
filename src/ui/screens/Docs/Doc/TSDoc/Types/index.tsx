import { h } from 'preact'
import { DeclarationReflection } from 'typedoc'
import { createModal } from '~/ui/components/Modals'
import * as styles from './styles.css'

export interface TypesModalProps {
  typeId: number
  tsdoc: DeclarationReflection
}

export const useTypesModal = createModal<TypesModalProps>(
  ({ typeId, tsdoc }) => {
    return (
      <div class={styles.wrapper}>
        <div class={styles.inner}>
          <div class={styles.nav}>TODO: Navigation</div>
          <div class={styles.content}>TODO: Content</div>
        </div>
      </div>
    )
  },
  { size: 'medium', closeOnOverlayClick: true }
)
