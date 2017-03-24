import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {VersionPropType} from 'app/types/version'
import {changeSelectedVersion} from 'app/acts/versions'

export default function VersionPicker ({versions, selectedVersion}) {
  const loading = versions.size === 0

  return <select
    disabled={loading}
    selected={selectedVersion.tag}
    className='version_picker'
    onChange={onVersionChange}
  >
    {
      loading
        ? <option>Loading</option>
        : versions
          .filter((version) => {
            const hasDocs = version.features.docs
            const isPrerelease = version.prerelease
            return hasDocs && !isPrerelease
          })
          .keySeq()
          .map(versionOption)
    }
  </select>
}

VersionPicker.propTypes = {
  versions: ImmutablePropTypes.orderedMapOf(VersionPropType).isRequired,
  selectedVersion: VersionPropType.isRequired
}

function onVersionChange ({target: {value: tag}}) {
  changeSelectedVersion(tag)
}

function versionOption (tag) {
  return <option value={tag} key={tag}>{tag}</option>
}
