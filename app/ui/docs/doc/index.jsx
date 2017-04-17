import React from 'react'
import JSDoc from './jsdoc'
import MarkdownDoc from './markdown_doc'
import Link from 'app/ui/_lib/link'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {PagePropType} from 'app/types/page'

export default function Doc ({docId, pages, selectedVersionTag, latestVersionTag}) {
  if (!docId) return null

  return <div className='doc'>
    {renderDocContainer(docId, pages, selectedVersionTag, latestVersionTag)}
  </div>
}

Doc.propTypes = {
  docId: React.PropTypes.string,
  pages: ImmutablePropTypes.listOf(PagePropType),
  selectedVersionTag: React.PropTypes.any,
  latestVersionTag: React.PropTypes.any
}

function renderDocContainer (docId, pages, selectedVersionTag, latestVersionTag) {
  if (pages.size === 0) {
    return 'Loading...'
  }

  const doc = pages.find((page) => page.urlId === docId)

  if (!doc) {
    return 'This page is not available for this version'
  }

  const docContent = renderDocContent(doc.type, doc.content, selectedVersionTag)

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

function renderDocContent (type, content, selectedVersionTag) {
  switch (type) {
    case 'jsdoc':
      return <JSDoc content={content} selectedVersionTag={selectedVersionTag} />
    case 'markdown':
      return <MarkdownDoc content={content} selectedVersionTag={selectedVersionTag} />
  }
}
