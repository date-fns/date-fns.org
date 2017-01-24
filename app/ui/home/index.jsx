import React from 'react'
import Promo from './promo'
import Features from './features'
import I18n from './i18n'
import Examples from './examples'
import Testimonials from './testimonials'
import Contributors from './contributors'
import Sponsorship from './sponsorship'
import Users from './users'

export default class Home extends React.Component {
  static propTypes = {
    state: React.PropTypes.object
  }

  render () {
    const {state} = this.props
    const version = state.get('version')
    return <div className='home'>
      <Promo />
      <Features />
      <I18n locales={state.getIn(['locales', version])} version={version} />
      <Testimonials />
      <Contributors contributors={state.get('contributors')} />
      <Sponsorship />
      <Users />
    </div>
  }
}
