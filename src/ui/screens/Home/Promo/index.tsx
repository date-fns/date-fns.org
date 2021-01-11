import { h } from 'preact'
import { Navigation } from './Navigation'
import {
  Outer,
  Inner,
  Logo,
  LogoImage,
  LogoName,
  Header,
  Text,
  GettingStarted,
  GettingStartedLink,
} from './style.css'
import logoPath from './img/logo.svg'
import { RouterLink } from '~/ui/router'
import { DEFAULT_PAGE } from '~/constants'
import { docLink } from '~/ui/router/docLink'

export const Promo = () => (
  <Outer>
    <Inner>
      <Logo>
        <LogoImage tag="img" src={logoPath} />
        <LogoName>date-fns</LogoName>
      </Logo>

      <Header tag="h1">Modern JavaScript date utility library</Header>

      <Text>
        date-fns provides the most comprehensive, yet simple and consistent
        toolset for manipulating <strong>JavaScript dates</strong> in{' '}
        <strong>a&nbsp;browser</strong> & <strong>Node.js</strong>.
      </Text>

      <GettingStarted>
        <GettingStartedLink
          tag={RouterLink}
          to={docLink({ page: DEFAULT_PAGE })}
        >
          Documentation
        </GettingStartedLink>
      </GettingStarted>

      <Navigation />
    </Inner>
  </Outer>
)
