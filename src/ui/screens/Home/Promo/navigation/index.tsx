import { h } from 'preact'
import githubPath from './img/github.svg'
import twitterPath from './img/twitter.svg'
import spectrumPath from './img/spectrum.svg'
import { Navigation as StyledNavigation, Link, Icon } from './style.css'

export const Navigation = () => (
  <StyledNavigation tag="nav">
    <Link
      tag="a"
      href="https://github.com/date-fns/date-fns"
    >
      <Icon
        tag="img"
        src={githubPath}
        alt="GitHub icon"
        type="github"
      />
      Star at GitHub
    </Link>
    <Link
      tag="a"
      href="https://twitter.com/date_fns"
    >
      <Icon
        tag="img"
        src={twitterPath}
        alt="Twitter icon"
        type="twitter"
      />
      Follow at Twitter
    </Link>
    <Link
      tag="a"
      href="https://spectrum.chat/date-fns"
    >
      <Icon
        tag="img"
        src={spectrumPath}
        alt="Spectrum icon"
        type="spectrum"
      />
      Join the community
    </Link>
  </StyledNavigation>
)
