import React from 'react'
import DocsFinder from './docs_finder'
import Doc from './doc'
import {DocsPropType} from 'app/types/docs'

export default function Docs ({docId, docs}) {
  return <div className='docs'>
    <div className='docs-finder'>
      <DocsFinder currentId={docId} docs={docs} />
    </div>

    <div className='docs-content'>
      <Doc docId={docId} pages={docs.pages} />
    </div>
  </div>
}

Docs.propTypes = {
  docId: React.PropTypes.string.isRequired,
  docs: DocsPropType.isRequired
}
