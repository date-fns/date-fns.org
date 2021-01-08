import { DEFAULT_PAGE } from '~/constants'
import { h } from 'preact'
import { HomeBlock } from '~/ui/components/Home'
import { RouterLink } from '~/ui/router'
import { Container, Row } from './style.css'

export const Footer = () => (
  <HomeBlock>
    <Container>
      <Row>
        <RouterLink to={{ name: 'docs', params: { doc: DEFAULT_PAGE } }}>
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
