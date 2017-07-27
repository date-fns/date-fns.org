import React from 'react'
import githubPath from './img/github.svg'
import twitterPath from './img/twitter.svg'
import gitterPath from './img/gitter.svg'

export default function Navigation () {
  return (
    <nav className='navigation'>
      <a
        href='https://github.com/date-fns/date-fns'
        className='navigation-link'
      >
        <img src={githubPath} className='navigation-icon' alt='GitHub icon' />
        Star at GitHub
      </a>
      <a href='https://twitter.com/date_fns' className='navigation-link'>
        <img src={twitterPath} className='navigation-icon' alt='Twitter icon' />
        Follow at Twitter
      </a>
      <a href='https://gitter.im/date-fns/support' className='navigation-link'>
        <img
          src={gitterPath}
          className='navigation-icon is-gitter'
          alt='Gitter icon'
        />
        Get support at Gitter
      </a>
    </nav>
  )
}
