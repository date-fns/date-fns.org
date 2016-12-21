import React, {PropTypes} from 'react'
import {fetchContributors} from 'app/acts/contributors'

export default class Contributors extends React.Component {
  static propTypes = {
    contributors: PropTypes.object
  }

  componentWillMount () {
    fetchContributors()
  }

  render () {
    return <div className='contributors'>
      <h2 className='contributors-header'>
        Contributors
      </h2>

      {this._renderContent()}
    </div>
  }

  _renderContent () {
    const {contributors} = this.props
    if (contributors) {
      if (contributors instanceof Error) {
        return contributors.message
      } else {
        return this._renderList()
      }
    } else {
      return 'Loading'
    }
  }

  _renderList () {
    const {contributors} = this.props
    return <ol className='contributors-list'>
      {contributors.map(contributor => <li className='contributors-item' key={contributor.get('login')}>
        <a className='contributors-item_link' href={contributor.get('url')} title={contributor.get('contributions')}>
          <img className='contributors-avatar' src={contributor.get('avatar_url')} alt={`@${contributor.get('login')}'s avatar`} />
          <span className='contributors-name'>
            @{contributor.get('login')}
          </span>
        </a>
      </li>)}
    </ol>
  }
}
