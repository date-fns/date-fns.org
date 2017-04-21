import I from 'immutable'
import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {Version, VersionPropType} from 'app/types/version'
import {Docs, DocsPropType} from 'app/types/docs'

export const State = I.Record({
  versions: I.OrderedMap(),
  latestVersionTag: null,
  routeData: null,
  docs: Docs(),
  contributors: I.List(),
  submodule: ''
})

export const StatePropType = ImmutablePropTypes.recordOf({
  versions: ImmutablePropTypes.orderedMapOf(VersionPropType).isRequired,
  latestVersionTag: React.PropTypes.any,
  routeData: ImmutablePropTypes.map,
  docs: DocsPropType.isRequired,
  contributors: React.PropTypes.oneOfType([
    ImmutablePropTypes.list,
    React.PropTypes.instanceOf(Error)
  ]),
  submodule: React.PropTypes.string.isRequired
})

export default State
