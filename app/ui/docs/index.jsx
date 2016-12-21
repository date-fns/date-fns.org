import React from 'react'
import DocsFinder from './docs_finder'
import Doc from './doc'
import docs from 'app/_lib/docs'

export default class Docs extends React.Component {
  static props = {
    docId: React.PropTypes.string
  }

  render () {
    const {docId} = this.props

    return <div className='docs'>
      <div className='docs-finder'>
        <DocsFinder currentId={docId} />
      </div>

      <div className='docs-content'>
        <Doc docId={docId} />
      </div>
    </div>
  }

  _firstDocId () {
    return docs[Object.keys(docs)[0]][0].urlId
  }
}
