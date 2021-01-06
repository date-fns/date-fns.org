import { h, FunctionComponent } from 'preact'
import { RouterLink, AppRouteRef } from 'ui/router'
import { Action } from './style.css'

interface Props {
  to: AppRouteRef
  title?: string
}

export const HomeAction: FunctionComponent<Props> = ({
  to,
  title,
  children
}) => (
  <Action tag={RouterLink} to={to} title={title}>
    {children}
  </Action>
)
