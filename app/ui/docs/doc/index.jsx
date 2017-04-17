import React from 'react'
import JSDoc from './jsdoc'
import MarkdownDoc from './markdown_doc'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {PagePropType} from 'app/types/page'

export default function Doc ({docId, pages}) {
  if (!docId) return null

  return <div className='doc'>
    {renderDocContent(docId, pages)}
  </div>
}

Doc.propTypes = {
  docId: React.PropTypes.string,
  pages: ImmutablePropTypes.listOf(PagePropType),
  selectedVersionTag: React.PropTypes.any
}

function renderDocContent (docId, pages) {
  if (pages.size === 0) {
    return 'Loading...'
  }

  const doc = pages.find((page) => page.urlId === docId)

  if (!doc) {
    return 'This page is not available for this version'
  }

  switch (doc.type) {
    case 'jsdoc':
      return <JSDoc content={doc.content} />
    case 'markdown':
      return <MarkdownDoc content={doc.content} />
  }
}
