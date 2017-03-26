import I from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {Version, VersionPropType} from 'app/types/version'
import {Docs, DocsPropType} from 'app/types/docs'

export const State = I.Record({
  versions: I.OrderedMap(),
  selectedVersion: Version(),
  routeData: null,
  docs: Docs()
})

export const StatePropType = ImmutablePropTypes.recordOf({
  versions: ImmutablePropTypes.orderedMapOf(VersionPropType).isRequired,
  selectedVersion: VersionPropType.isRequired,
  routeData: ImmutablePropTypes.map,
  docs: DocsPropType.isRequired
})

export default State
