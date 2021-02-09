import { h } from 'preact'
import {
  Container,
  Header,
  Footer,
  Block,
} from '~/ui/components/JobsWidget/style.css'
import {
  BlockContent,
  Form,
  Input,
  SubscribeButton,
  // TwitterLink,
  // TwitterIcon,
} from './style.css'
// import twitterIcon from './img/twitterBlack.svg'

export const JobsSubscribeWidget = () => (
  <Container>
    <Block>
      <BlockContent>
        <Header>Get awesome JavaScript jobs in your email</Header>
        <Form
          tag="form"
          action="https://cafe.us16.list-manage.com/subscribe/post?u=bf10ea6555c1dc38f3bcfa7e5&amp;id=b7d6fa4833"
          method="post"
          target="_blank"
          rel="noreferrer,noopener"
        >
          <Input
            tag="input"
            name="EMAIL"
            placeholder="Email"
            type="email"
            required
          />

          <SubscribeButton tag="button" type="submit">
            Subscribe
          </SubscribeButton>
        </Form>
      </BlockContent>
    </Block>

    <Footer>Subscribe to support date-fns development, it's free!</Footer>

    {/* <TwitterLink tag="a" href="https://twitter.com/date_fns" target="_blank">
      <TwitterIcon tag="img" src={twitterIcon} alt="Twitter icon" />
      Follow on Twitter
    </TwitterLink> */}
  </Container>
)
