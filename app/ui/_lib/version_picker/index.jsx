import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {VersionPropType} from 'app/types/version'
import {EitherPropType} from 'app/types/either'
import {changeSubmodule, changeVersion} from 'app/acts/routes'

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
            .filter((version) => version.features.docs)
            .keySeq()
            .map(versionOption)
        )
      }
    </select>

    <select
      value={submodule}
      className='submodule_picker'
      onChange={onSubmoduleChange.bind(null, routeData)}
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
  changeVersion(routeData, tag)
}

function onSubmoduleChange(routeData, {target: {value}}) {
  changeSubmodule(routeData, value)
}

function versionOption (tag) {
  return <option value={tag} key={tag}>{tag}</option>
}
