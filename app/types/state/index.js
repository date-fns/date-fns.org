import I from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {Version, VersionPropType} from 'app/types/version'
import {DocsPropType} from 'app/types/docs'

export const State = I.Record({
  versions: I.OrderedMap(),
  selectedVersion: Version(),
  routeData: null,
  docs: null
})

export const StatePropType = ImmutablePropTypes.recordOf({
  versions: ImmutablePropTypes.orderedMapOf(VersionPropType.isRequired).isRequired,
  selectedVersion: VersionPropType.isRequired,
  routeData: ImmutablePropTypes.map,
  docs: ImmutablePropTypes.listOf(DocsPropType.isRequired)
})

export default State
