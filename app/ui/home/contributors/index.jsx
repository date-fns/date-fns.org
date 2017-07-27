import React from 'react'
import HomeBlock, { Link } from '../_lib/block'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { EitherPropType } from 'app/types/either'

export default function Contributors ({ contributors }) {
  return (
    <HomeBlock
      header='Contributors'
      action='Contribute to date-fns'
      actionLink='doc'
      actionLinkParams={{ docId: 'Contributing' }}
    >
      {renderContent(contributors)}
    </HomeBlock>
  )
}

Contributors.propTypes = {
  contributors: EitherPropType(
    React.PropTypes.object,
    ImmutablePropTypes.list.isRequired
  ).isRequired
}

function renderContent (contributors) {
  return contributors.fold(({ message }) => message, renderList)
}

function renderList (contributors) {
  return (
    <ol className='contributors-list'>
      {contributors.map(contributor =>
        <li className='contributors-item' key={contributor.get('login')}>
          <Link
            href={contributor.get('html_url')}
            title={contributor.get('contributions')}
          >
            <span className='contributors-link_content'>
              <img
                className='contributors-avatar'
                src={contributor.get('avatar_url')}
                alt={`@${contributor.get('login')}'s avatar`}
              />
              <span className='contributors-name'>
                @{contributor.get('login')}
              </span>
            </span>
          </Link>
        </li>
      )}
    </ol>
  )
}
