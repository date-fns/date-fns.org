import React from 'react'
import Promo from './promo'
import Features from './features'
import I18n from './i18n'
// import Examples from './examples'
import Testimonials from './testimonials'
import Contributors from './contributors'
import Sponsorship from './sponsorship'
import Footer from './footer'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {VersionPropType} from 'app/types/version'

export default function Home ({version, contributors}) {
  return <div className='home'>
    <Promo version={version} />
    <Features />
    <I18n version={version} />
    <Testimonials />
    <Contributors contributors={contributors} />
    <Sponsorship />
    <Footer selectedVersionTag={version.map(v => v.tag)} />
  </div>
}

Home.propTypes = {
  version: VersionPropType.isRequired,
  contributors: React.PropTypes.oneOfType([
    ImmutablePropTypes.list,
    React.PropTypes.instanceOf(Error)
  ])
}
