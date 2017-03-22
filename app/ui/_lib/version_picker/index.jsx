import React from 'react'
import {changeSelectedVersion} from 'app/acts/versions'

export default function VersionPicker ({versions, selectedVersionTag}) {
  const loading = !versions
  return <select
    disabled={loading}
    selected={selectedVersionTag}
    className='version_picker'
    onChange={onVersionChange}
  >
    {
      loading
        ? <option>Loading</option>
        : versions
          .filter((version) => {
            const hasDocs = version.getIn(['features', 'docs'])
            const isPrerelease = version.get('prerelease')
            return hasDocs && !isPrerelease
          })
          .keySeq()
          .map(versionOption)
    }
  </select>
}

function onVersionChange ({target: {value: tag}}) {
  changeSelectedVersion(tag)
}

function versionOption (tag) {
  return <option value={tag} key={tag}>{tag}</option>
}
