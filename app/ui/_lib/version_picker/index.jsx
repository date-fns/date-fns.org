import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import router from 'app/routes'
import {VersionPropType} from 'app/types/version'
import {EitherPropType} from 'app/types/either'
import {changeSubmodule} from 'app/acts/submodule'

export default function VersionPicker ({versions, selectedVersionTag, routeData, submodule}) {
  return <div>
    <select
      disabled={versions.isLeft}
      value={selectedVersionTag.getOrElse('')}
      className='version_picker'
      onChange={onVersionChange.bind(null, routeData)}
    >
      {
        versions.fold(
          ({message}) => message,
          versions => versions
            .filter((version) => {
              const hasDocs = version.features.docs
              const isPrerelease = version.prerelease
              return hasDocs && !isPrerelease
            })
            .keySeq()
            .map(versionOption)
        )
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
  versions: EitherPropType(
    React.PropTypes.object,
    ImmutablePropTypes.orderedMapOf(VersionPropType).isRequired
  ).isRequired,
  selectedVersionTag: React.PropTypes.any,
  routeData: ImmutablePropTypes.map,
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
