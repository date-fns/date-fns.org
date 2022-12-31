import { db } from '@date-fns/docs'
import * as admin from 'firebase-admin'

admin.initializeApp()

db.packages
  .all()
  .then((packages) =>
    Promise.all(
      packages.map((p) => db.packages.set(db.packages.id(p.data.name), p.data))
    )
  )
