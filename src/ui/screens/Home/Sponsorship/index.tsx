import { h, Fragment, FunctionComponent } from 'preact'
import { HomeBlock, HomeText, HomeExternalLink, HomeButton } from 'ui/components/Home'
import {
  Subheader,
  List,
  Item,
  ItemImageContainer,
  ItemImage,
  ItemImagePlaceholder,
  ItemName,
} from './style.css'
import { useSponsors, Sponsor } from 'utils/useSponsors'

export const Sponsorship = () => {
  const [sponsors, { loading }] = useSponsors()
  return (
    <HomeBlock
      header="Sponsors"
      actions={
        <>
          <HomeButton
            href="https://opencollective.com/date-fns"
            type="primary"
          >
            Sponsor date-fns
          </HomeButton>

          <HomeButton
            href="https://opencollective.com/date-fns#section-contributors"
            type="secondary"
          >
            See all contributors
          </HomeButton>
        </>
      }
    >
      {sponsors && (
        <>
          <Subheader tag="h2">Silver sponsors</Subheader>

          <List>
            {sponsors.silver.map((sponsor) => (
              <Sponsor key={sponsor.id} sponsor={sponsor} tier="silver" />
            ))}
          </List>

          <Subheader tag="h2">Bronze sponsors</Subheader>

          <List>
            {sponsors.bronze.map((sponsor) => (
              <Sponsor key={sponsor.id} sponsor={sponsor} tier="bronze" />
            ))}
          </List>

          <Subheader tag="h2">Backers</Subheader>

          <List>
            {sponsors.backers.map((sponsor) => (
              <Sponsor key={sponsor.id} sponsor={sponsor} compact />
            ))}
          </List>
        </>
      )}

      {loading && <div>Loading...</div>}

      <HomeText>
        Want to become a project sponsor, add your (company) name to the hall of
        fame and support the developers?
      </HomeText>
    </HomeBlock>
  )
}

const Sponsor: FunctionComponent<{
  tier?: 'silver' | 'bronze'
  compact?: boolean
  sponsor: Sponsor
}> = ({ tier, sponsor, compact }) => {
  return (
    <HomeExternalLink
      href={`${sponsor.url}?ref=date-fns`}
      newTab={true}
    >
      <Item>
        <ItemImageContainer tier={tier}>
          {sponsor.imageUrl ? (
            <ItemImage
              tag="img"
              src={sponsor.imageUrl}
              alt={`${sponsor.name} logo`}
            />
          ) : (
            <ItemImagePlaceholder  />
          )}
        </ItemImageContainer>

        {!compact && (
          <ItemName tag="span">{sponsor.name}</ItemName>
        )}
      </Item>
    </HomeExternalLink>
  )
}
