import React from 'react'
import JSDoc from './jsdoc'
import MarkdownDoc from './markdown_doc'
import { DocsPropType } from 'app/types/docs'
import { EitherPropType } from 'app/types/either'

export default class Doc extends React.Component {
  componentDidUpdate ({ docId: prevDocId }) {
    const { docId } = this.props
    if (docId !== prevDocId) {
      window.scrollTo(0, 0)
    }
  }

  render () {
    const { docId, docs, selectedVersionTag } = this.props

    if (!docId) return null

    return (
      <div className='doc'>
        {docs.fold(
          ({ message }) => message,
          renderDocContent.bind(null, docId, selectedVersionTag)
        )}
      </div>
    )
  }
}

Doc.propTypes = {
  docId: React.PropTypes.string,
  docs: EitherPropType(React.PropTypes.object, DocsPropType.isRequired)
    .isRequired,
  selectedVersionTag: EitherPropType(
    React.PropTypes.object,
    React.PropTypes.string
  ).isRequired
}

function renderDocContent (docId, selectedVersionTag, docs) {
  const doc = docs.pages.find(page => page.urlId === docId)

  if (!doc) {
    return 'This page is not available for this version'
  }

  switch (doc.type) {
    case 'jsdoc':
      return <JSDoc doc={doc} selectedVersionTag={selectedVersionTag} />
    case 'markdown':
      return (
        <MarkdownDoc
          content={doc.content}
          selectedVersionTag={selectedVersionTag}
        />
      )
  }
}
