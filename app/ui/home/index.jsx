import React from 'react'
import Promo from './promo'
import Features from './features'
import I18n from './i18n'
// import Examples from './examples'
import Testimonials from './testimonials'
import Contributors from './contributors'
import HireLesha from './hire_lesha'
import Sponsorship from './sponsorship'
import Footer from './footer'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {VersionPropType} from 'app/types/version'
import {EitherPropType} from 'app/types/either'

export default function Home ({version, contributors}) {
  return <div className='home'>
    <Promo version={version} />
    <Features />
    <I18n version={version} />
    <Testimonials />
    <HireLesha />
    <Contributors contributors={contributors} />
    <Sponsorship />
    <Footer selectedVersionTag={version.map(v => v.tag)} />
  </div>
}

Home.propTypes = {
  version: EitherPropType(React.PropTypes.object, VersionPropType.isRequired).isRequired,
  contributors: EitherPropType(React.PropTypes.object, ImmutablePropTypes.list.isRequired).isRequired,
}
