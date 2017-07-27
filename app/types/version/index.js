import I from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import React from 'react'
import { Features, FeaturesPropType } from 'app/types/features'
import { GettingStartedPropType } from 'app/types/getting_started'

export const Version = I.Record({
  tag: null,
  date: 0,
  commit: null,
  prerelease: false,
  gettingStarted: I.Map(),
  gettingStartedTabs: I.List(),
  features: Features(),
  locales: I.List(),
  docsKey: null,
  benchmarksKey: null
})

export const VersionPropType = ImmutablePropTypes.recordOf({
  tag: React.PropTypes.string,
  date: React.PropTypes.number,
  commit: React.PropTypes.string,
  prerelease: React.PropTypes.bool,
  gettingStarted: GettingStartedPropType.isRequired,
  gettingStartedTabs: ImmutablePropTypes.listOf(
    React.PropTypes.string.isRequired
  ),
  features: FeaturesPropType.isRequired,
  locales: ImmutablePropTypes.list,
  docsKey: React.PropTypes.any,
  benchmarksKey: React.PropTypes.any
})

export default Version
