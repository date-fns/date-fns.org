import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  databaseURL: 'https://date-fns.firebaseio.com'
})

const db = firebaseApp.database()

export function subGet (key, cb) {
  const ref = db.ref(key)
  const handler = snapshot => cb(snapshot.val())

  ref.on('value', handler)
  return () => ref.off('value', handler)
}

export function subGetIn (path, cb) {
  return subGet(path.join('/'), cb)
}
