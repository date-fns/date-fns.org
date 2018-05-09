/*global require,module*/

const flatten = require('lodash/array/flatten')
const clone = require('lodash/lang/clone')
const merge = require('lodash/object/merge')
const isEmpty = require('lodash/lang/isEmpty')
const isUndefined = require('lodash/lang/isUndefined')

/**
 * RouterMatcher is a set of functions that helps to match routes.
 */
const RouterMatcher = {
  /**
   * Normalizes pathname.
   * @param {string} pathname
   *
   * @example
   *   RouterMatcher.normalize('/app/')
   *   //=> '/app'
   *   RouterMatcher.normalize('/app')
   *   //=> '/app'
   *   RouterMatcher.normalize('/')
   *   //=> '/'
   */
  normalize(pathname) {
    if (pathname === '/') {
      return pathname
    } else {
      return pathname.replace(/\/$/, '')
    }
  },

  /**
   * Joins pathnames.
   * @param {string[]} pathnames
   *
   * @example
   *   RouterMatcher.join(['/', 'app/', '/notifications/'])
   *   //=> '/app/notifications'
   */
  join(pathnames) {
    const pathname = pathnames.join('/').replace(/\/{2,}/g, '/')
    return RouterMatcher.normalize(pathname)
  },

  /**
   * Makes routes object flat.
   * @param {Object} routes
   */
  flatten(routes, basePath, baseProps, parentRouteName = null) {
    basePath = basePath || ''
    baseProps = baseProps || {}
    const flattenRoutes = flatten(routes, true)
    const resultRoutes = flattenRoutes.reduce(function(flatRoutes, routeObj) {
      let flatRoutesFragment
      const path = RouterMatcher.normalize(
        RouterMatcher.join([basePath, routeObj.path])
      )
      const props = merge(clone(baseProps), routeObj.props || {})

      if (routeObj.routes && !isEmpty(routeObj.routes)) {
        flatRoutesFragment = RouterMatcher.flatten(
          routeObj.routes,
          path,
          props,
          routeObj.name
        )
      } else {
        flatRoutesFragment = {}
      }

      if (routeObj.name) {
        flatRoutesFragment[routeObj.name] = { path, props }
        if (parentRouteName) {
          flatRoutesFragment[routeObj.name].parentRouteName = parentRouteName
        }
      }

      return merge(clone(flatRoutes), flatRoutesFragment)
    }, {})

    // Matching aliases
    flattenRoutes.forEach(function(routeObj) {
      if (routeObj.alias) {
        resultRoutes[routeObj.alias].aliasPath = routeObj.path
      }
    })

    return resultRoutes
  },

  /**
   * Returns test object that contains regexp that matches passed path and
   * list of params.
   * @param {string} path
   */
  pathTestObject(path) {
    let paramsNames = []
    const paramsCaptures = path.match(/:([^/|$]+)/g)
    if (paramsCaptures) {
      paramsNames = paramsCaptures.map(function(paramName) {
        return paramName.replace(/^:/, '')
      })
    }

    const regExp = new RegExp('^' + path.replace(/:[^/]+/g, '([^/]+)') + '$')

    return { regExp, paramsNames }
  },

  /**
   * @param {Object} route
   * @param {string} pathname
   */
  testPathnameForMatch(route, pathname) {
    let testObj = RouterMatcher.pathTestObject(route.path)
    let paramsCaptures = pathname.match(testObj.regExp)

    if (!paramsCaptures && route.aliasPath) {
      testObj = RouterMatcher.pathTestObject(route.aliasPath)
      paramsCaptures = pathname.match(testObj.regExp)
    }

    if (!paramsCaptures) return

    const params = {}
    paramsCaptures.slice(1).forEach(function(paramValue, index) {
      const paramName = testObj.paramsNames[index]
      params[paramName] = paramValue
    })
    return { pathname, params }
  },

  /**
   * @param {Object} routes - flat ones
   * @param {string} pathname
   */
  matchPathname(routes, pathname) {
    const normalizedPathname = RouterMatcher.normalize(pathname)
    const routesNames = Object.keys(routes)
    const notFoundRoute = routes['not-found']

    for (const index in routesNames) {
      const routeName = routesNames[index]
      const route = routes[routeName]
      const matchedRoute = RouterMatcher.testPathnameForMatch(
        route,
        normalizedPathname
      )

      if (matchedRoute) {
        return merge(matchedRoute, {
          route: merge(clone(route), { name: routeName })
        })
      }
    }

    return { pathname, params: {}, route: notFoundRoute }
  },

  /**
   * @param {Object} routes - flat ones
   * @param {string} path
   * @returns {Object} route data
   */
  matchPath(routes, path) {
    if (!path) return null
    const pathObj = RouterMatcher.parsePath(path)
    const routeData = RouterMatcher.matchPathname(routes, pathObj.pathname)
    merge(routeData, pathObj, { searchParams: pathObj.params })
    return routeData
  },

  /**
   * Parses search string (e.g 'wut=lol&lol=wut').
   * @param {string} search string
   * @returns {Object}
   */
  parseSearch(search) {
    const searchObj = {}
    const searchPairs = search.replace(/^\?/, '').split('&')

    searchPairs.forEach(function(searchPop) {
      const hasEqualSign = /=/.test(searchPop)
      const searchPopArr = searchPop.split('=')
      const key = decodeURIComponent(searchPopArr[0])
      let value
      if (searchPopArr[1]) value = decodeURIComponent(searchPopArr[1])

      if (isEmpty(key)) return

      let preparedValue
      if (isUndefined(value)) {
        preparedValue = hasEqualSign ? '' : true
      } else if (value === 'true' || value === 'false') {
        preparedValue = value === 'true'
      } else if (parseInt(value).toString() === value) {
        preparedValue = parseInt(value)
      } else if (parseFloat(value).toString() === value) {
        preparedValue = parseFloat(value)
      } else {
        preparedValue = value
      }

      searchObj[key] = preparedValue
    })

    return searchObj
  },

  /**
   * Parses path and search object.
   * @param {string} path
   * @returns {Object}
   */
  parsePath(path = '') {
    const pathArr = path.split('?')
    const pathname = RouterMatcher.normalize(pathArr[0])
    const search = pathArr[1] ? '?' + pathArr[1] : ''
    const params = RouterMatcher.parseSearch(search)

    return { path, pathname, search, params }
  }
}

module.exports = RouterMatcher
