import {createElement} from 'react'
import router from 'app/routes'

export default function Link ({name, params, component, className, children}) {
  return createElement(component || 'a', {
    href: router.hrefTo(name, params),
    className: className,
    onClick (e) {
      e.preventDefault()
      router.navigateToRoute(name, params)
    }
  }, children)
}
