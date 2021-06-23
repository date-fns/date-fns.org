import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { BooksWidget } from '~/ui/components/BooksWidget'
import { JobsSubscribeWidget } from '~/ui/components/JobsSubscribeWidget'
import { JobsWidget } from '~/ui/components/JobsWidget'

type CurrentWidget = 'jobsSubscribe' | 'books' | 'jobs'

export const Widget = () => {
  const [currentWidget, setCurrentWidget] = useState<null | CurrentWidget>(null)
  useEffect(
    () => setCurrentWidget(Math.random() > 0.75 ? 'jobsSubscribe' : 'jobs'),
    []
  )

  if (currentWidget === 'jobsSubscribe') {
    return <JobsSubscribeWidget />
  } else if (currentWidget === 'jobs') {
    return <JobsWidget />
  } else if (currentWidget === 'books') {
    return <BooksWidget />
  } else {
    return null
  }
}
