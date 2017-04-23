require.context('!!static-file!./static', true, /.+/)

import React from 'react'
import Home from 'app/ui/home'
import Docs from 'app/ui/docs'
import Perf from 'app/ui/perf'
import VersionPicker from './_lib/version_picker'
import {getSelectedVersionTag} from 'app/acts/versions'
import {getRouteDocId, getShownPage} from 'app/acts/routes'
import {StatePropType} from 'app/types/state'
import {Version} from 'app/types/version'

export default function Ui ({state}) {
  const selectedVersionTag = getSelectedVersionTag(state)

  return <div className='ui'>
    <VersionPicker
      versions={state.versions}
      selectedVersionTag={selectedVersionTag}
      routeData={state.routeData}
      submodule={state.submodule}
    />

  {renderContent(state, selectedVersionTag)}
  </div>
}

Ui.propTypes = {
  state: StatePropType.isRequired
}

function renderContent (state, selectedVersionTag) {
  const selectedVersion = state.versions.get(selectedVersionTag, Version())
  const page = getShownPage(state.routeData)

  switch (page) {
    case undefined:
      return 'Loading'
    case 'home':
      return <Home
        selectedVersion={selectedVersion}
        locales={selectedVersion.locales}
        contributors={state.contributors}
      />
    case 'docs':
      return <Docs
        docId={getRouteDocId(state.routeData)}
        docs={state.docs}
        features={selectedVersion.features}
        selectedVersionTag={selectedVersionTag}
        latestVersionTag={state.latestVersionTag}
        submodule={state.submodule}
      />
    case 'perf':
      return <Perf />
  }
}
