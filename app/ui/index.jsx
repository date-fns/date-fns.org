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
        submodule={state.submodule}
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
      case 'docsFP':
      case 'doc':
      case 'docFP':
      case 'versionDocs':
      case 'versionDocsFP':
      case 'versionDoc':
      case 'versionDocFP':
        return <Docs
          docId={this._routeDocId()}
          docs={state.docs}
          features={selectedVersion.features}
          selectedVersionTag={this._selectedVersionTag(state)}
          latestVersionTag={state.latestVersionTag}
          submodule={state.submodule}
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

    if (!docId) {
      return undefined
    }

    const routeName = state.getIn(['routeData', 'route', 'name'])

    if (routeName === 'docFP' || routeName === 'versionDocFP') {
      return `fp/${decodeURI(docId)}`
    } else if (routeName === 'docsFP' || routeName === 'versionDocsFP') {
      return 'FP-Guide'
    } else {
      return decodeURI(docId)
    }
  }
}
