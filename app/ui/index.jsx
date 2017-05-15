require.context('!!static-file!./static', true, /.+/)

import React from 'react'
import Home from 'app/ui/home'
import Docs from 'app/ui/docs'
import Perf from 'app/ui/perf'
import {getSelectedVersionTag} from 'app/acts/versions'
import {getShownPage} from 'app/acts/routes'
import {StatePropType} from 'app/types/state'
import {Version} from 'app/types/version'
import {Either} from 'app/types/either'

Ui.propTypes = {
  state: StatePropType.isRequired
}

export default function Ui ({state}) {
  const selectedVersionTag = getSelectedVersionTag(state)

  return (
    <div className="ui">
      {renderContent(state, selectedVersionTag)}
    </div>
  )
}

function renderContent (state, selectedVersionTag) {
  const selectedVersion = getSelectedVersionTag(state).chain(tag =>
    state.versions.chain(versions => Either.fromNullable(versions.get(tag))))

  const page = getShownPage(state.routeData)

  switch (page) {
    case undefined:
      return 'Loading'
    case 'home':
      return (
        <Home version={selectedVersion} contributors={state.contributors} />
      )
    case 'docs':
      return <Docs state={state} />
    case 'perf':
      return <Perf />
  }
}
