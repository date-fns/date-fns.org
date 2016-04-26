import React from 'react'
import JSDoc from 'app/ui/jsdoc'
import MarkdownDoc from 'app/ui/markdown_doc'
import docs from 'app/_lib/docs'

export default class Doc extends React.Component {
  static propTypes = {
    docId: React.PropTypes.string
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.docId !== undefined
  }

  render() {
    if (!this.props.docId) return null

    return <div className='doc'>
      {this._renderDoc()}
    </div>
  }

  _renderDoc() {
    const doc = this._getDoc(this.props.docId)

    switch(doc.type) {
      case 'jsdoc':
        return <JSDoc doc={doc} />
      case 'markdown':
        return <MarkdownDoc doc={doc} />
    }
  }

  _getDoc(currentDocId) {
    for (let categoryName in docs) {
      let categoryDocs = docs[categoryName]
      for (let docId in categoryDocs) {
        let doc = categoryDocs[docId]
        if (doc.urlId == currentDocId) {
          return doc
        }
      }
    }
  }
}
