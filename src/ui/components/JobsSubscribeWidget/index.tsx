import { h } from 'preact'
import * as styles from './styles.css'
// import twitterIconURL from './img/twitterBlack.svg'

export const JobsSubscribeWidget = () => (
  <div class={styles.container}>
    <div class={styles.block}>
      <div class={styles.blockContent}>
        <div class={styles.header}>
          Get awesome JavaScript jobs in your email
        </div>

        <form
          class={styles.form}
          action="https://cafe.us16.list-manage.com/subscribe/post?u=bf10ea6555c1dc38f3bcfa7e5&amp;id=b7d6fa4833"
          method="post"
          target="_blank"
          rel="noreferrer,noopener"
        >
          <input
            class={styles.input}
            name="EMAIL"
            placeholder="Email"
            type="email"
            required
          />

          <button class={styles.subscribeButton} type="submit">
            Subscribe
          </button>
        </form>
      </div>
    </div>

    <div class={styles.footer}>
      Subscribe to support date-fns development, it's free!
    </div>

    {/* <a
      class={styles.twitterLink}
      href="https://twitter.com/date_fns"
      target="_blank"
    >
      <img class={styles.twitterIcon} src={twitterIconURL} alt="Twitter icon" />
      Follow on Twitter
    </a> */}
  </div>
)
