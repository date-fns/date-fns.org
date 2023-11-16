import isArray from 'lodash/isArray'
import { h } from 'preact'
import { HomeAction, HomeBlock, HomeExternalLink } from '~/ui/components/Home'
import { docLink } from '~/ui/router/docLink'
import { useContributors } from '~/utils/useContributors'
import * as styles from './styles.css'

export const Contributors = () => {
  const [contributors, { loading }] = useContributors()

  return (
    <HomeBlock
      header="Contributors"
      actions={
        <HomeAction to={docLink({ page: 'Contributing' })}>
          Contribute to date-fns
        </HomeAction>
      }
    >
      {loading && <div>Loading...</div>}
      {contributors && isArray(contributors) && (
        <ol class={styles.list}>
          {contributors.map((contributor) => (
            <li class={styles.item} key={contributor.name}>
              <HomeExternalLink href={contributor.url}>
                <span class={styles.linkContent}>
                  <img
                    class={styles.avatar}
                    src={contributor.avatarUrl}
                    alt={`@${contributor.name}'s avatar`}
                  />
                  <span class={styles.name}>@{contributor.name}</span>
                </span>
              </HomeExternalLink>
            </li>
          ))}
        </ol>
      )}
    </HomeBlock>
  )
}
