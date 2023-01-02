import { h } from 'preact'
// import { JobsBanner } from '~/ui/components/JobsBanner'
import { Promo } from './Promo'
import { Examples } from './Examples'
import { Features } from './Features'
import { Testimonials } from './Testimonials'
import { Sponsorship } from './Sponsorship'
import { Contributors } from './Contributors'
import { Footer } from './Footer'
import * as styles from './styles.css'

export const Home = () => (
  <div class={styles.screen}>
    {/* <JobsBanner size="large" /> */}
    <Promo />
    <Examples />
    <Features />
    <Testimonials />
    <Sponsorship />
    <Contributors />
    <Footer />
  </div>
)
