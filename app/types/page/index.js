import I from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import React from 'react'

export const Page = I.Record({
  title: null,
  description: null,
  category: null,
  content: null,
  type: null,
  path: null,
  urlId: null
})

export const PagePropType = ImmutablePropTypes.recordOf({
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired,
  urlId: React.PropTypes.string.isRequired
})

export default Page
