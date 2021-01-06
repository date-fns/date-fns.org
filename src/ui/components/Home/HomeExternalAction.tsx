import { h, FunctionComponent } from 'preact'
import { Action } from './style.css'

interface Props {
  href: string
  title?: string
}

export const HomeExternalAction: FunctionComponent<Props> = ({
  href,
  title,
  children
}) => (
  <Action tag="a" href={href} title={title}>
    {children}
  </Action>
)
