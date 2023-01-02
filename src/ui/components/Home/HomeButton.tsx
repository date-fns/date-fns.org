import { h, FunctionComponent } from 'preact'
import classNames from 'classnames'
import * as styles from './styles.css'

interface Props {
  href: string
  newTab?: boolean
  type: keyof typeof styles.button
}

export const HomeButton: FunctionComponent<Props> = ({
  href,
  children,
  newTab,
  type,
}) => (
  <a
    class={classNames(styles.button[type])}
    href={href}
    target={newTab ? '_blank' : undefined}
    rel={newTab ? 'noopener noreferrer' : undefined}
    type={type}
  >
    {children}
  </a>
)
