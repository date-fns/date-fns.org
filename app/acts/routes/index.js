export function getRouteDocId (routeData) {
  if (!routeData) {
    return null
  }

  const docId = routeData.getIn(['params', 'docId'])

  if (!docId) {
    return null
  }

  const routeName = routeData.getIn(['route', 'name'])

  if (routeName === 'docFP' || routeName === 'versionDocFP') {
    return `fp/${decodeURI(docId)}`
  } else if (routeName === 'docsFP' || routeName === 'versionDocsFP') {
    return 'FP-Guide'
  } else {
    return decodeURI(docId)
  }
}

export function getShownPage (routeData) {
  if (!routeData) {
    return null
  }

  const routeName = routeData.getIn(['route', 'name'])

  switch (routeName) {
    case 'home':
    case 'versionHome':
      return 'home'
    case 'docs':
    case 'docsFP':
    case 'doc':
    case 'docFP':
    case 'versionDocs':
    case 'versionDocsFP':
    case 'versionDoc':
    case 'versionDocFP':
      return 'docs'
  }

  return routeName
}
