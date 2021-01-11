import { DEFAULT_PAGE } from '~/constants'
import { h } from 'preact'
import { HomeBlock } from '~/ui/components/Home'
import { RouterLink } from '~/ui/router'
import { Container, Row } from './style.css'
import { docLink } from '~/ui/router/docLink'
import { DEFAULT_SUBMODULE } from '@date-fns/date-fns-db'

export const Footer = () => (
  <HomeBlock>
    <Container>
      <Row>
        <RouterLink to={docLink(DEFAULT_PAGE, DEFAULT_SUBMODULE)}>
          Documentation
        </RouterLink>
      </Row>
      <Row>
        <a href="https://github.com/date-fns/date-fns">GitHub</a>
      </Row>
      <Row>
        <a href="https://github.com/date-fns/date-fns/discussions">Community</a>
      </Row>
      <Row>
        <a href="https://twitter.com/date_fns">Twitter</a>
      </Row>
      <Row isLicense>
        <a href="https://kossnocorp.mit-license.org/">MIT © Sasha Koss</a>
      </Row>
    </Container>
  </HomeBlock>
)
