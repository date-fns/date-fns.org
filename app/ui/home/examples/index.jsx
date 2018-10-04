import React from 'react'
import Code from 'app/ui/_lib/code'
import HomeBlock from 'app/ui/home/_lib/block'
import { trackAction } from 'app/acts/tracking_acts'
import classnames from 'classnames'

// TODO: Generate example results with date-fns v2
const examples = [
  {
    label: 'Format date',
    code: `
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

format(new Date(), '[Today is a] dddd')
//=> "Today is a ${
      [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ][new Date().getDay()]
    }"

formatDistance(subDays(new Date(), 3), new Date())
//=> "3 days ago"

formatRelative(subDays(new Date(), 3), new Date())
//=> "last Friday at 7:26 p.m."
`.trim()
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
`.trim()
  },
  {
    label: 'Composition & FP',
    code: `
import { addYears, formatWithOptions, toUpper } from 'date-fns/fp'
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
`.trim()
  }
]

export default class Examples extends React.Component {
  state = {
    exampleIndex: 0
  }

  render() {
    const { exampleIndex } = this.state
    const currentExample = examples[exampleIndex]

    return (
      <HomeBlock header="Examples">
        <div className="examples">
          <ul className="examples-options">
            {examples.map((example, index) => {
              return (
                <li className="examples-option" key={index}>
                  <a
                    href="#"
                    onClick={this._changeExampleIndex.bind(this, index)}
                    className={classnames('examples-option_link', {
                      'is-current': index === exampleIndex
                    })}
                  >
                    {example.label}
                  </a>
                </li>
              )
            })}
          </ul>

          {this._renderExample(currentExample)}
        </div>

        <div className="examples-warning">
          ⚠️ The provided examples are for v2 which is in pre-release right now.
          If you want to give it a try, install the latest version: npm install
          date-fns@next
        </div>
      </HomeBlock>
    )
  }

  _renderExample(example) {
    return (
      <div className="examples-code_wrapper">
        <Code value={example.code} options={{ readOnly: true }} />
      </div>
    )
  }

  _changeExampleIndex(exampleIndex, e) {
    trackAction('Changed Example', { exampleIndex })
    e.preventDefault()
    this.setState({ exampleIndex })
  }
}
