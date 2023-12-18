import { db } from '@date-fns/docs'
import * as admin from 'firebase-admin'

admin.initializeApp()

Promise.all([
  db.packages.get(db.packages.id('uy8G6tshVArbzEofZ6P1')),
  db.packages.get(db.packages.id('date-fns')),
]).then(
  ([oldPkg, newPkg]) =>
    oldPkg &&
    newPkg &&
    newPkg.update({
      versions: oldPkg.data.versions.concat(newPkg.data.versions),
    })
)
