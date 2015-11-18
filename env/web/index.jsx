import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import routes from 'app/routes'
import Ui from 'app/ui'

routes.start((routeData, eventType) => {
  ReactDOM.render(<Ui routeData={routeData}/>, document.getElementById('canvas'))
})
