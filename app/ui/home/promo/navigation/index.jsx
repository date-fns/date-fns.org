import React from 'react'
import githubPath from './img/github.svg'
import spectrumPath from './img/spectrum.svg'
import twitterPath from './img/twitter.svg'

export default function Navigation() {
  return (
    <nav className="navigation">
      <a
        href="https://github.com/date-fns/date-fns"
        className="navigation-link"
      >
        <img src={githubPath} className="navigation-icon" alt="GitHub icon" />
        Star at GitHub
      </a>
      <a href="https://twitter.com/date_fns" className="navigation-link">
        <img src={twitterPath} className="navigation-icon" alt="Twitter icon" />
        Follow at Twitter
      </a>
      <a href="https://spectrum.chat/date-fns" className="navigation-link">
        <img
          src={spectrumPath}
          className="navigation-icon is-spectrum"
          alt="Spectrum icon"
        />
        Join the community
      </a>
    </nav>
  )
}
