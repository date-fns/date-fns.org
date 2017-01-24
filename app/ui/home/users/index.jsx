import React, {PropTypes} from 'react'
import HomeBlock from '../_lib/block'
import toptalPath from './img/toptal.svg'

export default class Users extends React.Component {
  render () {
    return <HomeBlock header='date-fns Users'>
      <a href='https://www.toptal.com/' className='users-link'>
        <img src={toptalPath} alt='Toptal logotype' />
      </a>
    </HomeBlock>
  }
}
