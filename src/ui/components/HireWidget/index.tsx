import { h } from 'preact'
import * as styles from './styles.css'

export const HireWidget = () => (
  <div class={styles.container}>
    <div class={styles.block}>
      <div class={styles.blockContent}>
        <div class={styles.header}>Your company is hiring JS developers?</div>

        <div class={styles.description}>
          Find a great teammate and support date-fns. Get in front of tens of
          thousands of JS devs.
        </div>

        <a
          class={styles.hireButton}
          href="https://jobs.date-fns.org/hire"
          target="_blank"
        >
          Promote job here
        </a>
      </div>
    </div>

    {/* <div class={styles.footer}>Subscribe to support date-fns development, it's free!</div> */}
  </div>
)
