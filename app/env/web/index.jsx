import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import routes from 'app/routes'
import Ui from 'app/ui'
import {trackPageView} from 'app/acts/tracking_acts'

routes.start((routeData, routeEvenType) => {
  // Ignore initial update event, since it's already handled by Segment
  if (routeEvenType !== 'synthetic') {
    trackPageView()
  }

  ReactDOM.render(<Ui routeData={routeData} />, document.getElementById('canvas'))
})
