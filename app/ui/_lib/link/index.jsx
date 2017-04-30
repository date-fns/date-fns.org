import {createElement} from 'react'
import router from 'app/routes'
import {calculateLinkRouteName} from 'app/acts/routes'

export default function Link ({name, params, component, className, children}) {
  name = calculateLinkRouteName(name, params)

  return createElement(component || 'a', {
    href: router.hrefTo(name, params),
    className: className,
    onClick (e) {
      e.preventDefault()
      router.navigateToRoute(name, params)
    }
  }, children)
}
