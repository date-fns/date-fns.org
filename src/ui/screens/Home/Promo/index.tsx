import { h } from 'preact'
import { Navigation } from './navigation'
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
import { RouterLink } from 'ui/router'

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
        <GettingStartedLink tag={RouterLink} to={{ name: 'docs', params: { doc: 'Getting-Started' } }}>
          Documentation
        </GettingStartedLink>
      </GettingStarted>

      <Navigation />
    </Inner>
  </Outer>
)
