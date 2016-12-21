require.context('!!static-file!./static', true, /.+/)

import React from 'react'
import Home from 'app/ui/home'
import Docs from 'app/ui/docs'

export default class Ui extends React.Component {
  static propTypes = {
    state: React.PropTypes.object
  }

  render () {
    return <div className='ui'>
      {this._renderContent()}
    </div>
  }

  _renderContent () {
    const {state} = this.props

    switch (state.getIn(['routeData', 'route', 'name'])) {
      case undefined:
        return 'Loading'
      case 'home':
        return <Home state={state} />
      case 'docs':
      case 'doc':
        return <Docs docId={this._currentDocId()} />
    }
  }

  _currentDocId () {
    const {state} = this.props
    const docId = state.getIn(['routeData', 'params'])
    return docId ? decodeURI(docId) : undefined
  }
}
