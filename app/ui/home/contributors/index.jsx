import React from 'react'
import HomeBlock, {Link} from '../_lib/block'
import {fetchContributors} from 'app/acts/contributors'
import ImmutablePropTypes from 'react-immutable-proptypes'

export default function Contributors ({contributors}) {
  return <HomeBlock header='Contributors'>
    {renderContent(contributors)}
  </HomeBlock>
}

Contributors.propTypes = {
  contributors: React.PropTypes.oneOfType([
    ImmutablePropTypes.list,
    React.PropTypes.instanceOf(Error)
  ])
}

function renderContent (contributors) {
  return contributors.fold(
    ({message}) => message,
    renderList
  )
}

function renderList (contributors) {
  return <ol className='contributors-list'>
    {contributors.map(contributor => <li className='contributors-item' key={contributor.get('login')}>
      <Link href={contributor.get('html_url')} title={contributor.get('contributions')}>
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
