import React from 'react'
import Markdown from 'app/ui/_lib/markdown'

export default class MarkdownDoc extends React.Component {
  static propTypes = {
    doc: React.PropTypes.object.isRequired
  }

  render () {
    return <Markdown value={this.props.doc.content} />
  }
}
