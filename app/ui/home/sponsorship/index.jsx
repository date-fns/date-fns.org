import React from 'react'
import HomeBlock, { Text } from '../_lib/block'
import codePilotPath from './img/codepilot.svg'

export default function Sponsorship() {
  return (
    <HomeBlock header="Sponsors">
      <div className="sponsorship-list">
        <a
          href="https://codepilot.ai/?ref=date-fns"
          target="_blank"
          rel="noopener noreferrer"
          className="sponsorship-item"
        >
          <img src={codePilotPath} />
        </a>
      </div>

      <Text>
        Want to become a project sponsor, add your (company) name to the hall of
        fame and support the developers?
      </Text>

      <a
        href="https://opencollective.com/date-fns"
        className="sponsorship-cta"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sponsor date-fns
      </a>
    </HomeBlock>
  )
}
