import React, {PropTypes} from 'react'
import classnames from 'classnames'
import Code from 'app/ui/_lib/code'
import Link from 'app/ui/_lib/link'
import {trackAction} from 'app/acts/tracking_acts'
import version from 'app/_lib/version'

const NPM_INSTALL_EXAMPLE = 'npm install date-fns --save'
const NPM_SIMPLE_EXAMPLE = `var isToday = require('date-fns/is_today')
isToday(new Date())
//=> true`

const YARN_INSTALL_EXAMPLE = 'yarn add date-fns'
const YARN_SIMPLE_EXAMPLE = `var isToday = require('date-fns/is_today')
isToday(new Date())
//=> true`

const BOWER_INSTALL_EXAMPLE = 'bower install date-fns'
const BOWER_SIMPLE_EXAMPLE = `dateFns.isToday(new Date())
//=> true`

const CDN_INSTALL_EXAMPLE = `<script src="http://cdn.date-fns.org/v${version}/date_fns.min.js"></script>`
const CDN_SIMPLE_EXAMPLE = `dateFns.isToday(new Date())
//=> true`
const CDN_DOWNLOAD_LINK = `http://cdn.date-fns.org/v${version}/date_fns.min.js`

export default class GettingStarted extends React.Component {
  static propTypes = {
    gettingStarted: PropTypes.object
  }

  state = {
    source: 'npm'
  }

  render () {
    const {gettingStarted} = this.props

    return <div className='getting_started'>
      {this._renderContent()}

      <div className='getting_started-link_wrapper'>
        <Link
          name='doc'
          params={{docId: 'Getting-Started'}}
          className='getting_started-link'
        >
          Documentation
        </Link>
      </div>
    </div>
  }

  _renderContent () {
    const {gettingStarted} = this.props

    if (gettingStarted) {
      return <div>
        <ul className='getting_started-options'>
          <li className='getting_started-option'>
            <a
              href='#'
              onClick={this._changeSource.bind(this, 'npm')}
              className={classnames('getting_started-option_link', {
                'is-current': this.state.source === 'npm'
              })}
            >
              npm
            </a>
          </li>

          <li className='getting_started-option'>
            <a
              href='#'
              onClick={this._changeSource.bind(this, 'yarn')}
              className={classnames('getting_started-option_link', {
                'is-current': this.state.source === 'yarn'
              })}
            >
              Yarn
            </a>
          </li>

          <li className='getting_started-option'>
            <a
              href='#'
              onClick={this._changeSource.bind(this, 'bower')}
              className={classnames('getting_started-option_link', {
                'is-current': this.state.source === 'bower'
              })}
            >
              Bower
            </a>
          </li>

          <li className='getting_started-option'>
            <a
              href='#'
              onClick={this._changeSource.bind(this, 'cdn')}
              className={classnames('getting_started-option_link', {
                'is-current': this.state.source === 'cdn'
              })}
            >
              CDN & Download
            </a>
          </li>
        </ul>

        {this._renderInstruction()}
      </div>
    } else {
      return <div className='getting_started-loading'>Loading</div>
    }
  }

  _renderInstruction () {
    switch (this.state.source) {
      case 'npm':
        return <div className='getting_started-instruction' key='npm'>
          <h4 className='getting_started-instruction_header'>
            Installation
          </h4>
          <Code value={NPM_INSTALL_EXAMPLE} options={{theme: 'wormhole', readOnly: true}} />

          <h4 className='getting_started-instruction_header'>
            Example
          </h4>
          <div id='qa-npm'>
            <Code value={NPM_SIMPLE_EXAMPLE} options={{theme: 'wormhole', readOnly: true}} />
          </div>
        </div>

      case 'yarn':
        return <div className='getting_started-instruction' key='yarn'>
          <h4 className='getting_started-instruction_header'>
            Installation
          </h4>
          <Code value={YARN_INSTALL_EXAMPLE} options={{theme: 'wormhole', readOnly: true}} />

          <h4 className='getting_started-instruction_header'>
            Example
          </h4>
          <div id='qa-yarn'>
            <Code value={YARN_SIMPLE_EXAMPLE} options={{theme: 'wormhole', readOnly: true}} />
          </div>
        </div>

      case 'bower':
        return <div className='getting_started-instruction' key='bower'>
          <h4 className='getting_started-instruction_header'>
            Installation
          </h4>
          <Code value={BOWER_INSTALL_EXAMPLE} options={{theme: 'wormhole', readOnly: true}} />

          <h4 className='getting_started-instruction_header'>
            Example
          </h4>
          <div id='qa-bower'>
            <Code value={BOWER_SIMPLE_EXAMPLE} options={{theme: 'wormhole', readOnly: true}} />
          </div>
        </div>

      case 'cdn':
        return <div className='getting_started-instruction' key='cdn'>
          <h4 className='getting_started-instruction_header'>
            Installation
          </h4>
          <Code value={CDN_INSTALL_EXAMPLE} options={{theme: 'wormhole', readOnly: true}} />

          <h4 className='getting_started-instruction_header'>
            Example
          </h4>
          <div id='qa-cdn'>
            <Code value={CDN_SIMPLE_EXAMPLE} options={{theme: 'wormhole', readOnly: true}} />
          </div>

          <a
            href={CDN_DOWNLOAD_LINK}
            className='getting_started-download'
            target='_blank'
          >
            Download Library
          </a>
        </div>
    }
  }

  _changeSource (source, e) {
    trackAction('Changed Installation Source', {source})
    e.preventDefault()
    this.setState({source})
  }
}
