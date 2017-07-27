import I from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import React from 'react'
import { PagePropType } from 'app/types/page'

export const Docs = I.Record({
  tag: null,
  pages: I.List(),
  categories: I.List()
})

export const DocsPropType = ImmutablePropTypes.recordOf({
  tag: React.PropTypes.string,
  pages: ImmutablePropTypes.listOf(PagePropType),
  categories: ImmutablePropTypes.listOf(React.PropTypes.string.isRequired)
})

export default Docs
