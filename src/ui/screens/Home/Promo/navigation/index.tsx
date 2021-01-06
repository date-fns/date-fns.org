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
      Star on GitHub
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
      Follow on Twitter
    </Link>
    <Link
      tag="a"
      href="https://github.com/date-fns/date-fns/discussions"
    >
      <Icon
        tag="img"
        src={githubPath}
        alt="Github community icon"
        type="github"
      />
      Join the community
    </Link>
  </StyledNavigation>
)
