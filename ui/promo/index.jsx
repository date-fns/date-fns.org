import React from 'react'
import GettingStarted from 'app/ui/getting_started'

const logoPath = require('./img/logo.svg')
const toptalLogoPath = require('./img/toptal_logo.svg')

export default class Promo extends React.Component {
  render() {
    return <div className='promo'>
      <div className='promo-inner'>
        <div className='promo-logo'>
          <img src={logoPath} className='promo-logo_image' />
          <div className='promo-logo_name'>
            date-fns
          </div>
        </div>

        <h1 className='promo-header'>
          Modern JavaScript Date Utility Library
        </h1>

        <div className='promo-text'>
          date-fns provides the most comprehensive yet simple and consistent toolset
          for manipulating JavaScript dates in <strong>browser & Node.js</strong>.
        </div>

        <div className='promo-getting_started'>
          <GettingStarted />
        </div>

        <div className='promo-sponsored'>
          Sponsored by <img src={toptalLogoPath} className='promo-toptal_logo' />
        </div>
      </div>
    </div>
  }
}
