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
        const extraAttrs = {}
        const extraChildren = []

        if (/^h[2-6]$/.test(token.tagName)) {
          let headerLinkId = this._getUrlIdFromText(token)
          extraAttrs.id = headerLinkId
          extraChildren.push(<a
            href={`#${headerLinkId}`}
            className='doc-header_link'
            key={`${index}-2`}
          >
              #
          </a>)
        }

        return React.createElement(
          token.tagName,
          Object.assign({key: index}, token.attrs, extraAttrs),
          this._renderTree(token.children).concat(extraChildren)
        )

      case 'text':
        return token.content

      case 'softbreak':
        return '\n'

      case 'code':
        return <MarkdownCode
          value={token.content.trim()}
          language={token.language}
          key={index}
        />
    }
  }

  _getUrlIdFromText (token) {
    return this._getTextFromToken(token)
      .join(' ')
      .toLowerCase()
      .replace(/[^\w\d\.]/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  _getTextFromToken (token) {
    if (token.type === 'text') {
      return [token.content]
    } else {
      return token.children.reduce((acc, token) => {
        if (token.type === 'text') {
          return acc.concat(token.content)
        } else {
          return acc.concat(token.children.map(this._getUrlIdFromText.bind(this)))
        }
      }, [])
    }
  }
}
