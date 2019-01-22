import React from 'react'
import HomeBlock, { Link, Text } from '../_lib/block'
import members from './members.json'

const bronzeSponsors = members.filter(({ tier }) => tier === 'Bronze Sponsors')
const backers = members.filter(({ tier }) => tier === 'Backers')

export default function Sponsorship() {
  return (
    <HomeBlock header="Sponsors">
      <div className="sponsorship-list">
        {bronzeSponsors.map(sponsor => (
          <Sponsor key={sponsor.MemberId} sponsor={sponsor} />
        ))}
      </div>

      <h2 className="sponsorship-subheader">Backers</h2>

      <div className="sponsorship-list">
        {backers.map(sponsor => (
          <Sponsor key={sponsor.MemberId} sponsor={sponsor} />
        ))}
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

function Sponsor ({ sponsor }) {
  return <Link
    href={`${sponsor.website || sponsor.profile}?ref=date-fns`}
    newTab={true}
  >
    <div className="sponsorship-item">
      <div className={`sponsorship-item-image-container ${sponsor.tier === 'Bronze Sponsors' ? 'sponsorship-item-image-container-bronze' : ''}`}>
        {sponsor.image
          ? (
            <img
              src={sponsor.image}
              alt={`${sponsor.name} logo`}
              className="sponsorship-item-image"
            />
          ) : (<div className="sponsorship-item-image-default"/>)}
      </div>
      <span className="sponsorship-item-name">
        {sponsor.name}
      </span>
    </div>
  </Link>
}
