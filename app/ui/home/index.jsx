import React from 'react'
import Promo from './promo'
import Features from './features'
import I18n from './i18n'
import Examples from './examples'
import Testimonials from './testimonials'
import Contributors from './contributors'
import Sponsorship from './sponsorship'
import Footer from './footer'
import Banner from 'app/ui/_lib/banner'

export default function Home({ locales, contributors }) {
  return (
    <div className="home">
      <Banner />
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
