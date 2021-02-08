import { h } from 'preact'
import { useMemo } from 'preact/hooks'
import { BooksWidget } from '~/ui/components/BooksWidget'
import { JobsSubscribeWidget } from '~/ui/components/JobsSubscribeWidget'
import { JobsWidget } from '~/ui/components/JobsWidget'

type CurrentWidget = 'jobsSubscribe' | 'books' | 'jobs'

export const Widget = () => {
  const currentWidget: CurrentWidget = useMemo(
    () => (Math.random() > 0.5 ? 'jobsSubscribe' : 'jobs'),
    []
  )

  if (currentWidget === 'jobsSubscribe') {
    return <JobsSubscribeWidget />
  } else if (currentWidget === 'jobs') {
    return <JobsWidget />
  } else {
    return <BooksWidget />
  }
}
