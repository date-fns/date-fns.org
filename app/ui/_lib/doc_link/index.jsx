import {createElement} from 'react'
import router from 'app/routes'

export default function DocLink ({docId, versionTag, component, className, children}) {
  const name = versionTag ? 'doc' : 'noVersionDoc'
  const params = {docId, versionTag}

  return createElement(component || 'a', {
    href: router.hrefTo(name, params),
    className: className,
    onClick (e) {
      e.preventDefault()
      router.navigateToRoute(name, params)
    }
  }, children)
}
