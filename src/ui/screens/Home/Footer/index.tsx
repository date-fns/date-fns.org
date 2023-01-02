import { DEFAULT_PAGE } from '~/constants'
import { h } from 'preact'
import { HomeBlock } from '~/ui/components/Home'
import { RouterLink } from '~/ui/router'
import { docLink } from '~/ui/router/docLink'
import * as styles from './styles.css'
import classNames from 'classnames'

export const Footer = () => (
  <HomeBlock>
    <nav class={styles.container}>
      <div class={styles.row}>
        <RouterLink to={docLink({ page: DEFAULT_PAGE })}>
          Documentation
        </RouterLink>
      </div>

      <div class={styles.row}>
        <a href="https://github.com/date-fns/date-fns">GitHub</a>
      </div>

      <div class={styles.row}>
        <a href="https://github.com/date-fns/date-fns/discussions">Community</a>
      </div>

      <div class={styles.row}>
        <a href="https://twitter.com/date_fns">Twitter</a>
      </div>

      <div class={styles.row}>
        <a href="http://jobs.date-fns.org">JavaScript Jobs</a>
      </div>

      <div class={classNames(styles.row, styles.rowIsLicense)}>
        <a href="https://kossnocorp.mit-license.org/">MIT © Sasha Koss</a>
      </div>
    </nav>
  </HomeBlock>
)
