import { h } from 'preact'
import { useContext, useEffect } from 'preact/hooks'
import { RouterContext } from '~/ui/router'
import { Home } from '~/ui/screens/Home'
import { Docs } from '~/ui/screens/Docs'
import { NotFound } from '~/ui/screens/NotFound'
import 'reset.css/reset.css?global'
import './global.css?global'
import { DEFAULT_SUBMODULE } from '@date-fns/date-fns-db'

const win = typeof window !== 'undefined' ? window : undefined

export const UI = () => {
  const { location } = useContext(RouterContext)

  useEffect(() => {
    win?.ga?.('send', 'pageview')
  }, [JSON.stringify(location)])

  switch (location.name) {
    case 'home':
      return <Home />

    case 'docs':
      return (
        <Docs
          selectedSubmodule={DEFAULT_SUBMODULE}
          selectedPage={location.params.page}
        />
      )

    case 'submoduleDocs':
      return (
        <Docs
          selectedSubmodule={location.params.submodule}
          selectedPage={location.params.page}
        />
      )

    case 'versionDocs':
      return (
        <Docs
          selectedSubmodule={DEFAULT_SUBMODULE}
          selectedPage={location.params.page}
          selectedVersion={location.params.version}
        />
      )

    case 'submoduleVersionDocs':
      return (
        <Docs
          selectedSubmodule={location.params.submodule}
          selectedPage={location.params.page}
          selectedVersion={location.params.version}
        />
      )

    case '404':
    default:
      return <NotFound />
  }
}
