import { h } from 'preact'
import githubPath from './img/github.svg'
import twitterPath from './img/twitter.svg'
import { Navigation as StyledNavigation, Link, Icon } from './style.css'

export const Navigation = () => (
  <StyledNavigation tag="nav">
    <Link tag="a" href="https://github.com/date-fns/date-fns">
      <Icon tag="img" src={githubPath} alt="GitHub icon" />
      Star on GitHub
    </Link>
    <Link tag="a" href="https://github.com/date-fns/date-fns/discussions">
      Join the community
    </Link>
    <Link tag="a" href="https://twitter.com/date_fns">
      <Icon tag="img" src={twitterPath} alt="Twitter icon" />
      Follow on Twitter
    </Link>
  </StyledNavigation>
)
