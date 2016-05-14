import React from 'react'
import Remarkable from 'remarkable'
import remarkableTree from 'app/ui/_lib/remarkable_tree'
import MarkdownCode from 'app/ui/_lib/markdown_code'

const md = new Remarkable({
  linkify: true
})

export default class Markdown extends React.Component {
  static propTypes = {
    value: React.PropTypes.string
  }

  render () {
    const tree = remarkableTree(md.parse(this.props.value, {}))
    const result = this._renderTree(tree)

    // Render single node as is
    if (result.length === 1) {
      return result[0]
    // Then there are more than one node, wrap into div
    } else {
      return <div>{result}</div>
    }
  }

  _renderTree (tokens) {
    return tokens.map(this._renderToken.bind(this))
  }

  _renderToken (token, index) {
    switch (token.type) {
      case 'tag':
        return React.createElement(
          token.tagName,
          Object.assign({key: index}, token.attrs),
          this._renderTree(token.children)
        )

      case 'text':
        return token.content

      case 'softbreak':
        return '\n'

      case 'code':
        return <MarkdownCode
          value={token.content.trim()}
          language={token.language}
        />
    }
  }
}
