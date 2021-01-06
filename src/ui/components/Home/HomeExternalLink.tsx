import { h, FunctionComponent } from 'preact'
import { Link } from './style.css'

interface Props {
  href: string
  title?: string
  newTab?: boolean
}

export const HomeExternalLink: FunctionComponent<Props> = ({
  href,
  title,
  children,
  newTab
}) => (
  <Link
    tag="a"
    href={href} 
    title={title}
    target={newTab ? "_blank" : undefined}
    rel={newTab ? "noopener noreferrer" : undefined}
  >
    {children}
  </Link>
)
