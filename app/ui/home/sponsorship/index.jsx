import React, {PropTypes} from 'react'

export default class Sponsorship extends React.Component {
  render () {
    return <div className='sponsorship'>
      <h2 className='sponsorship-header'>
        Sponsorship
      </h2>

      <div className='sponsorship-letter'>
        Want to become a project sponsor, add your (company) name to the hall of fame
        and support developers?
      </div>

      <a href='#' className='sponsorship-cta'>
        Sponsor date-fns
      </a>
    </div>
  }
}
