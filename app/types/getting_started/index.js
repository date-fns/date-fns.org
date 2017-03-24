import ImmutablePropTypes from 'react-immutable-proptypes'
import React from 'react'

export const GettingStartedPropType = ImmutablePropTypes.mapOf(
  ImmutablePropTypes.mapOf(React.PropTypes.string.isRequired)
)
