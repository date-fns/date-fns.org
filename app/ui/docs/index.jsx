import React from 'react'
import DocsFinder from './docs_finder'
import Doc from './doc'
import {DocsPropType} from 'app/types/docs'

export default function Docs ({docId, docs, selectedVersionTag, latestVersionTag, submodule}) {
  return <div className='docs'>
    <div className='docs-finder'>
      <DocsFinder
        docId={docId}
        docs={docs}
        selectedVersionTag={selectedVersionTag}
        submodule={submodule}
      />
    </div>

    <div className='docs-content'>
      <Doc
        docId={docId}
        docs={docs}
        selectedVersionTag={selectedVersionTag}
        latestVersionTag={latestVersionTag}
      />
    </div>
  </div>
}

Docs.propTypes = {
  docId: React.PropTypes.string.isRequired,
  docs: DocsPropType.isRequired,
  selectedVersionTag: React.PropTypes.any,
  latestVersionTag: React.PropTypes.any,
  submodule: React.PropTypes.string.isRequired
}
