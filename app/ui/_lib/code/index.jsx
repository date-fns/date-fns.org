import React from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/lib/codemirror.css'

export default class Code extends React.Component {
  static propTypes = {
    value: React.PropTypes.string,
    options: React.PropTypes.object
  }

  componentDidMount () {
    this._codeMirror = CodeMirror.fromTextArea(
      this.refs.textarea,
      Object.assign(
        {
          theme: 'milky'
        },
        this.props.options
      )
    )
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.value !== nextProps.value) {
      this._codeMirror.setValue(nextProps.value)
    }
  }

  componentWillUnmount () {
    this._codeMirror.toTextArea()
  }

  render () {
    return <textarea defaultValue={this.props.value} ref='textarea' />
  }
}
