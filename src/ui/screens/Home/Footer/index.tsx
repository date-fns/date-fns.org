import { h } from 'preact'
import { HomeBlock } from 'ui/components/Home'
import { Container, Row } from './style.css'

export const Footer = () => (
  <HomeBlock>
    <Container>
      <Row>
        {/* <Link name='doc' params={{ docId: 'Getting-Started' }}>
          Documentation
        </Link>*/}
        TODO
      </Row>
      <Row>
        <a href="https://github.com/date-fns/date-fns">GitHub</a>
      </Row>
      <Row>
        <a href="https://twitter.com/date_fns">Twitter</a>
      </Row>
      <Row>
        <a href="https://gitter.im/date-fns/support">Gitter</a>
      </Row>
      <Row isLicense>
        <a href="https://kossnocorp.mit-license.org/">MIT © Sasha Koss</a>
      </Row>
    </Container>
  </HomeBlock>
)
