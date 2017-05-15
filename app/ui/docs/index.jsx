import React from 'react'
import DocsFinder from './docs_finder'
import Doc from './doc'
import {StatePropType} from 'app/types/state'
import {getSelectedVersionTag} from 'app/acts/versions'
import {getRouteDocId} from 'app/acts/routes'
import {DocsPropType} from 'app/types/docs'
import DocsNavBar from './nav_bar'

Docs.propTypes = {
  state: StatePropType.isRequired
}

export default function Docs ({state}) {
  const {
    docs,
    versions,
    routeData,
    latestVersionTag,
    submodule
  } = state
  const docId = getRouteDocId(routeData)
  const selectedVersionTag = getSelectedVersionTag(state)

  return (
    <div className="docs">
      <DocsNavBar
        versions={versions}
        selectedVersionTag={selectedVersionTag}
        routeData={routeData}
        selectedSubmodule={submodule}
      />

      <div className="docs-finder">
        <DocsFinder
          docId={docId}
          docs={docs}
          selectedVersionTag={selectedVersionTag}
          selectedSubmodule={submodule}
        />
      </div>

      <div className="docs-content">
        <Doc
          docId={docId}
          docs={docs}
          selectedVersionTag={selectedVersionTag}
          latestVersionTag={latestVersionTag}
        />
      </div>
    </div>
  )
}
