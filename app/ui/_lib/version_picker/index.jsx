import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import router from 'app/routes'
import {VersionPropType} from 'app/types/version'
import {changeSubmodule} from 'app/acts/submodule'

export default function VersionPicker ({versions, selectedVersionTag, routeData, submodule}) {
  const loading = versions.size === 0

  return <div>
    <select
      disabled={loading}
      value={selectedVersionTag || ''}
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

    <select
      value={submodule}
      className='submodule_picker'
      onChange={onSubmoduleChange}
    >
      <option value={''}>non-FP</option>
      <option value={'fp'}>FP</option>
    </select>
  </div>
}

VersionPicker.propTypes = {
  versions: ImmutablePropTypes.orderedMapOf(VersionPropType).isRequired,
  selectedVersionTag: React.PropTypes.any,
  submodule: React.PropTypes.string.isRequired
}

function onVersionChange (routeData, {target: {value: tag}}) {
  let name = routeData.getIn(['route', 'name'])

  if (name === 'home') {
    name = 'versionHome'
  } else if (name === 'doc') {
    name = 'versionDoc'
  } else if (name === 'docFP') {
    name = 'versionDocFP'
  } else if (name === 'docs') {
    name = 'versionDocs'
  } else if (name === 'docsFP') {
    name = 'versionDocsFP'
  }

  const params = routeData.get('params').toJS()
  params.versionTag = tag

  router.navigateToRoute(name, params)
}

function onSubmoduleChange({target: {value}}) {
  changeSubmodule(value)
}

function versionOption (tag) {
  return <option value={tag} key={tag}>{tag}</option>
}
