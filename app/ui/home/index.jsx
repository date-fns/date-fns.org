import React from 'react'
import Promo from './promo'
import Features from './features'
import I18n from './i18n'
import Examples from './examples'
import Testimonials from './testimonials'
import Contributors from './contributors'
import Sponsorship from './sponsorship'
import Footer from './footer'
import OpenCollectiveBanner from 'app/ui/_lib/open_collective_banner'

export default function Home({ locales, contributors }) {
  return (
    <div className="home">
      <OpenCollectiveBanner />
      <Promo />
      <Examples />
      <Features />
      <I18n locales={locales} />
      <Testimonials />
      <Sponsorship />
      <Contributors contributors={contributors} />
      <Footer />
    </div>
  )
}
