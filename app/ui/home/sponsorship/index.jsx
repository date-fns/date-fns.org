import React from 'react'
import HomeBlock, { Link, Text } from '../_lib/block'
import members from './members.json'

const silverSponsors = members.filter(
  ({ tier, isActive, lastTransactionAmount }) =>
    isActive && (tier === 'Silver Sponsors' || lastTransactionAmount >= 100)
)
const bronzeSponsors = members.filter(
  ({ tier, isActive }) =>
    isActive &&
    (tier === 'Bronze Sponsors' ||
      (lastTransactionAmount >= 50 && lastTransactionAmount < 100))
)
const backers = members.filter(
  ({ tier, lastTransactionAmount, createdAt, isActive }) =>
    isActive &&
    tier === 'Backers' &&
    lastTransactionAmount >= 10 &&
    new Date(createdAt).getTime() < new Date(2020, 4, 5).getTime()
)

export default function Sponsorship() {
  return (
    <HomeBlock header="Sponsors">
      <h2 className="sponsorship-subheader">Silver sponsors</h2>

      <div className="sponsorship-list">
        {silverSponsors.map((sponsor) => (
          <Sponsor key={sponsor.MemberId} sponsor={sponsor} />
        ))}
      </div>

      <h2 className="sponsorship-subheader">Bronze sponsors</h2>

      <div className="sponsorship-list">
        {bronzeSponsors.map((sponsor) => (
          <Sponsor key={sponsor.MemberId} sponsor={sponsor} />
        ))}
      </div>

      <h2 className="sponsorship-subheader">Backers</h2>

      <div className="sponsorship-list">
        {backers.map((sponsor) => (
          <Sponsor key={sponsor.MemberId} sponsor={sponsor} compact />
        ))}
      </div>

      <Text>
        Want to become a project sponsor, add your (company) name to the hall of
        fame and support the developers?
      </Text>

      <div className="sponsorship-actions">
        <a
          href="https://opencollective.com/date-fns"
          className="sponsorship-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sponsor date-fns
        </a>

        <a
          href="https://opencollective.com/date-fns#section-contributors"
          className="sponsorship-contributors"
          target="_blank"
          rel="noopener noreferrer"
        >
          See all contributors
        </a>
      </div>
    </HomeBlock>
  )
}

function Sponsor({ sponsor, compact }) {
  return (
    <Link
      href={`${sponsor.website || sponsor.profile}?ref=date-fns`}
      newTab={true}
    >
      <div className="sponsorship-item">
        <div
          className={`sponsorship-item-image-container ${
            sponsor.tier === 'Silver Sponsors'
              ? 'sponsorship-item-image-container-silver'
              : sponsor.tier === 'Bronze Sponsors'
              ? 'sponsorship-item-image-container-bronze'
              : ''
          }`}
        >
          {sponsor.image ? (
            <img
              src={sponsor.image}
              alt={`${sponsor.name} logo`}
              className="sponsorship-item-image"
            />
          ) : (
            <div className="sponsorship-item-image-default" />
          )}
        </div>

        {!compact && (
          <span className="sponsorship-item-name">{sponsor.name}</span>
        )}
      </div>
    </Link>
  )
}
