import { CSSComponent, CSSPreactComponent } from 'types/decss'
import { RouterLink } from 'ui/router'

export const Block: CSSComponent
export const InnerContainer: CSSComponent
export const Header: CSSComponent
export const SubHeader: CSSComponent
export const Actions: CSSComponent
export const Action: CSSPreactComponent<typeof RouterLink>
export const Link: CSSPreactComponent<typeof RouterLink>
export const Button: CSSComponent<{
  type: 'primary' | 'secondary'
}>
export const Content: CSSComponent
export const Text: CSSComponent
