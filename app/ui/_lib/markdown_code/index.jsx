import React from 'react'
import Code from 'app/ui/_lib/code'

export default class MarkdownCode extends React.Component {
  static propTypes = {
    value: React.PropTypes.string,
    language: React.PropTypes.string
  }

  render () {
    var { language, value } = this.props
    if (!language || language === 'js') language = 'javascript'

    return <Code value={value} options={{ readOnly: true, mode: language }} />
  }
}
