import { CSSComponent, CSSPreactComponent } from 'types/decss'
import { RouterLink } from 'ui/router'

export const Navigation: CSSComponent
export const Link: CSSComponent
export const Icon: CSSComponent<{
  type: 'github' | 'twitter' | 'spectrum'
}>
export const LogoImage: CSSComponent
export const LogoName: CSSComponent
export const Header: CSSComponent
export const Text: CSSComponent
export const GettingStarted: CSSComponent
export const GettingStartedLink: CSSPreactComponent<typeof RouterLink>
