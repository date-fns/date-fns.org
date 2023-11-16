import { h } from 'preact'
// import { trackAction } from 'app/acts/tracking_acts'
import { useEffect, useState } from 'preact/hooks'
import { Emoji } from './Emoji'
import { Icon } from './Icon'
import * as styles from './styles.css'

export const JobsBanner = () => {
  const [kind, setKind] = useState<null | 'subscribe' | 'recommend'>(null)
  useEffect(() => setKind(Math.random() > 0.5 ? 'subscribe' : 'recommend'), [])

  return (
    <a
      class={styles.container}
      href={
        kind === 'subscribe'
          ? 'https://jobs.date-fns.org'
          : 'https://jobs.date-fns.org/#recommend'
      }
      target="_blank"
      rel="noopener noreferrer"
      onClick={
        () => console.log('FIXME') /*trackAction('Banner click', { kind }) */
      }
    >
      <div class={styles.inner}>
        <div class={styles.emojiWrapper}>
          <Emoji />
        </div>

        <div>
          {kind === 'subscribe' &&
            'Get jobs worth sharing to your email! JavaScript jobs by date-fns'}
          {kind === 'recommend' &&
            "Know someone who's looking for JavaScript devs? Recommend us a job!"}
          <Icon />
        </div>
      </div>
    </a>
  )
}
