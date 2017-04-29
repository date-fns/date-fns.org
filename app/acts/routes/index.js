import {act} from 'enso'
import router from 'app/routes'

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

export function changeSubmodule (routeData, value) {
  act(state => state.set('submodule', value))
}

export function changeVersion (routeData, tag) {
  let name = routeData.getIn(['route', 'name'])

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

  const params = routeData.get('params').toJS()
  params.versionTag = tag

  router.navigateToRoute(name, params)
}
