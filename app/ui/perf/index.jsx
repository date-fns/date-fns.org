import React from 'react'
import perfStats from '../../../performance-stats.json'
import max from 'lodash/math/max'

export default class Perf extends React.Component {
  static propTypes = {
    state: React.PropTypes.object
  }

  state = { currentIndex: null }

  render () {
    return (
      <div className='perf'>
        <div>
          {perfStats.map((build, index) =>
            <button
              type='button'
              onClick={this._switchTo.bind(this, index)}
              key={index}
            >
              {build.buildNumber}
            </button>
          )}
        </div>
        <div>
          {this._renderChart()}
        </div>
      </div>
    )
  }

  _renderChart () {
    const { stats } = perfStats[this._currentIndex()]
    const fns = Object.keys(stats)
    const biggestNumber = this._biggestNumber()
    return fns.map(fn => {
      const fnStats = stats[fn]
      const [dateFns, moment] = [fnStats['date-fns'], fnStats['Moment.js']]
      return (
        <div className='perf-row' key={fn}>
          <div className='perf-fn'>
            {fn}
          </div>
          <div className='perf-bars'>
            <div
              className='perf-bar is-date_fns'
              style={{ width: `${dateFns / biggestNumber * 100}%` }}
            >
              {dateFns} ops/sec
            </div>
            {(typeof moment === 'number' &&
              <div
                className='perf-bar is-moment'
                style={{ width: `${moment / biggestNumber * 100}%` }}
              />) ||
              null}
          </div>
        </div>
      )
    })
  }

  _switchTo (e, currentIndex) {
    this.setState({ currentIndex })
  }

  _biggestNumber () {
    const { stats } = perfStats[this._currentIndex()]
    const fns = Object.keys(stats)
    return fns.reduce((acc, fn) => max(Object.values(stats[fn]).concat(acc)))
  }

  _currentIndex () {
    const { currentIndex } = this.state
    return currentIndex === null ? perfStats.length - 1 : currentIndex
  }
}
