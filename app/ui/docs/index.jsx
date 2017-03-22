import React from 'react'
import I from 'immutable'
import DocsFinder from './docs_finder'
import Doc from './doc'
import docs from 'app/_lib/docs'

/**
 * @param {Object} props
 * @param {String} [props.docId] - the id of the doc to show
 */
export default function Docs ({docId, docs}) {
  return <div className='docs'>
    <div className='docs-finder'>
      <DocsFinder currentId={docId} docs={docs} />
    </div>

    <div className='docs-content'>
      <Doc docId={docId} pages={docs.get('pages', I.List())}/>
    </div>
  </div>
}
