import { cache, db } from 'app/config'

export function firebaseURL(path) {
  return `${db}/${path}.json`
}

export function cacheURL(path, age) {
  const query = { url: firebaseURL(path) }
  if (age) query.age = age
  return `${cache}?${stringifyQuery(query)}`
}

function stringifyQuery(query) {
  return Object.keys(query)
    .map(key => `${key}=${encodeURIComponent(query[key])}`)
    .join('&')
}
