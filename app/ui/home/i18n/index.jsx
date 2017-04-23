import React from 'react'
import I from 'immutable'
import HomeBlock, {Link} from '../_lib/block'
import FlagSpinner from './flag_spinner'
import flag from 'emoji-flag'
import ImmutablePropTypes from 'react-immutable-proptypes'

export default function I18n ({locales, localesAvailable, selectedVersionTag}) {
  if (!localesAvailable) {
    return <HomeBlock
      header='I18n'
    >Locales data aren't available for this version</HomeBlock>
  }

  return <HomeBlock
    header='I18n'
    subHeader={`${locales && !(locales instanceof Error) && locales.size > 0
      ? locales.size
      : '...'} locales available`}
    action='See documentation'
    actionLink='doc'
    actionLinkParams={{docId: 'I18n', versionTag: selectedVersionTag}}
  >
    {renderContent(locales)}
  </HomeBlock>
}

I18n.propTypes = {
  locales: ImmutablePropTypes.list,
  localesAvailable: React.PropTypes.bool.isRequired,
  selectedVersionTag: React.PropTypes.any
}

function renderContent (locales) {
  if (locales) {
    if (locales instanceof Error) {
      return locales.message
    } else if (locales.size === 0) {
      return 'Loading'
    } else {
      return renderList(locales)
    }
  } else {
    return 'Loading'
  }
}

function renderList (locales) {
  return <div className='i18n-content'>
    <div className='i18n-spinner'>
      <FlagSpinner countries={locales.reduce((acc, locale) => {
        return acc.concat(locale.get('countries'))
      }, I.List()).toSet()} />
    </div>

    <div className='i18n-locales'>
      {locales.map((locale, index) => <div className='i18n-locale' key={index}>
        <Link key={locale.get('name')} href={locale.get('url')}>
          <span title={locale.get('countries', []).map(country => flag(country)).join('')}>
            {locale.get('name') === 'Modern Greek (1453-)' ? 'Greek' : locale.get('name')}
          </span>
        </Link>
      </div>)}
    </div>
  </div>
}
