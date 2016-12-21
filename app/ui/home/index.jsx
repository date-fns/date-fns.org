import React from 'react'
import Promo from './promo'
import Features from './features'
import Examples from './examples'
import Testimonials from './testimonials'
import Contributors from './contributors'
import Sponsorship from './sponsorship'

export default class Home extends React.Component {
  static propTypes = {
    state: React.PropTypes.object
  }

  render () {
    const {state} = this.props
    return <div className='home'>
      <div className='home-promo'>
        <Promo />
      </div>

      <div className='home-features'>
        <div className='home-features_inner'>
          <Features />
        </div>
      </div>

      <div className='home-testimonials'>
        <div className='home-testimonials_inner'>
          <Testimonials />
        </div>
      </div>

      <div className='home-contributors'>
        <div className='home-contributors_inner'>
          <Contributors contributors={state.get('contributors')} />
        </div>
      </div>

      <div className='home-sponsorship'>
        <div className='home-sponsorship_inner'>
          <Sponsorship />
        </div>
      </div>
    </div>
  }
}
