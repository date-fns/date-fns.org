export function getItem (key) {
  try {
    var value = window.localStorage.getItem(key)
  } catch (_) {
    return undefined
  }
  return value
}

export function setItem (key, value) {
  try {
    window.localStorage.setItem(key, value)
  } catch (_) {
    return false
  }
  return true
}
