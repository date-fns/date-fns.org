import { h } from 'preact'
import { Banner } from 'ui/components/Banner'
import { Promo } from './Promo'
import { Examples } from './Examples'
import { Features } from './Features'
import { Testimonials } from './Testimonials'
// import { Sponsorship } from './Sponsorship'
// import { Contributors } from './Contributors'
import { Footer } from './Footer'
import { Screen } from 'ui/components/Screen'

export const Home = () => (
  <Screen>
    <Banner size="large" />
    <Promo />
    <Examples />
    <Features />
    {/* <I18n locales={locales} /> */}
    <Testimonials />
    {/* <Sponsorship />
    <Contributors /> */}
    <Footer />
  </Screen>
)
