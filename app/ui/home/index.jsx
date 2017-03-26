import React from 'react'
import Promo from './promo'
import Features from './features'
// import I18n from './i18n'
// import Examples from './examples'
import Testimonials from './testimonials'
// import Contributors from './contributors'
import Sponsorship from './sponsorship'
import Footer from './footer'
import {VersionPropType} from 'app/types/version'

export default function Home ({selectedVersion}) {
  return <div className='home'>
    <Promo
      gettingStartedTabs={selectedVersion.gettingStartedTabs}
      gettingStarted={selectedVersion.gettingStarted}
    />
    <Features />
    {/*<I18n locales={locales} />*/}
    <Testimonials />
    {/*<Contributors contributors={[][>state.get('contributors')<]} />*/}
    <Sponsorship />
    <Footer />
  </div>
}

Home.propTypes = {
  selectedVersion: VersionPropType.isRequired
}
