import { h } from 'preact'
import githubPath from './img/github.svg'
import twitterPath from './img/twitter.svg'
import * as styles from './styles.css'

export const Navigation = () => (
  <nav class={styles.navigation}>
    <a class={styles.link} href="https://github.com/date-fns/date-fns">
      <img class={styles.icon} src={githubPath} alt="GitHub icon" />
      Star on GitHub
    </a>

    <a
      class={styles.link}
      href="https://github.com/date-fns/date-fns/discussions"
    >
      <img class={styles.icon} src={githubPath} alt="GitHub icon" />
      Join the community
    </a>

    <a class={styles.link} href="https://twitter.com/date_fns">
      <img class={styles.icon} src={twitterPath} alt="Twitter icon" />
      Follow on Twitter
    </a>
  </nav>
)
