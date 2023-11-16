import { h, FunctionComponent } from 'preact'
import { RouterLink, AppRouteRef } from '~/ui/router'
import * as styles from './styles.css'

interface Props {
  to: AppRouteRef
  title?: string
}

export const HomeLink: FunctionComponent<Props> = ({ to, title, children }) => (
  <RouterLink class={styles.link} to={to} title={title}>
    {children}
  </RouterLink>
)
