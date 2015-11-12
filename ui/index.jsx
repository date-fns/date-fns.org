require.context('!!static-file!./static', true, /.+/)

import React from 'react'
import Promo from 'app/ui/promo'
import classnames from 'classnames'
import Features from 'app/ui/features'
import Docs from 'app/ui/docs'
import Doc from 'app/ui/doc'

export default class Ui extends React.Component {
  static propTypes = {
    routeData: React.PropTypes.object
  }

  render() {
    const isCollapsed = this.props.routeData.route.name != 'home'
    const className = classnames('ui', {
      'is-collapsed': isCollapsed,
      'not-collapsed': !isCollapsed
    })

    return <div className={className}>
      <div className='ui-promo'>
        <Promo />
      </div>

      <div className='ui-features'>
        <Features />
      </div>

      <div className='ui-docs'>
        <Docs
          showLogo={isCollapsed}
          currentDocId={this._currentDocId()}
        />
      </div>

      <div className='ui-doc'>
        <Doc docId={this._currentDocId()} />
      </div>
    </div>
  }

  _currentDocId() {
    return this.props.routeData.params.docId
  }
}
