require.context('!!static-file!./static', true, /.+/)

import React from 'react'
import Home from 'app/ui/home'
import Docs from 'app/ui/docs'
import Perf from 'app/ui/perf'
import VersionPicker from './_lib/version_picker'
import {fetchVersions, fetchDocs} from 'app/acts/versions'
import {StatePropType} from 'app/types/state'
import {Version} from 'app/types/version'

export default class Ui extends React.Component {
  static propTypes = {
    state: StatePropType.isRequired
  }

  componentWillMount () {
    fetchVersions()
  }

  componentWillReceiveProps ({state}) {
    const {state: oldState} = this.props

    const oldSelectedVersionTag = this._selectedVersionTag(oldState)
    const selectedVersionTag = this._selectedVersionTag(state)

    const versionIndicesLoaded = oldState.versions.size !== state.versions.size
    const selectedVersionChanged = selectedVersionTag && oldSelectedVersionTag !== selectedVersionTag

    if (versionIndicesLoaded || selectedVersionChanged) {
      const docsKey = state.getIn(['versions', selectedVersionTag, 'docsKey'])
      fetchDocs(selectedVersionTag, docsKey)
    }
  }

  render () {
    const {state} = this.props

    return <div className='ui'>
      <VersionPicker
        versions={state.versions}
        selectedVersion={this._selectedVersion(state)}
        routeData={state.routeData}
      />

      {this._renderContent()}
    </div>
  }

  _renderContent () {
    const {state} = this.props
    const selectedVersion = this._selectedVersion(state)

    switch (state.getIn(['routeData', 'route', 'name'])) {
      case undefined:
        return 'Loading'
      case 'home':
      case 'versionHome':
        return <Home
          selectedVersion={selectedVersion}
          locales={selectedVersion.locales}
          contributors={state.contributors}
        />
      case 'docs':
      case 'doc':
      case 'versionDocs':
      case 'versionDoc':
        return <Docs
          docId={this._routeDocId()}
          docs={state.docs}
          selectedVersionTag={this._selectedVersionTag(state)}
        />
      case 'perf':
        return <Perf />
    }
  }

  _selectedVersionTag (state) {
    const versionTag = state.getIn(['routeData', 'params', 'versionTag'])
    return versionTag ? decodeURI(versionTag) : state.latestVersionTag
  }

  _selectedVersion (state) {
    const selectedVersionTag = this._selectedVersionTag(state)
    return state.versions.get(selectedVersionTag, Version())
  }

  _routeDocId () {
    const {state} = this.props
    const docId = state.getIn(['routeData', 'params', 'docId'])
    return docId ? decodeURI(docId) : undefined
  }
}
