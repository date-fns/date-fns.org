import { h } from 'preact'
import { useState } from 'preact/hooks'
import { Code } from '~/ui/components/Code'
import { HomeBlock } from '~/ui/components/Home'
// TODO: import { trackAction } from 'app/acts/tracking_acts'
import classNames from 'classnames'
import * as styles from './styles.css'

// TODO: Generate example results with date-fns v2
const examples = [
  {
    label: 'Format date',
    code: `
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

format(new Date(), "'Today is a' eeee")
//=> "Today is a ${
      [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ][new Date().getDay()]
    }"

formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
//=> "3 days ago"

formatRelative(subDays(new Date(), 3), new Date())
//=> "last Friday at 7:26 p.m."
`.trim(),
  },
  {
    label: 'I18n',
    code: `
import { formatRelative, subDays } from 'date-fns'
import { es, ru } from 'date-fns/locale'

formatRelative(subDays(new Date(), 3), new Date())
//=> "last Friday at 7:26 p.m."

formatRelative(subDays(new Date(), 3), new Date(), { locale: es })
//=> "el viernes pasado a las 19:26"

formatRelative(subDays(new Date(), 3), new Date(), { locale: ru })
//=> "в прошлую пятницу в 19:26"
`.trim(),
  },
  {
    label: 'Composition & FP',
    code: `
import { addYears, formatWithOptions } from 'date-fns/fp'
import { eo } from 'date-fns/locale'

const addFiveYears = addYears(5)

const dateToString = formatWithOptions({ locale: eo }, 'D MMMM YYYY')

const dates = [
  new Date(2017, 0, 1),
  new Date(2017, 1, 11),
  new Date(2017, 6, 2)
]

const toUpper = arg => String(arg).toUpperCase()

const formattedDates = dates.map(addFiveYears).map(dateToString).map(toUpper)
//=> ['1 JANUARO 2022', '11 FEBRUARO 2022', '2 JULIO 2022']
`.trim(),
  },
]

const IS_PRERELEASE = false

export const Examples = () => {
  const [currentExampleIndex, setExampleIndex] = useState(0)
  const currentExample = examples[currentExampleIndex]

  return (
    <HomeBlock header="Examples">
      <div class={styles.container}>
        <ul class={styles.options}>
          {examples.map((example, index) => {
            return (
              <li class={styles.option} key={index}>
                <a
                  class={classNames(
                    styles.optionLink,
                    index === currentExampleIndex && styles.optionLinkIsCurrent
                  )}
                  href="#"
                  onClick={(e) => {
                    // TODO: trackAction('Changed Example', { exampleIndex: currentExampleIndex })
                    e.preventDefault()
                    setExampleIndex(index)
                  }}
                >
                  {example.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div class={styles.codeWrapper}>
          <Code value={currentExample.code} />
        </div>
      </div>

      {IS_PRERELEASE && (
        <div class={styles.warning}>
          ⚠️ The provided examples are for v2 which is in pre-release right now.
          If you want to give it a try, install the latest version: npm install
          date-fns@next
        </div>
      )}
    </HomeBlock>
  )
}
