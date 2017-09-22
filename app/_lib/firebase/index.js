import { db } from 'app/config'

export function firebaseURL (path) {
  return `${db}/${path}.json`
}
