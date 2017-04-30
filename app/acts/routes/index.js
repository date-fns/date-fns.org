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
  const name = routeNameToVersionCounterpart(routeData.getIn(['route', 'name']))
  const params = routeData.get('params').toJS()
  params.versionTag = tag
  router.navigateToRoute(name, params)
}

export function calculateLinkRouteName (name, params) {
  if (params && params.versionTag) {
    params.versionTag = params.versionTag.getOrElse(null)
    if (params.versionTag) {
      name = routeNameToVersionCounterpart(name)
    }
  }

  return name
}

function routeNameToVersionCounterpart (name) {
  if (name === 'home') {
    return 'versionHome'
  } else if (name === 'doc') {
    return 'versionDoc'
  } else if (name === 'docFP') {
    return 'versionDocFP'
  } else if (name === 'docs') {
    return 'versionDocs'
  } else if (name === 'docsFP') {
    return 'versionDocsFP'
  }

  return name
}

function routeNameToNonFPCounterpart (name) {
  if (name === 'docsFP') {
    return 'docs'
  } else if (name === 'docFP') {
    return 'doc'
  } else if (name === 'versionDocsFP') {
    return 'versionDocs'
  } else if (name === 'docFP') {
    return 'doc'
  }
}
