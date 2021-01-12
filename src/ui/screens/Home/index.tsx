import { h } from 'preact'
// import { JobsBanner } from '~/ui/components/JobsBanner'
import { Promo } from './Promo'
import { Examples } from './Examples'
import { Features } from './Features'
import { Testimonials } from './Testimonials'
import { Sponsorship } from './Sponsorship'
import { Contributors } from './Contributors'
import { Footer } from './Footer'
import { Screen } from '~/ui/components/Screen'

export const Home = () => (
  <Screen>
    {/* <JobsBanner size="large" /> */}
    <Promo />
    <Examples />
    <Features />
    <Testimonials />
    <Sponsorship />
    <Contributors />
    <Footer />
  </Screen>
)
