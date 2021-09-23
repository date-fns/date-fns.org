import { h } from 'preact'
import {
  Container,
  Header,
  // Footer,
  Block,
} from '~/ui/components/JobsWidget/style.css'
import { BlockContent, HireButton, Description } from './style.css'

export const HireWidget = () => (
  <Container>
    <Block>
      <BlockContent>
        <Header>Your company is hiring JS developers?</Header>

        <Description>
          Find a great teammate and support date-fns. Get in front of tens of
          thousands of JS devs.
        </Description>

        <HireButton
          tag="a"
          href="https://jobs.date-fns.org/hire"
          target="_blank"
        >
          Promote job here
        </HireButton>
      </BlockContent>
    </Block>

    {/* <Footer>Subscribe to support date-fns development, it's free!</Footer> */}
  </Container>
)
