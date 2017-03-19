import React from 'react'
import {act} from 'enso'

export default function VersionPicker ({versionIndices, selectedVersionTag}) {
  const loading = !versionIndices
  return <select
    disabled={loading}
    selected={selectedVersionTag}
    className='version_picker'
    onChange={changeSelectedVersionTag}
  >
    {
      loading
        ? <option>Loading</option>
        : versionIndices
          .filter((versionIndex) => {
            const hasDocs = versionIndex.get('features').get('docs')
            const isPrerelease = versionIndex.get('prerelease')
            return hasDocs && !isPrerelease
          })
          .keySeq()
          .map(versionOption)
    }
  </select>
}

function changeSelectedVersionTag ({target: {value: tag}}) {
  act(state => state.set('selectedVersionTag', selectedVersionTag))
}

function versionOption (tag) {
  return <option value={tag} key={tag}>{tag}</option>
}
