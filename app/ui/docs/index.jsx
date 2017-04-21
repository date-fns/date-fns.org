import React from 'react'
import DocsFinder from './docs_finder'
import Doc from './doc'
import {DocsPropType} from 'app/types/docs'
import {FeaturesPropType} from 'app/types/features'

export default function Docs ({docId, docs, features, selectedVersionTag, latestVersionTag, submodule}) {
  return <div className='docs'>
    <div className='docs-finder'>
      <DocsFinder
        currentId={docId}
        docs={docs}
        selectedVersionTag={selectedVersionTag}
        submodule={submodule}
      />
    </div>

    <div className='docs-content'>
      <Doc
        docId={docId}
        pages={docs.pages}
        features={features}
        selectedVersionTag={selectedVersionTag}
        latestVersionTag={latestVersionTag}
      />
    </div>
  </div>
}

Docs.propTypes = {
  docId: React.PropTypes.string.isRequired,
  docs: DocsPropType.isRequired,
  features: FeaturesPropType,
  selectedVersionTag: React.PropTypes.any,
  latestVersionTag: React.PropTypes.any,
  submodule: React.PropTypes.string.isRequired
}
