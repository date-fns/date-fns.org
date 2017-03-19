import React, {PropTypes} from 'react'
import I from 'immutable'
import Promo from './promo'
import Features from './features'
import I18n from './i18n'
import Examples from './examples'
import Testimonials from './testimonials'
import Contributors from './contributors'
import Sponsorship from './sponsorship'
import Footer from './footer'
import {fetchHomeContent} from 'app/acts/home'

export default class Home extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired
  }

  componentWillMount () {
    this._fetchContentIfRequired(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this._fetchContentIfRequired(this.props, nextProps)
  }

  _fetchContentIfRequired (props, nextProps) {
    const {state} = nextProps || props
    const selectedVersionTag = state.get('selectedVersionTag')
    const firstCallOrChanged = !nextProps || selectedVersionTag !== props.state.get('selectedVersionTag')

    if (selectedVersionTag && firstCallOrChanged) {
      fetchHomeContent()
    }
  }

  render () {
    const {state} = this.props
    const selectedVersionTag = state.get('selectedVersionTag')
    //const homeContent = state.getIn(['homeContent', 'selectedVersionTag'], I.Map())
    const selectedVersion = state.get('selectedVersion')

    if (selectedVersion) {
      return <div className='home'>
        <Promo gettingStarted={selectedVersion.gettingStarted} />
      </div>
    } else {
      return null
    }
  }
      //<Features />
      //<I18n locales={0[>state.getIn(['locales', version])*/} version={0/*version<]} />
      //<Testimonials />
      //<Contributors contributors={[][>state.get('contributors')<]} />
      //<Sponsorship />
      //<Footer />
}
