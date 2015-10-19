import React from 'react'
import classnames from 'classnames'
import Code from 'app/ui/_lib/code'

const NPM_INSTALL_EXAMPLE = 'npm install date-fns --save'
const NPM_SIMPLE_EXAMPLE = `var isToday = require('date-fns/is_today')
isToday(new Date())
//=> true`

const BOWER_INSTALL_EXAMPLE = 'bower install date-fns'
const BOWER_SIMPLE_EXAMPLE = `dateFns.isToday(new Date())
//=> true`

export default class GettingStarted extends React.Component {
  state = {
    source: 'npm'
  }

  render() {
    return <div className='getting_started'>
      <ul className='getting_started-options'>
        <li className='getting_started-option'>
          <a
            href='#'
            onClick={this._changeSource.bind(this, 'npm')}
            className={classnames('getting_started-option_link', {
              'is-current': this.state.source == 'npm'
            })}
          >
            npm
          </a>
        </li>

        <li className='getting_started-option'>
          <a
            href='#'
            onClick={this._changeSource.bind(this, 'bower')}
            className={classnames('getting_started-option_link', {
              'is-current': this.state.source == 'bower'
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
              'is-current': this.state.source == 'cdn'
            })}
          >
            CDN & Download
          </a>
        </li>
      </ul>

      {this._renderInstruction()}
    </div>
  }

  _renderInstruction() {
    switch(this.state.source) {
      case 'npm':
        return <div className='getting_started-instruction' key='npm'>
          <h4 className='getting_started-instruction_header'>
            Installation
          </h4>
          <Code value={NPM_INSTALL_EXAMPLE} options={{theme: 'wormhole', readOnly: true}} />

          <h4 className='getting_started-instruction_header'>
            Example
          </h4>
          <Code value={NPM_SIMPLE_EXAMPLE} options={{theme: 'wormhole', readOnly: true}} />
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
          <Code value={BOWER_SIMPLE_EXAMPLE} options={{theme: 'wormhole', readOnly: true}} />
        </div>

      case 'cdn':
        return <div className='getting_started-instruction' key='cdn'>
          <h4 className='getting_started-instruction_header'>
            Installation
          </h4>

          CDN
        </div>
    }
  }

  _changeSource(source, e) {
    e.preventDefault()
    this.setState({source})
  }
}
