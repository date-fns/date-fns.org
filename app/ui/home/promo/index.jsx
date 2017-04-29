import React from 'react'
import GettingStarted from './getting_started'
import Navigation from './navigation'
import logoPath from './img/logo.svg'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {VersionPropType} from 'app/types/version'
import {EitherPropType} from 'app/types/either'

export default function Promo ({version}) {
  return <div className='promo'>
    <div className='promo-inner'>
      <div className='promo-logo'>
        <img src={logoPath} className='promo-logo_image' />
        <div className='promo-logo_name'>
          date-fns
        </div>
      </div>

      <h1 className='promo-header'>
        Modern JavaScript date utility library
      </h1>

      <div className='promo-text'>
        date-fns provides the most comprehensive, yet simple and consistent toolset
        for manipulating <strong>JavaScript dates</strong> in{' '}
        <strong>a&nbsp;browser</strong> & <strong>Node.js</strong>.
      </div>

      <div className='promo-getting_started'>
        <GettingStarted version={version} />
      </div>

      <div className='promo-navigation'>
        <Navigation />
      </div>
    </div>
  </div>
}

Promo.propTypes = {
  version: EitherPropType(React.PropTypes.object, VersionPropType.isRequired).isRequired
}
