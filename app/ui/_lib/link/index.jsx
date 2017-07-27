import { createElement } from 'react'
import { hrefTo, navigateToRoute } from 'app/acts/routes'

export default function Link ({ name, params, component, className, children }) {
  return createElement(
    component || 'a',
    {
      href: hrefTo(name, params),
      className: className,
      onClick (e) {
        e.preventDefault()
        navigateToRoute(name, params)
      }
    },
    children
  )
}
