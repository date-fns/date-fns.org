import React, {Component} from 'react'
import classnames from 'classnames'
import Code from 'app/ui/_lib/code'
import Link from 'app/ui/_lib/link'
import {trackAction} from 'app/acts/tracking_acts'
import I from 'immutable'
import {VersionPropType} from 'app/types/version'
import {EitherPropType} from 'app/types/either'

const examples = [
  {
    label: 'Format date',
    example:
`
import {format, formatDistance, formatRelative, subDays} from 'date-fns/esm'

format(new Date(), '[Today is a] dddd')
//=> "Today is a ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()]}"

formatDistance(subDays(new Date(), 3), new Date())
//=> "3 days ago"

formatRelative(subDays(new Date(), 3), new Date())
//=> "last Friday at 7:26 p.m."
`.trim()
  },
  {
    label: 'I18n',
    example:
`
import {formatRelative, subDays, es} from 'date-fns/esm'
import {es, ru} from 'date-fns/esm/locale'

formatRelative(subDays(new Date(), 3), new Date())
//=> "last Friday at 7:26 p.m."

formatRelative(subDays(new Date(), 3), new Date(), {locale: es})
//=> "el viernes pasado a las 19:26"

formatRelative(subDays(new Date(), 3), new Date(), {locale: ru})
//=> "в прошлую пятницу в 19:56"
`.trim()
  },
  {
    label: 'Composition & FP',
    example:
`
import {addYears, formatWithOptions} from 'date-fns/esm/fp'
import {eo} from 'date-fns/locale'
import toUpper from 'lodash/fp/toUpper'

const addFiveYears = addYears(5)

const dateToString = formatWithOptions({locale: eo}, 'D MMMM YYYY')

const dates = [
  new Date(2017, 0, 1),
  new Date(2017, 1, 11),
  new Date(2017, 6, 2)
]

const formattedDates = dates.map(addFiveYears).map(dateToString).map(toUpper)
//=> ['1 JANUARO 2022', '11 FEBRUARO 2022', '2 JULIO 2022']
`.trim()
  }
]

export default class GettingStarted extends Component {
  render () {
    return <div className='getting_started'>
      <div className='getting_started-install'>
        <h2>Getting Started</h2>
        <Code value={'npm install date-fns --save'} options={{theme: 'wormhole', readOnly: true}} />
      </div>

      <div className='getting_started-install'>
        <h2>Examples</h2>
        <nav>
          {examples.map(({label}) => <a href='#' key={label}>{label}</a>)}
        </nav>
        <Code value={examples[2].example} options={{theme: 'wormhole', readOnly: true}} />
      </div>

      <div className='getting_started-link_wrapper'>
        <Link
          name='doc'
          params={{docId: 'Getting-Started'}}
          className='getting_started-link'
        >
          Documentation
        </Link>
      </div>
    </div>
  }
}

//export default class  extends React.Component {
  //static propTypes = {
    //version: EitherPropType(React.PropTypes.object, VersionPropType.isRequired).isRequired
  //}

  //state = {
    //source: 'npm'
  //}

  //componentWillReceiveProps ({version}) {
    //version.map(({gettingStartedTabs}) => {
      //if (!gettingStartedTabs.includes(this.state.source)) {
        //this._resetSource(gettingStartedTabs)
      //}
    //})
  //}

  //render () {
  //}

  //_renderContent (version) {
    //return version.fold(
      //({message}) => message,
      //({tag, gettingStarted, gettingStartedTabs}) => <div>
        //<ul className='getting_started-options'>
          //{
            //gettingStartedTabs.map((tab) => {
              //return <li className='getting_started-option' key={tab}>
                //<a
                  //href='#'
                  //onClick={this._changeSource.bind(this, tab)}
                  //className={classnames('getting_started-option_link', {
                    //'is-current': this.state.source === tab
                  //})}
                //>
                  //{gettingStarted.getIn([tab, 'title'])}
                //</a>
              //</li>
            //})
          //}
        //</ul>

        //{this._renderInstruction(gettingStarted)}
      //</div>
    //)
  //}

  //_renderInstruction (gettingStarted) {
    //const currentGettingStarted = gettingStarted.get(this.state.source, I.Map())

    //const link = currentGettingStarted.get('link')

    //return <div className='getting_started-instruction'>
      //<h4 className='getting_started-instruction_header'>
        //Installation
      //</h4>
      //<Code value={currentGettingStarted.get('install')} options={{theme: 'wormhole', readOnly: true}} />

      //<h4 className='getting_started-instruction_header'>
        //Example
      //</h4>
      //<div id='qa-npm'>
      //</div>

      //<div>
        //{this._renderDownloadLink(link)}
      //</div>
    //</div>
  //}

  //_renderDownloadLink (link) {
    //if (link) {
      //return <a href={link} className='getting_started-download' target='_blank'>
        //Download Library
      //</a>
    //} else {
      //return null
    //}
  //}

  //_resetSource (gettingStartedTabs) {
    //this.state = {
      //source: gettingStartedTabs.first()
    //}
  //}

  //_changeSource (source, e) {
    //trackAction('Changed Installation Source', {source})
    //e.preventDefault()
    //this.setState({source})
  //}
//}
