import { h } from 'preact'
import { DEFAULT_PAGE } from '~/constants'
import { RouterLink } from '~/ui/router'
import { docLink } from '~/ui/router/docLink'
import logoPath from './img/logo.svg'
import { Navigation } from './Navigation'
import * as styles from './styles.css'

export const Promo = () => (
  <div class={styles.outer}>
    <div class={styles.inner}>
      <a
        href="https://blog.date-fns.org/v40-with-time-zone-support/"
        class={styles.newLabel}
      >
        <span class={styles.newLabelMessage}>
          🔥 date-fns v4.0 with time zone support!
        </span>
      </a>

      <div class={styles.logo}>
        <img class={styles.logoImage} src={logoPath} />
        <div class={styles.logoName}>date-fns</div>
      </div>

      <h1 class={styles.header}>Modern JavaScript date utility library</h1>

      <p class={styles.text}>
        date-fns provides the most comprehensive, yet simple and consistent
        toolset for manipulating <strong>JavaScript dates</strong> in{' '}
        <strong>a&nbsp;browser</strong> & <strong>Node.js</strong>.
      </p>

      <div class={styles.gettingStarted}>
        <RouterLink
          class={styles.gettingStartedLink}
          to={docLink({ page: DEFAULT_PAGE })}
        >
          Documentation
        </RouterLink>
      </div>

      <Navigation />
    </div>
  </div>
)
