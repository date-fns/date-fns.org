import { h, FunctionComponent } from 'preact'
import * as styles from './styles.css'

interface Props {
  href: string
  title?: string
}

export const HomeExternalAction: FunctionComponent<Props> = ({
  href,
  title,
  children,
}) => (
  <a class={styles.action} href={href} title={title}>
    {children}
  </a>
)
