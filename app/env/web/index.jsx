import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import routes from 'app/routes'
import Ui from 'app/ui'
import {trackPageView} from 'app/acts/tracking_acts'
import dateFns from 'date-fns'
import {loop, act} from 'enso'
import I from 'immutable'
import State from 'app/types/state'
import {fetchVersions, fetchDocsIfNeeded} from 'app/acts/versions'

routes.start((routeData, routeEvenType) => {
  // Ignore initial update event, since it's already handled by Segment
  if (routeEvenType !== 'synthetic') {
    trackPageView()
  }

  act(state => state.set('routeData', I.fromJS(routeData)))
})

fetchVersions()

loop(State(), (state, prevState) => {
  fetchDocsIfNeeded(state, prevState)
  ReactDOM.render(<Ui state={state} />, document.getElementById('canvas'))
})

// TODO: Load it asynchronously
window.dateFns = dateFns
