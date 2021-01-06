import { h, FunctionComponent } from 'preact'
import { Button } from './style.css'

interface Props {
  href: string
  newTab?: boolean
  type: 'primary' | 'secondary'
}

export const HomeButton: FunctionComponent<Props> = ({
  href,
  children,
  newTab,
  type,
}) => (
  <Button
    tag="a"
    href={href} 
    target={newTab ? "_blank" : undefined}
    rel={newTab ? "noopener noreferrer" : undefined}
    type={type}
  >
    {children}
  </Button>
)
