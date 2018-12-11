import React from 'react'
import DocsFinder from './docs_finder'
import Doc from './doc'
import { StatePropType } from 'app/types/state'
import { getSelectedVersionTag } from 'app/acts/versions'
import { getRouteDocId } from 'app/acts/routes'
import { EitherPropType } from 'app/types/either'
import { VersionPropType } from 'app/types/version'
import DocsNavBar from './nav_bar'

export default function Docs({ state, selectedVersion }) {
  const { docs, versions, routeData, latestStableVersionTag, submodule } = state
  const docId = getRouteDocId(routeData)
  const selectedVersionTag = getSelectedVersionTag(state)

  return (
    <div className="docs">
      <DocsNavBar
        docId={docId}
        docs={docs}
        latestStableVersionTag={latestStableVersionTag}
        versions={versions}
        selectedVersionTag={selectedVersionTag}
        routeData={routeData}
        selectedSubmodule={submodule}
        selectedVersion={selectedVersion}
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
        />
      </div>
    </div>
  )
}

Docs.propTypes = {
  state: StatePropType.isRequired,
  selectedVersion: EitherPropType(
    React.PropTypes.object,
    VersionPropType.isRequired
  ).isRequired
}
