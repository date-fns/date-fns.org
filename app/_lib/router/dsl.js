const cloneDeep = require('lodash/lang/cloneDeep')
const flatten = require('lodash/array/flatten')
const merge = require('lodash/object/merge')
const pick = require('lodash/object/pick')
const omit = require('lodash/object/omit')

/**
 * DSL generates structure that can understand router matcher.
 */
const RouterDSL = {
  /**
   * @param {Object} options
   * @param {Object[]} routes
   */
  routes (options) {
    const routesData = RouterDSL.extractProps(options)
    const routes = flatten(Array.prototype.slice.call(arguments, 1), true)
    return routes.map(function (route) {
      return merge(cloneDeep(routesData), route)
    })
  },

  /**
   * @param {Object} options
   * @param {Object[]} nestedRoutes
   */
  route (options) {
    options = options || {}
    const nestedRoutes = Array.prototype.slice.call(arguments, 1)
    return merge({nestedRoutes}, RouterDSL.extractProps(options))
  },

  /**
   * @param {Object} options
   */
  extractProps (options) {
    const extracted = pick(options, ['name', 'path'])
    extracted.props = omit(options, ['name', 'path'])
    return extracted
  }
}

module.exports = RouterDSL

