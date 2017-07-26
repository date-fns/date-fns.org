import React from 'react'
import Link from 'app/ui/_lib/link'
import HomeBlock from '../_lib/block'

export default function Footer () {
  return (
    <HomeBlock>
      <div className='footer'>
        <div className='footer-row'>
          <Link name='doc' params={{ docId: 'Getting-Started' }}>
            Documentation
          </Link>
        </div>
        <div className='footer-row'>
          <a href='https://github.com/date-fns/date-fns'>GitHub</a>
        </div>
        <div className='footer-row'>
          <a href='https://twitter.com/date_fns'>Twitter</a>
        </div>
        <div className='footer-row'>
          <a href='https://gitter.im/date-fns/support'>Gitter</a>
        </div>
        <div className='footer-row is-license'>
          <a href='https://kossnocorp.mit-license.org/'>MIT © Sasha Koss</a>
        </div>
      </div>
    </HomeBlock>
  )
}
