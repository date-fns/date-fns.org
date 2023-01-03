import { h, FunctionComponent } from 'preact'
import shuffle from 'lodash/shuffle'
import { NextIcon } from './NextIcon'
import { CONFIG } from '~/constants'
import { useJobs } from '~/utils/useJobs'
import { useEffect, useMemo, useState } from 'preact/hooks'
import { JobsSubscribeWidget } from '~/ui/components/JobsSubscribeWidget'
import { request } from '~/utils/request'
import * as Sentry from '@sentry/browser'
import * as styles from './styles.css'
import classNames from 'classnames'

export const JobsWidget: FunctionComponent = () => {
  const [result] = useJobs()
  const [jobIndex, setJobIndex] = useState(0)
  const shuffledJobs = useMemo(() => shuffle(result?.jobs ?? []), [
    result?.jobs,
  ])

  const job = shuffledJobs[jobIndex]

  const [trackedJobs, setTrackedJobs] = useState<{ [jobId: string]: boolean }>(
    {}
  )

  useEffect(() => {
    if (job && !trackedJobs[job.ref.id]) {
      request(`${CONFIG.jobsURL}/api/impression?id=${job.ref.id}`).catch(
        (error) => {
          console.error(error)
          Sentry.captureException(error)
        }
      )
      setTrackedJobs({ ...trackedJobs, [job.ref.id]: true })
    }
  }, [job])

  if (!result) {
    return null
  }

  if (shuffledJobs.length === 0) {
    return <JobsSubscribeWidget />
  }

  return (
    <div class={styles.container}>
      <a
        class={classNames(styles.block, styles.blockClickable)}
        href={
          job.data.directApply
            ? job.data.applyURL
            : `${CONFIG.jobsURL}/api/apply?id=${job.ref.id}`
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class={styles.company}>
          <img
            class={styles.logo}
            src={job.data.companyLogo}
            key={job.data.companyLogo}
          />

          <div>
            <div class={styles.companyName}>{job.data.companyName}</div>
            <div class={styles.location}>{job.data.location}</div>
          </div>

          <div class={styles.header}>{job.data.position}</div>
        </div>

        <div class={styles.buttons}>
          <div class={styles.tags}>
            {job.data.tags.slice(0, 3).map((tag) => (
              <div class={styles.tag} key={tag}>
                {result.tags[tag]}
              </div>
            ))}
          </div>

          {shuffledJobs.length > 1 && (
            <button
              class={styles.nextButton}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                let newIndex = jobIndex + 1
                if (newIndex > shuffledJobs.length - 1) {
                  newIndex = 0
                }
                setJobIndex(newIndex)
              }}
            >
              <span>Next job</span>
              <NextIcon />
            </button>
          )}
        </div>
      </a>

      <div class={styles.footer}>
        <a
          class={styles.link}
          href={`${CONFIG.jobsURL}/?utm_source=date-fns&utm_medium=banner&utm_campaign=date-fns-docs`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get the hottest JavaScript Jobs right into your inbox
        </a>
      </div>
    </div>
  )
}
