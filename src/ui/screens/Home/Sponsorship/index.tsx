import { h, Fragment, FunctionComponent } from 'preact'
import {
  HomeBlock,
  HomeText,
  HomeExternalLink,
  HomeButton,
} from '~/ui/components/Home'
import { useSponsors, Sponsor } from '~/utils/useSponsors'
import * as styles from './styles.css'
import classNames from 'classnames'

export const Sponsorship = () => {
  const [sponsors, { loading }] = useSponsors()
  return (
    <HomeBlock
      header="Sponsors"
      actions={
        <>
          <HomeButton href="https://opencollective.com/date-fns" type="primary">
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
          <h2 class={styles.subheader}>Gold Sponsors</h2>

          <div class={styles.list}>
            {sponsors.gold.map((sponsor) => (
              <Sponsor key={sponsor.id} sponsor={sponsor} tier="gold" />
            ))}
          </div>

          <h2 class={styles.subheader}>Silver Sponsors</h2>

          <div class={styles.list}>
            {sponsors.silver.map((sponsor) => (
              <Sponsor key={sponsor.id} sponsor={sponsor} tier="silver" />
            ))}
          </div>

          <h2 class={styles.subheader}>Bronze Sponsors</h2>

          <div class={styles.list}>
            {sponsors.bronze.map((sponsor) => (
              <Sponsor key={sponsor.id} sponsor={sponsor} tier="bronze" />
            ))}
          </div>

          <h2 class={styles.subheader}>Backers</h2>

          <div class={styles.list}>
            {sponsors.backers.map((sponsor) => (
              <Sponsor key={sponsor.id} sponsor={sponsor} compact />
            ))}
          </div>
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
  tier?: keyof typeof styles.tier
  compact?: boolean
  sponsor: Sponsor
}> = ({ tier, sponsor, compact }) => {
  return (
    <HomeExternalLink href={sponsor.url} newTab={true}>
      <div class={styles.item}>
        <div
          class={classNames(
            styles.itemImageContainer,
            tier && styles.tier[tier]
          )}
        >
          {sponsor.imageUrl ? (
            <img
              class={styles.itemImage}
              src={sponsor.imageUrl}
              alt={`${sponsor.name} logo`}
            />
          ) : (
            <div class={styles.itemImagePlaceholder} />
          )}
        </div>

        {!compact && <span class={styles.itemName}>{sponsor.name}</span>}
      </div>
    </HomeExternalLink>
  )
}
