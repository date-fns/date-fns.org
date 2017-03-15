import React from 'react'
import DocsFinder from './docs_finder'
import Doc from './doc'
import docs from 'app/_lib/docs'

/**
 * @param {Object} props
 * @param {String} [props.docId] - the id of the doc to show
 */
export default function Docs ({docId}) {
  return <div className='docs'>
    <div className='docs-finder'>
      <DocsFinder currentId={docId} />
    </div>

    <div className='docs-content'>
      <Doc docId={docId} />
    </div>
  </div>
}

function firstDoc () {
  return docs[Object.keys(docs)[0]][0].urlId
}
