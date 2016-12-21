import React from 'react'
import githubPath from './img/github.svg'
import twitterPath from './img/twitter.svg'
import telegramPath from './img/telegram.svg'

export default class Navigation extends React.Component {
  render () {
    return <nav className='navigation'>
      <a href='https://github.com/date-fns/date-fns' className='navigation-link'>
        <img src={githubPath} className='navigation-icon' alt='GitHub icon' />
        Star at GitHub
      </a>
      <a href='https://twitter.com/date_fns' className='navigation-link'>
        <img src={twitterPath} className='navigation-icon' alt='Twitter icon' />
        Follow at Twitter
      </a>
      <a href='https://telegram.me/date_fns' className='navigation-link'>
        <img src={telegramPath} className='navigation-icon is-telegram' alt='Telegram icon' />
        Connect at Telegram
      </a>
    </nav>
  }
}
