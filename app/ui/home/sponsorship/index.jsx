import React, {PropTypes} from 'react'
import HomeBlock from '../_lib/block'

export default class Sponsorship extends React.Component {
  render () {
    return <HomeBlock header='Sponsorship'>
      <div className='sponsorship-letter'>
        Want to become a project sponsor, add your (company) name to the hall of fame
        and support developers?
      </div>

      <a href='#' className='sponsorship-cta'>
        Sponsor date-fns
      </a>
    </HomeBlock>
  }
}
