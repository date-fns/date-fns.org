import React from 'react'
import HomeBlock, {Text} from '../_lib/block'
import avatarURL from './img/avatar.jpg'

export default function HireLesha () {
  return <HomeBlock header='Hire Lesha!'>
    <Text>
      <img src={avatarURL} className='hire_lesha-avatar'/>

      <p>
        Want to see one of the date-fns authors in your team?
        <br />
        Lesha Koss is looking for JavaScript job, so it's your chance 😎
      </p>
    </Text>

    <a href='mailto:regiusprod@gmail.com' className='sponsorship-cta'>
      Contact Lesha
    </a>
  </HomeBlock>
}
