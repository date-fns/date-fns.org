/*global require,module*/

const isFunction = require('lodash/lang/isFunction')
const forIn = require('lodash/object/forIn')
const merge = require('lodash/object/merge')
const memoize = require('lodash/function/memoize')

const Matcher = require('./matcher')
const History = require('./history')

/**
 * @class Router
 *
 */
class Router {
  /**
   * @constructor
   * Router constructor.
   * @param {routes} routes
   */
  constructor(routes) {
    this.routes = Matcher.flatten(routes)
  }

  /**
   * Handles onChange history event.
   * @param {string} path
   * @param {string} eventType, event caused route change (push, pop, replace
   * or synthetic)
   */
  onChange(path, eventType) {
    const routeData = Matcher.matchPath(this.routes, path)
    if (isFunction(this.cb)) {
      this.cb(routeData, eventType)
    }
  }

  /**
   * Starts history and watch for changes.
   * @param {Function} cb callback
   */
  start(cb) {
    this.cb = cb
    History.start(this.onChange.bind(this))
  }

  /**
   * Stops history.
   */
  stop() {
    History.stop()
  }

  /**
   * Navigates to given path.
   * @param {string} path
   */
  navigateToPath(path) {
    History.push(path)
  }

  /**
   * Navigates to route.
   * @param {string} route name
   * @param {string} search params
   */
  navigateToRoute(route, params, search) {
    this.navigateToPath(this.hrefTo(route, params, search))
  }

  /**
   * Replaces history with given path.
   * @param {string} path
   */
  replaceWithPath(path) {
    History.replace(path)
  }

  /**
   * Replaces history with given route.
   * @param {string} route name
   * @param {string} search params
   */
  replaceWithRoute(route, params, search) {
    this.replaceWithPath(this.hrefTo(route, params, search))
  }

  replaceSearchQuery(search) {
    const routeData = Matcher.matchPath(this.routes, this.currentPath())
    search = merge(this.currentSearch(), search)
    this.replaceWithPath(
      this.hrefTo(routeData.route.name, routeData.params, search)
    )
  }

  /**
   * Generates href for given route name and search params.
   * @param {string} name of route
   * @param {Object*} search params
   * @returns {string} path
   */
  hrefTo(name, params, search) {
    let route

    if (!name) {
      const currentRoute = this.currentRoute()
      route = currentRoute.route
      params = currentRoute.params
    } else {
      route = this.routes[name]
    }

    if (!route) {
      throw new Error('"' + name + '" route is not defined')
    }

    let path = route.path

    if (params) {
      path = path.replace(/:([^/]+)/gi, function(param, paramName) {
        if (!params[paramName]) {
          throw new Error('Missing params in "' + path + '"')
        }
        return params[paramName]
      })
    }

    if (search) {
      const searchArr = []
      forIn(search, function(value, key) {
        value &&
          searchArr.push(
            encodeURIComponent(key) + '=' + encodeURIComponent(value)
          )
      })
      if (searchArr.length) {
        path += '?' + searchArr.join('&')
      }
    }

    return path
  }

  /**
   * Returns true if passed route options match current path
   * @param {Object} options
   * @returns {Boolen}
   */
  isCurrentPath(options) {
    let path
    if (options.path) {
      path = options.path
    } else if (options.route) {
      path = this.hrefTo(options.route, options.params, options.search)
    }

    return path === this.currentPath()
  }

  isPathMatchesRouteOrParents(path) {
    const currentRoute = this.currentRoute()
    const matchingRoute = Matcher.matchPath(this.routes, path)

    if (currentRoute && currentRoute.route) {
      const paramsMatch = Object.keys(matchingRoute.params).every(function(
        key
      ) {
        return currentRoute.params[key] === matchingRoute.params[key]
      })

      if (!matchingRoute.route) return

      if (currentRoute.route.name === matchingRoute.route.name && paramsMatch) {
        return true
      }

      let parentRouteName = currentRoute.route.parentRouteName
      while (parentRouteName) {
        if (parentRouteName === matchingRoute.route.name && paramsMatch) {
          return true
        }
        parentRouteName = this.routes[parentRouteName].parentRouteName
      }
    }

    return false
  }

  currentRoute() {
    const routeData = Matcher.matchPath(this.routes, this.currentPath())
    if (routeData) {
      return routeData
    } else {
      return null
    }
  }

  /**
   * Returns current path.
   * @returns {boolean}
   */
  currentPath() {
    return History.currentPath()
  }

  currentSearch() {
    const routeData = Matcher.matchPath(this.routes, this.currentPath())
    return Matcher.parseSearch(routeData.search)
  }
}

// Small cache for isPathMatchesRouteOrParents
Router.prototype.isPathMatchesRouteOrParents = memoize(
  Router.prototype.isPathMatchesRouteOrParents,
  function(path) {
    return [this.currentPath(), path].join('|')
  }
)

module.exports = Router
