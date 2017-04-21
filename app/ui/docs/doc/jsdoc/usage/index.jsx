import React from 'react'
import classnames from 'classnames'
import Code from 'app/ui/_lib/code'
import {trackAction} from 'app/acts/tracking_acts'

export default class JSDocUsage extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    usageAvailable: React.PropTypes.bool,
    camelCase: React.PropTypes.bool,
    isFPFn: React.PropTypes.bool
  }

  state = {
    source: 'commonjs'
  }

  componentWillMount () {
    const source = window.localStorage.getItem('usageSource')

    if (source) {
      this.setState({source})
    } else {
      window.localStorage.setItem('usageSource', 'commonjs')
    }
  }

  render () {
    if (!this.props.usageAvailable) {
      return null
    }

    return <section>
      <h2 id='usage'>
        Usage
        <a href='#usage' className='doc-header_link'>#</a>
      </h2>

      <ul className='jsdoc_usage-options'>
        <li className='jsdoc_usage-option'>
          <a
            href='#'
            onClick={this._changeSource.bind(this, 'commonjs')}
            className={classnames('jsdoc_usage-option_link', {
              'is-current': this.state.source === 'commonjs'
            })}
          >
            CommonJS
          </a>
        </li>

        <li className='jsdoc_usage-option'>
          <a
            href='#'
            onClick={this._changeSource.bind(this, 'umd')}
            className={classnames('jsdoc_usage-option_link', {
              'is-current': this.state.source === 'umd'
            })}
          >
            UMD
          </a>
        </li>

        <li className='jsdoc_usage-option'>
          <a
            href='#'
            onClick={this._changeSource.bind(this, 'es2015')}
            className={classnames('jsdoc_usage-option_link', {
              'is-current': this.state.source === 'es2015'
            })}
          >
            ES 2015
          </a>
        </li>
      </ul>

      {this._renderUsage()}
    </section>
  }

  _renderUsage () {
    const {name, camelCase, isFPFn} = this.props
    const source = this.state.source

    return <Code
      value={this._generateUsageString(source, name, camelCase, isFPFn)}
      options={{
        readOnly: true,
        mode: 'javascript'
      }}
    />
  }

  _changeSource (source, e) {
    trackAction('Changed Usage Source', {source})
    e.preventDefault()
    this.setState({source})
    window.localStorage.setItem('usageSource', source)
  }

  _generateUsageString (source, name, camelCase, isFPFn) {
    const caseCorrectedName = camelCase ? name : this._convertToUnderscore(name)
    const submoduleCorrectedName = isFPFn ? 'fp/' + caseCorrectedName : caseCorrectedName

    if (source === 'commonjs') {
      return `var ${name} = require('date-fns/${submoduleCorrectedName}')`
    } else if (source === 'umd') {
      return `var ${name} = dateFns.${name}`
    } else if (source === 'es2015') {
      return `import ${name} from 'date-fns/${submoduleCorrectedName}'`
    }
  }

  _convertToUnderscore (string) {
    return string.replace(/ISO|[A-Z]/g, (letter) => '_' + letter.toLowerCase())
  }
}
