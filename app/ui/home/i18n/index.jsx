import React, {PropTypes} from 'react'
import I from 'immutable'
import HomeBlock, {Link} from '../_lib/block'
import FlagSpinner from './flag_spinner'
import {fetchLocales} from 'app/acts/locales'
import uniq from 'lodash/array/uniq'
import flag from 'emoji-flag'

export default class I18n extends React.Component {
  static propTypes = {
    locales: PropTypes.object,
    version: PropTypes.string.isRequired
  }

  componentWillMount () {
    fetchLocales(this.props.version)
  }

  render () {
    const {locales} = this.props
    return <HomeBlock
      header='I18n'
      subHeader={`${locales && !(locales instanceof Error)
        ? locales.count()
        : '...'} locales available`}
      action='See documentation'
      actionLink='doc'
      actionLinkParams={{docId: 'I18n'}}
    >{this._renderContent()}</HomeBlock>
  }

  _renderContent () {
    const {locales} = this.props
    if (locales) {
      if (locales instanceof Error) {
        return locales.message
      } else {
        return this._renderList()
      }
    } else {
      return 'Loading'
    }
  }

  _renderList () {
    const {locales} = this.props
    return <div className='i18n-content'>
      <div className='i18n-spinner'>
        <FlagSpinner countries={locales.reduce((acc, locale) => {
            return acc.concat(locale.get('countries'))
        }, I.List()).toSet()} />
      </div>

      <div className='i18n-locales'>
        {locales.map(locale => <div className='i18n-locale'>
          <Link key={locale.get('name')} href={locale.get('url')}>
            <span title={locale.get('countries').map(country => flag(country)).join('')}>
              {locale.get('name') === 'Modern Greek (1453-)' ? 'Greek' : locale.get('name')}
            </span>
          </Link>
        </div>)}
      </div>
    </div>
  }
}
