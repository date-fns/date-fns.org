import {createElement} from 'react'
import router from 'app/routes'

export default function Link ({name, params, component, className, children}) {
  if (params && params.versionTag) {
    params.versionTag = params.versionTag.getOrElse(null)
    if (params.versionTag) {
      if (name === 'home') {
        name = 'versionHome'
      } else if (name === 'doc') {
        name = 'versionDoc'
      } else if (name === 'docFP') {
        name = 'versionDocFP'
      } else if (name === 'docs') {
        name = 'versionDocs'
      } else if (name === 'docsFP') {
        name = 'versionDocsFP'
      }
    }
  }

  return createElement(component || 'a', {
    href: router.hrefTo(name, params),
    className: className,
    onClick (e) {
      e.preventDefault()
      router.navigateToRoute(name, params)
    }
  }, children)
}
