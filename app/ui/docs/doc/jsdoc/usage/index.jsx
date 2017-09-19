import React from 'react'
import classnames from 'classnames'
import Code from 'app/ui/_lib/code'
import Markdown from 'app/ui/_lib/markdown'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { EitherPropType } from 'app/types/either'
import { trackAction } from 'app/acts/tracking_acts'

export default class JSDocUsage extends React.Component {
  static propTypes = {
    usage: ImmutablePropTypes.map,
    usageTabs: ImmutablePropTypes.list,
    selectedVersionTag: EitherPropType(
      React.PropTypes.object,
      React.PropTypes.string
    ).isRequired
  }

  state = {
    source: 'commonjs'
  }

  componentWillMount () {
    const source = window.localStorage.getItem('usageSource')

    if (source) {
      this.setState({ source })
    } else {
      window.localStorage.setItem('usageSource', 'commonjs')
    }
  }

  render () {
    const { usage, usageTabs, selectedVersionTag } = this.props

    if (!usage || !usageTabs) {
      return null
    }

    const selectedTab = usageTabs.includes(this.state.source)
      ? this.state.source
      : usageTabs.get(0)
    const selectedUsage = usage.get(selectedTab)

    return (
      <section>
        <h2 id='usage'>
          Usage
          <a href='#usage' className='doc-header_link'>
            #
          </a>
        </h2>

        <ul className='jsdoc_usage-options'>
          {usageTabs.map((usageTab, index) => {
            const usageItem = usage.get(usageTab)

            // TODO: Instead of relying on `usageTabs` prop, simply use `usage`
            if (!usageItem) return

            return (
              <li className='jsdoc_usage-option' key={usageTab}>
                <a
                  href='#'
                  onClick={this._changeSource.bind(this, usageTab)}
                  className={classnames('jsdoc_usage-option_link', {
                    'is-current': selectedTab === usageTab
                  })}
                >
                  {usageItem.get('title')}
                </a>
              </li>
            )
          })}
        </ul>

        {this._renderUsage(
          selectedUsage.get('code'),
          selectedUsage.get('text'),
          selectedVersionTag
        )}
      </section>
    )
  }

  _renderUsage (code, text, selectedVersionTag) {
    const codeContent = (
      <Code
        value={code}
        options={{
          readOnly: true,
          mode: 'javascript'
        }}
      />
    )

    if (text) {
      return (
        <div>
          {codeContent}
          <div>
            <Markdown value={text} selectedVersionTag={selectedVersionTag} />
          </div>
        </div>
      )
    } else {
      return codeContent
    }
  }

  _changeSource (source, e) {
    trackAction('Changed Usage Source', { source })
    e.preventDefault()
    this.setState({ source })
    window.localStorage.setItem('usageSource', source)
  }
}
