import React from 'react'
import HomeBlock, {Link} from '../_lib/block'
import {fetchContributors} from 'app/acts/contributors'
import ImmutablePropTypes from 'react-immutable-proptypes'

export default class Contributors extends React.Component {
  static propTypes = {
    contributors: React.PropTypes.oneOfType([
      ImmutablePropTypes.list,
      React.PropTypes.instanceOf(Error)
    ])
  }

  componentWillMount () {
    fetchContributors()
  }

  render () {
    return <HomeBlock header='Contributors'>
      {this._renderContent()}
    </HomeBlock>
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
        <Link href={contributor.get('url')} title={contributor.get('contributions')}>
          <span className='contributors-link_content'>
            <img className='contributors-avatar' src={contributor.get('avatar_url')} alt={`@${contributor.get('login')}'s avatar`} />
            <span className='contributors-name'>
              @{contributor.get('login')}
            </span>
          </span>
        </Link>
      </li>)}
    </ol>
  }
}
