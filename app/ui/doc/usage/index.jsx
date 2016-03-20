import React from 'react'
import classnames from 'classnames'
import Code from 'app/ui/_lib/code'
import {trackAction} from 'app/acts/tracking_acts'

export default class DocUsage extends React.Component {
  static propTypes = {
    name: React.PropTypes.string
  }

  state = {
    source: 'commonjs'
  }

  componentWillMount() {
    const source = localStorage.getItem('usageSource')

    if (source) {
      this.setState({source})
    } else {
      localStorage.setItem('usageSource', 'commonjs')
    }
  }

  render() {
    return <section className='doc-section'>
      <h3 className='doc-subheader'>
        Usage
      </h3>

      <ul className='doc_usage-options'>
        <li className='doc_usage-option'>
          <a
            href='#'
            onClick={this._changeSource.bind(this, 'commonjs')}
            className={classnames('doc_usage-option_link', {
              'is-current': this.state.source == 'commonjs'
            })}
          >
            CommonJS
          </a>
        </li>

        <li className='doc_usage-option'>
          <a
            href='#'
            onClick={this._changeSource.bind(this, 'umd')}
            className={classnames('doc_usage-option_link', {
              'is-current': this.state.source == 'umd'
            })}
          >
            UMD
          </a>
        </li>

        <li className='doc_usage-option'>
          <a
            href='#'
            onClick={this._changeSource.bind(this, 'es2015')}
            className={classnames('doc_usage-option_link', {
              'is-current': this.state.source == 'es2015'
            })}
          >
            ES 2015
          </a>
        </li>
      </ul>

      {this._renderUsage()}
    </section>
  }

  _renderUsage() {
    const {name} = this.props

    switch(this.state.source) {
      case 'commonjs':
        return <Code
          value={`var ${name} = require('date-fns/${this._convertToUnderscore(name)}')`}
          options={{
            readOnly: true,
            mode: 'javascript'
          }}
        />

      case 'umd':
        return <Code
          value={`var ${name} = dateFns.${name}`}
          options={{
            readOnly: true,
            mode: 'javascript'
          }}
        />

      case 'es2015':
        return <Code
          value={`import ${name} from 'date-fns/${this._convertToUnderscore(name)}'`}
          options={{
            readOnly: true,
            mode: 'javascript'
          }}
        />
    }
  }

  _changeSource(source, e) {
    trackAction('Changed Usage Source', {source})
    e.preventDefault()
    this.setState({source})
    localStorage.setItem('usageSource', source)
  }

  _convertToUnderscore(string) {
    return string.replace(/ISO|[A-Z]/g, (letter) => '_' + letter.toLowerCase())
  }
}
