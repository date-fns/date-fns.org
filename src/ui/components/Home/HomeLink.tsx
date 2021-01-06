import { h, FunctionComponent } from 'preact'
import { RouterLink, AppRouteRef } from 'ui/router'
import { Link } from './style.css'

interface Props {
  to: AppRouteRef
  title?: string
}

export const HomeLink: FunctionComponent<Props> = ({ to, title, children }) => (
  <Link tag={RouterLink} to={to} title={title}>
    {children}
  </Link>
)
