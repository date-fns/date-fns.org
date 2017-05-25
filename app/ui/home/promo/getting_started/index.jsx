import React, {Component} from 'react'
import Code from 'app/ui/_lib/code'
import Link from 'app/ui/_lib/link'

export default class GettingStarted extends Component {
  render () {
    return <div className='getting_started'>
      <div className='getting_started-install'>
        <h2>Getting Started</h2>
        <Code value={'npm install date-fns --save'} options={{theme: 'wormhole', readOnly: true}} />
      </div>

      <div className='getting_started-link_wrapper'>
        <Link
          name='doc'
          params={{docId: 'Getting-Started'}}
          className='getting_started-link'
        >
          Documentation
        </Link>
      </div>
    </div>
  }
}
