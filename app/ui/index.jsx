require.context('!!static-file!./static', true, /.+/)

import React from 'react'
import Home from 'app/ui/home'
import Docs from 'app/ui/docs'
import Perf from 'app/ui/perf'
import VersionPicker from './_lib/version_picker'
import {fetchVersions} from 'app/acts/versions'

export default class Ui extends React.Component {
  static propTypes = {
    state: React.PropTypes.object
  }

  componentWillMount () {
    fetchVersions()
  }

  render () {
    const {state} = this.props

    return <div className='ui'>
      <VersionPicker
        versionIndices={state.get('versionIndices')}
        latestVersionTag={state.get('latestVersionTag')}
        selectedVersionTag={state.get('selectedVersionTag')}
      />

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
        return <Docs docId={this._routeDocId()} />
      case 'perf':
        return <Perf />
    }
  }

  _routeDocId () {
    const {state} = this.props
    const docId = state.getIn(['routeData', 'params', 'docId'])
    return docId ? decodeURI(docId) : undefined
  }
}
