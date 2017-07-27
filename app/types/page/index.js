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
  urlId: null,
  isFPFn: false,
  usage: null,
  usageTabs: null,
  args: null,
  properties: null,
  syntax: null,
  relatedDocs: null
})

export const PagePropType = ImmutablePropTypes.recordOf({
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  content: React.PropTypes.oneOfType([
    React.PropTypes.string,
    ImmutablePropTypes.map
  ]),
  type: React.PropTypes.string.isRequired,
  path: React.PropTypes.string,
  urlId: React.PropTypes.string.isRequired,
  isFPFn: React.PropTypes.bool.isRequired,
  usage: ImmutablePropTypes.map,
  usageTabs: ImmutablePropTypes.list,
  args: ImmutablePropTypes.list,
  properties: ImmutablePropTypes.list,
  syntax: React.PropTypes.string,
  relatedDocs: ImmutablePropTypes.map
})

export default Page
