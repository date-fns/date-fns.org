import React from 'react'
import Promo from './promo'
import Features from './features'
import I18n from './i18n'
import Examples from './examples'
import Testimonials from './testimonials'
import Contributors from './contributors'
import Sponsorship from './sponsorship'
import Footer from './footer'
import ExperimentsBanner from 'app/ui/_lib/experiments_banner'

export default function Home({ locales, contributors }) {
  return (
    <div className="home">
      <ExperimentsBanner />
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
