import I from 'immutable'
import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { VersionPropType } from 'app/types/version'
import { DocsPropType } from 'app/types/docs'
import { Either, EitherPropType } from 'app/types/either'

export const State = I.Record({
  versions: Either.Left({ message: 'Loading versions...' }),
  latestStableVersionTag: Either.Left({ message: 'Loading versions...' }),
  latestVersionTag: Either.Left({ message: 'Loading versions...' }),
  routeData: null,
  docs: Either.Left({ message: 'Loading versions...' }),
  contributors: Either.Left({ message: 'Loading contributors...' }),
  submodule: ''
})

export const StatePropType = ImmutablePropTypes.recordOf({
  versions: EitherPropType(
    React.PropTypes.object,
    ImmutablePropTypes.orderedMapOf(VersionPropType).isRequired
  ).isRequired,
  latestStableVersionTag: EitherPropType(React.PropTypes.object, React.PropTypes.any)
    .isRequired,
  latestVersionTag: EitherPropType(React.PropTypes.object, React.PropTypes.any)
    .isRequired,
  routeData: ImmutablePropTypes.map,
  docs: EitherPropType(React.PropTypes.object, DocsPropType.isRequired)
    .isRequired,
  contributors: EitherPropType(
    React.PropTypes.object,
    ImmutablePropTypes.list.isRequired
  ),
  submodule: React.PropTypes.string.isRequired
})

export default State
