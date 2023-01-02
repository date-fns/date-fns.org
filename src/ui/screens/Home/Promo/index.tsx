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
