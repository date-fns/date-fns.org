import React from 'react'
import Home from 'app/ui/home'
import Docs from 'app/ui/docs'
import Perf from 'app/ui/perf'
import { getSelectedVersionTag } from 'app/acts/versions'
import { getShownPage } from 'app/acts/routes'
import { Either } from 'app/types/either'

require.context('!!static-file!./static', true, /.+/)

export default function UI({ state }) {
  const selectedVersionTag = getSelectedVersionTag(state)

  return <div className="ui">{renderContent(state, selectedVersionTag)}</div>
}

function renderContent(state, selectedVersionTag) {
  const selectedVersion = getSelectedVersionTag(state).chain(tag =>
    state.versions.chain(versions => Either.fromNullable(versions.get(tag)))
  )
  const page = getShownPage(state.routeData)

  const locales = Either.of(versions => tag => versions.getIn([tag, 'locales']))
    .ap(state.get('versions'))
    .ap(state.get('latestVersionTag'))
    .getOrElse()

  switch (page) {
    case 'home':
      return <Home locales={locales} contributors={state.contributors} />
    case 'docs':
      return <Docs state={state} selectedVersion={selectedVersion} />
    case 'perf':
      return <Perf />
    default:
      return 'Loading'
  }
}
