import React, {PropTypes} from 'react'
import flag from 'emoji-flag'
import random from 'lodash/number/random'

export default class FlagSpinner extends React.Component {
  static propTypes = {
    countries: PropTypes.object.isRequired,
  }

  componentWillMount () {
    this._shuffle()
    this._timer = setInterval(this._shuffle.bind(this), 600)
  }

  componentWillUnmount () {
    clearInterval(this._timer)
  }

  render () {
    return <span>
      {flag(this.props.countries.toList().get(this.state.index))}
    </span>
  }

  _shuffle () {
    this.setState({index: random(0, this.props.countries.count() - 1)})
  }
}
