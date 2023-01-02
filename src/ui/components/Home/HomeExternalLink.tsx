import { h, FunctionComponent } from 'preact'
import * as styles from './styles.css'

interface Props {
  href: string
  title?: string
  newTab?: boolean
}

export const HomeExternalLink: FunctionComponent<Props> = ({
  href,
  title,
  children,
  newTab,
}) => (
  <a
    class={styles.link}
    href={href}
    title={title}
    target={newTab ? '_blank' : undefined}
    rel={newTab ? 'noopener noreferrer' : undefined}
  >
    {children}
  </a>
)
