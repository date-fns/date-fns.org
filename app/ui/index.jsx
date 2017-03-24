require.context('!!static-file!./static', true, /.+/)

import React from 'react'
import I from 'immutable'
import Home from 'app/ui/home'
import Docs from 'app/ui/docs'
import Perf from 'app/ui/perf'
import VersionPicker from './_lib/version_picker'
import {fetchVersions, fetchDocs} from 'app/acts/versions'
import {StatePropType} from 'app/types/state'

export default class Ui extends React.Component {
  static propTypes = {
    state: StatePropType.isRequired
  }

  componentWillMount () {
    fetchVersions()
  }

  componentWillReceiveProps ({state}) {
    const {state: oldState} = this.props
    const selectedVersionTag = state.get('selectedVersionTag')

    if (selectedVersionTag && oldState.get('selectedVersionTag') !== selectedVersionTag) {
      fetchDocs(state.get('versions'), selectedVersionTag)
    }
  }

  render () {
    const {state} = this.props

    return <div className='ui'>
      <VersionPicker
        versions={state.versions}
        selectedVersion={state.selectedVersion}
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
        return <Home selectedVersion={state.selectedVersion} />
      case 'docs':
      case 'doc':
        return <Docs docId={this._routeDocId()} docs={state.get('docs', I.Map())} />
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
