import React from 'react'
import HomeBlock, {Link} from '../_lib/block'

export default function Footer () {
  return <HomeBlock>
    <div className='footer'>
      <div className='footer-row'>
        <a href='/docs'>Documentation</a>
      </div>
      <div className='footer-row'>
        <a href='https://github.com/date-fns/date-fns'>GitHub</a>
      </div>
      <div className='footer-row'>
        <a href='https://twitter.com/date_fns'>Twitter</a>
      </div>
      <div className='footer-row'>
        <a href='https://telegram.me/date_fns'>Telegam</a>
      </div>
      <div className='footer-row is-license'>
        <a href='https://kossnocorp.mit-license.org/'>
          MIT © Sasha Koss
        </a>
      </div>
    </div>
  </HomeBlock>
}
