import React, { PropTypes } from 'react'
import RouterLink from 'app/ui/_lib/link'

export default class HomeBlock extends React.Component {
  static propTypes = {
    header: PropTypes.node,
    subHeader: PropTypes.node,
    children: PropTypes.node.isRequired,
    action: PropTypes.node,
    actionHref: PropTypes.string,
    actionLink: PropTypes.string,
    actionLinkParams: PropTypes.object
  }

  render () {
    const {
      header,
      subHeader,
      action,
      actionHref,
      actionLink,
      actionLinkParams,
      children
    } = this.props

    return (
      <div className='home_block'>
        <div className='home_block-inner'>
          {header &&
            <h2 className='home_block-header'>
              {header}
            </h2>}

          {subHeader &&
            <h3 className='home_block-sub_header'>
              {subHeader}
            </h3>}

          <div className='home_block-content'>
            {children}
          </div>

          {action &&
            actionHref &&
            <a href={actionHref} className='home_block-action'>
              {action}
            </a>}

          {action &&
            actionLink &&
            <RouterLink
              name={actionLink}
              params={actionLinkParams}
              className='home_block-action'
            >
              {action}
            </RouterLink>}
        </div>
      </div>
    )
  }
}

export function Link ({ href, title, children }) {
  return (
    <a href={href} title={title} className='home_block-link'>
      {children}
    </a>
  )
}

export function Text ({ children }) {
  return (
    <div className='home_block-text'>
      {children}
    </div>
  )
}
