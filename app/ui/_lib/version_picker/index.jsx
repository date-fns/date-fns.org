import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import router from 'app/routes'
import {VersionPropType} from 'app/types/version'

export default function VersionPicker ({versions, selectedVersion, routeData}) {
  const loading = versions.size === 0

  return <select
    disabled={loading}
    value={selectedVersion.tag || ''}
    className='version_picker'
    onChange={onVersionChange.bind(null, routeData)}
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
  selectedVersion: VersionPropType
}

function onVersionChange (routeData, {target: {value: tag}}) {
  let name = routeData.getIn(['route', 'name'])

  if (name === 'home') {
    name = 'versionHome'
  } else if (name === 'doc') {
    name = 'versionDoc'
  } else if (name === 'docs') {
    name = 'versionDocs'
  }

  const params = routeData.get('params').toJS()
  params.versionTag = tag

  router.navigateToRoute(name, params)
}

function versionOption (tag) {
  return <option value={tag} key={tag}>{tag}</option>
}
