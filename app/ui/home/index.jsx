import React from 'react'
import Promo from './promo'
import Features from './features'
import I18n from './i18n'
import Examples from './examples'
import Testimonials from './testimonials'
import Contributors from './contributors'
import HireLesha from './hire_lesha'
import Sponsorship from './sponsorship'
import Footer from './footer'

export default function Home ({ locales, contributors }) {
  return (
    <div className='home'>
      <Promo />
      <Examples />
      <Features />
      <I18n locales={locales} />
      <Testimonials />
      <HireLesha />
      <Contributors contributors={contributors} />
      <Sponsorship />
      <Footer />
    </div>
  )
}
