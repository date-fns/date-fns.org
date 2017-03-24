import I from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import React from 'react'

export const Features = I.Record({
  docs: false,
  i18n: false,
  benchmarks: false,
  camelCase: false,
  fp: false,
  esm: false,
  utc: false
})

export const FeaturesPropType = ImmutablePropTypes.recordOf({
  docs: React.PropTypes.bool.isRequired,
  i18n: React.PropTypes.bool.isRequired,
  benchmarks: React.PropTypes.bool.isRequired,
  camelCase: React.PropTypes.bool.isRequired,
  fp: React.PropTypes.bool.isRequired,
  esm: React.PropTypes.bool.isRequired,
  utc: React.PropTypes.bool.isRequired
})

export default Features
