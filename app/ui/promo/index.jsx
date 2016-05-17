import React from 'react'
import GettingStarted from 'app/ui/getting_started'
import logoPath from './img/logo.svg'

export default class Promo extends React.Component {
  render () {
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
          date-fns provides the most comprehensive yet simple and consistent toolset
          for manipulating <strong>JavaScript dates</strong> in
          <strong>a browser</strong> & <strong>Node.js</strong>.
        </div>

        <div className='promo-getting_started'>
          <GettingStarted />
        </div>
      </div>
    </div>
  }
}
