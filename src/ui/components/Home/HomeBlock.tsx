import { h, ComponentChild, FunctionComponent } from 'preact'
import * as styles from './styles.css'

interface Props {
  header?: ComponentChild
  subHeader?: ComponentChild
  actions?: ComponentChild
}

export const HomeBlock: FunctionComponent<Props> = ({
  header,
  subHeader,
  actions,
  children,
}) => (
  <div class={styles.block}>
    <div class={styles.innerContainer}>
      {header && <h2 class={styles.header}>{header}</h2>}

      {subHeader && <h3 class={styles.subHeader}>{subHeader}</h3>}

      <div class={styles.content}>{children}</div>

      <div class={styles.actions}>{actions}</div>
    </div>
  </div>
)
