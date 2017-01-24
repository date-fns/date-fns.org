import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import I from 'immutable'
import routes from 'app/routes'
import Ui from 'app/ui'
import {trackPageView} from 'app/acts/tracking_acts'
import dateFns from 'date-fns'
import {loop, act} from 'enso'
import version from 'app/_lib/version'

routes.start((routeData, routeEvenType) => {
  // Ignore initial update event, since it's already handled by Segment
  if (routeEvenType !== 'synthetic') {
    trackPageView()
  }

  act(state => state.set('routeData', I.fromJS(routeData)))
})

loop(I.fromJS({version, locales: I.Map()}), (state, prevState) => {
  ReactDOM.render(<Ui state={state} />, document.getElementById('canvas'))
})

window.dateFns = dateFns
