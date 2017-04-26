import React from 'react'
import JSDoc from './jsdoc'
import MarkdownDoc from './markdown_doc'
import Link from 'app/ui/_lib/link'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {PagePropType} from 'app/types/page'

export default function Doc ({docId, docs, selectedVersionTag, latestVersionTag}) {
  if (!docId) return null

  return <div className='doc'>
    {docs.fold(
      ({message}) => message,
      renderDocContainer.bind(null, docId, selectedVersionTag, latestVersionTag)
    )}
  </div>
}

Doc.propTypes = {
  docId: React.PropTypes.string,
  pages: ImmutablePropTypes.listOf(PagePropType),
  selectedVersionTag: React.PropTypes.any,
  latestVersionTag: React.PropTypes.any
}

function renderDocContainer (docId, selectedVersionTag, latestVersionTag, docs) {
  const doc = docs.pages.find((page) => page.urlId === docId)

  if (!doc) {
    return 'This page is not available for this version'
  }

  const docContent = renderDocContent(doc, doc.type, selectedVersionTag)

  if (selectedVersionTag === latestVersionTag) {
    return docContent
  } else {
    return <div>
      <Link
        name='doc'
        params={{docId, versionTag: latestVersionTag}}
      >
        Latest version of this page
      </Link>

      {docContent}
    </div>
  }
}

function renderDocContent (doc, type, selectedVersionTag) {
  switch (type) {
    case 'jsdoc':
      return <JSDoc doc={doc} selectedVersionTag={selectedVersionTag} />
    case 'markdown':
      return <MarkdownDoc content={doc.content} selectedVersionTag={selectedVersionTag} />
  }
}
