import 'babel-polyfill'
import 'whatwg-fetch'
import React from 'react'
import ReactDOM from 'react-dom'
import routes from 'app/routes'
import Ui from 'app/ui'
import { trackPageView } from 'app/acts/tracking_acts'
import dateFns from 'date-fns'
import { loop, act } from 'enso'
import I from 'immutable'
import State from 'app/types/state'
import { fetchVersions, onVersionChange } from 'app/acts/versions'
import { fetchContributors } from 'app/acts/contributors'

routes.start((routeData, routeEvenType) => {
  // Ignore initial update event, since it's already handled by Segment
  if (routeEvenType !== 'synthetic') {
    trackPageView()
  }

  act(state => state.set('routeData', I.fromJS(routeData)))
})

fetchVersions()
fetchContributors()

loop(State(), (state, prevState) => {
  onVersionChange(state, prevState)
  ReactDOM.render(<Ui state={state} />, document.getElementById('canvas'))
})

// TODO: Load it asynchronously
window.dateFns = dateFns

// eslint-disable-next-line no-console
console.log(
  `%c(⩗) date-fns console
%cAll date-fns functions are available under window.dateFns, so you are welcome to try them out here.
For example:
%cdateFns.isToday(new Date())`,
  "color: #770c56; font-size: 24px; font-family: sans-serif;",
  "color: #7B6D77; font-size: 16px; font-family: sans-serif;",
  "" // default styles for example code
);
