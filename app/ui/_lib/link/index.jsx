import React from 'react'
import {hrefTo, navigateToRoute} from 'app/acts/routes'

export default class Link extends React.Component {
  shouldComponentUpdate ({name: nextName, params: nextParams}) {
    const {name, params} = this.props

    if (name === 'doc' && nextName === 'doc') {
      return params.docId !== nextParams.docId
    }

    return true
  }

  render () {
    const {name, params, component, className, children} = this.props

    return React.createElement(component || 'a', {
      href: hrefTo(name, params),
      className: className,
      onClick (e) {
        e.preventDefault()
        navigateToRoute(name, params)
      }
    }, children)
  }
}
