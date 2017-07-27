import React from 'react'
import I from 'immutable'
import HomeBlock, { Link } from '../_lib/block'
import FlagSpinner from './flag_spinner'
import flag from 'emoji-flag'

export default function I18n ({ locales }) {
  return (
    <HomeBlock
      header='I18n'
      subHeader={`${locales ? locales.size : '...'} locales available`}
      action='See documentation'
      actionLink='doc'
      actionLinkParams={{ docId: 'I18n' }}
    >
      {locales ? renderList(locales) : 'Loading...'}
    </HomeBlock>
  )
}

function renderList (locales) {
  return (
    <div className='i18n-content'>
      <div className='i18n-spinner'>
        <FlagSpinner
          countries={locales
            .reduce((acc, locale) => {
              return acc.concat(locale.get('countries'))
            }, I.List())
            .toSet()}
        />
      </div>

      <div className='i18n-locales'>
        {locales.map((locale, index) =>
          <div className='i18n-locale' key={index}>
            <Link key={locale.get('name')} href={locale.get('url')}>
              <span
                title={locale
                  .get('countries', [])
                  .map(country => flag(country))
                  .join('')}
              >
                {locale.get('name')}
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
