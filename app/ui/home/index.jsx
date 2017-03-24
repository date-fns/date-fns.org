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
import {VersionPropType} from 'app/types/version'
//import {fetchHomeContent} from 'app/acts/home'

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

// export default class Home extends React.Component {
//   static propTypes = {
//     state: PropTypes.object.isRequired
//   }
//
//   // componentWillMount () {
//   //   this._fetchContentIfRequired(this.props)
//   // }
//   //
//   // componentWillReceiveProps (nextProps) {
//   //   this._fetchContentIfRequired(this.props, nextProps)
//   // }
//
//   // _fetchContentIfRequired (props, nextProps) {
//   //   const {state} = nextProps || props
//   //   const selectedVersionTag = state.get('selectedVersionTag')
//   //   const firstCallOrChanged = !nextProps || selectedVersionTag !== props.state.get('selectedVersionTag')
//   //
//   //   if (selectedVersionTag && firstCallOrChanged) {
//   //     fetchHomeContent()
//   //   }
//   // }
//
//   render () {
//     const {state} = this.props
//     const selectedVersionTag = state.get('selectedVersionTag')
//
//     const gettingStartedTabs = state.getIn(['versions', selectedVersionTag, 'gettingStartedTabs'])
//     const gettingStarted = state.getIn(['versions', selectedVersionTag, 'gettingStarted'])
//     const locales = state.getIn(['versions', selectedVersionTag, 'locales'])
//
//     return <div className='home'>
//       <Promo gettingStartedTabs={gettingStartedTabs} gettingStarted={gettingStarted} />
//       <Features />
//       {/*<I18n locales={locales} />*/}
//       <Testimonials />
//       {/*<Contributors contributors={[][>state.get('contributors')<]} />*/}
//       <Sponsorship />
//       <Footer />
//     </div>
//   }
// }
