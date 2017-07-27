import React from 'react'
import HomeBlock, { Text } from '../_lib/block'

export default function Sponsorship () {
  return (
    <HomeBlock header='Sponsorship'>
      <Text>
        Want to become a project sponsor, add your (company) name to the hall of
        fame and support the developers?
      </Text>

      <a href='mailto:kossnocorp@gmail.com' className='sponsorship-cta'>
        Sponsor date-fns
      </a>
    </HomeBlock>
  )
}
