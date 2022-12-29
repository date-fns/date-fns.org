import { db, JSDocFunction, JSDocPage, MarkdownPage } from '@date-fns/docs/db'
import * as admin from 'firebase-admin'
import { last } from 'lodash'
import { StringifiedJSON } from 'typeroo/json'
import { schema, Typesaurus } from 'typesaurus'

admin.initializeApp()

type Page =
  | MarkdownPage
  | (Omit<JSDocPage, 'doc'> & {
      doc: { json: string }
    })

const oldDb = schema(($) => ({
  pages: $.collection<Page>(),
}))

type OldSchema = Typesaurus.Schema<typeof oldDb>

const maxPageSize = 100

processAll((pages) =>
  Promise.all(
    pages.map((page) => {
      if (page.data.type === 'markdown') return
      return db.pages.update(page.ref.id, {
        doc: page.data.doc.json as StringifiedJSON<JSDocFunction>,
      })
    })
  )
)
  .then(() => console.log('Done'))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

type ChunkCallback = (chunk: OldSchema['pages']['Doc'][]) => unknown

async function processAll(
  cb: ChunkCallback,
  cursor?: OldSchema['pages']['Doc']
) {
  const { pageSize, nextCursor } = await processChunk(cb, cursor)
  if (nextCursor && pageSize === maxPageSize) await processAll(cb, nextCursor)
}

async function processChunk(
  cb: ChunkCallback,
  cursor?: OldSchema['pages']['Doc']
) {
  const chunk = await oldDb.pages.query(($) => [
    $.field($.docId()).order('asc', cursor && $.startAfter(cursor)),
    $.limit(maxPageSize),
  ])
  await cb(chunk)
  return { pageSize: chunk.length, nextCursor: last(chunk) }
}
