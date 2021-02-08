import { h, FunctionComponent } from 'preact'
import shuffle from 'lodash/shuffle'
import { NextIcon } from './NextIcon'
import { JOBS_URL } from '~/constants'
import {
  Company,
  Container,
  Header,
  Job,
  Logo,
  Position,
  Location,
  Tag,
  Tags,
  TagsNNext,
  Link,
  NextButton,
} from './style.css'
import { useJobs } from '~/utils/useJobs'
import { useMemo, useState } from 'preact/hooks'
import { JobsSubscribeWidget } from '~/ui/components/JobsSubscribeWidget'

export const JobsWidget: FunctionComponent = () => {
  const [result] = useJobs()
  const [jobIndex, setJobIndex] = useState(0)
  const shuffledJobs = useMemo(() => shuffle(result?.jobs ?? []), [
    result?.jobs,
  ])

  if (!result) {
    return null
  }

  if (shuffledJobs.length === 0) {
    return <JobsSubscribeWidget />
  }

  const job = shuffledJobs[jobIndex]

  return (
    <Container>
      <Job
        tag="a"
        href={`${JOBS_URL}/jobs/${job.ref.id}?utm_source=date-fns&utm_medium=banner&utm_campaign=date-fns-docs`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Header>
          <Logo
            tag="img"
            src={job.data.companyLogo}
            key={job.data.companyLogo}
          />

          <div>
            <Company>{job.data.companyName}</Company>
            <Location>{job.data.location}</Location>
          </div>

          <Position>{job.data.position}</Position>
        </Header>

        <TagsNNext>
          <Tags>
            {job.data.tags.slice(0, 3).map((tag) => (
              <Tag key={tag}>{result.tags[tag]}</Tag>
            ))}
          </Tags>

          <NextButton
            tag="button"
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
          </NextButton>
        </TagsNNext>
      </Job>

      <Link
        tag="a"
        href={`${JOBS_URL}/?utm_source=date-fns&utm_medium=banner&utm_campaign=date-fns-docs`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get the hottest JavaScript Jobs right into your inbox
      </Link>
    </Container>
  )
}
