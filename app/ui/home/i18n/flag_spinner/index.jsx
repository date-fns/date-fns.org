import React from 'react'
import flag from 'emoji-flag'
import random from 'lodash/number/random'
import ImmutablePropTypes from 'react-immutable-proptypes'

export default class FlagSpinner extends React.Component {
  static propTypes = {
    countries: ImmutablePropTypes.set
  }

  componentWillMount () {
    this._shuffle()
    this._timer = setInterval(this._shuffle.bind(this), 600)
  }

  componentWillUnmount () {
    clearInterval(this._timer)
  }

  render () {
    return (
      <span>
        {flag(this.props.countries.toList().get(this.state.index))}
      </span>
    )
  }

  _shuffle () {
    this.setState({ index: random(0, this.props.countries.count() - 1) })
  }
}
