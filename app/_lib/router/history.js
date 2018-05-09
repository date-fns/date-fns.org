/*global module*/

const location = window.location
const addEventListener = window.addEventListener.bind(window)
const removeEventListener = window.removeEventListener.bind(window)
const pushState = window.history.pushState.bind(window.history)
const replaceState = window.history.replaceState.bind(window.history)

let onChange

/**
 * Set of functions that helps to manipulate browser history.
 */
const RouterHistory = {
  /**
   * Push state with given path.
   * @param {string} path
   */
  push(path) {
    pushState(null, null, path)
    onChange(path, 'push')
  },

  /**
   * Replace state with given path.
   * @param {string} path
   */
  replace(path) {
    replaceState(null, null, path)
    onChange(path, 'replace')
  },

  /**
   * popstate listener.
   */
  onPopState(e) {
    onChange(
      RouterHistory.currentPath(),
      typeof e === 'undefined' ? 'synthetic' : 'pop'
    )
  },

  /**
   * @param {Function} cb callback
   * @returns {Function} that removes event listener.
   */
  start(cb) {
    onChange = cb
    addEventListener('popstate', RouterHistory.onPopState)
    RouterHistory.onPopState()
  },

  /**
   * Removes history listener
   */
  stop() {
    onChange = undefined
    removeEventListener('popstate', RouterHistory.onPopState)
  },

  /**
   * @returns {string} current path
   */
  currentPath() {
    return location.pathname + location.search
  }
}

module.exports = RouterHistory
