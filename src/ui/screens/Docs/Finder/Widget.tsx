import { h } from 'preact'
import { useState } from 'preact/hooks'
import { BooksWidget } from '~/ui/components/BooksWidget'
import { HireWidget } from '~/ui/components/HireWidget'
import { JobsSubscribeWidget } from '~/ui/components/JobsSubscribeWidget'
import { JobsWidget } from '~/ui/components/JobsWidget'

type CurrentWidget = 'jobsSubscribe' | 'books' | 'jobs' | 'hire'

export const Widget = () => {
  const [
    currentWidget /*, setCurrentWidget */,
  ] = useState<null | CurrentWidget>('hire')
  // useEffect(
  //   () => {
  //     setCurrentWidget(Math.random() > 0.75 ? 'jobsSubscribe' : 'jobs')
  //   },
  //   []
  // )

  switch (currentWidget) {
    case 'jobsSubscribe':
      return <JobsSubscribeWidget />
    case 'jobs':
      return <JobsWidget />
    case 'books':
      return <BooksWidget />
    case 'hire':
      return <HireWidget />
    default:
      return null
  }
}
