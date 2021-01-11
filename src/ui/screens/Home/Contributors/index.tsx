import { h } from 'preact'
import { HomeBlock, HomeAction, HomeExternalLink } from '~/ui/components/Home'
import { List, Item, LinkContent, Avatar, Name } from './style.css'
import { useContributors } from '~/utils/useContributors'
import { docLink } from '~/ui/router/docLink'
import { DEFAULT_SUBMODULE } from '@date-fns/date-fns-db'

export const Contributors = () => {
  const [contributors, { loading }] = useContributors()

  return (
    <HomeBlock
      header="Contributors"
      actions={
        <HomeAction to={docLink('Contributing', DEFAULT_SUBMODULE)}>
          Contribute to date-fns
        </HomeAction>
      }
    >
      {loading && <div>Loading...</div>}
      {contributors && (
        <List tag="ol">
          {contributors.map((contributor) => (
            <Item tag="li" key={contributor.name}>
              <HomeExternalLink href={contributor.url}>
                <LinkContent tag="span">
                  <Avatar
                    tag="img"
                    src={contributor.avatarUrl}
                    alt={`@${contributor.name}'s avatar`}
                  />
                  <Name tag="span">@{contributor.name}</Name>
                </LinkContent>
              </HomeExternalLink>
            </Item>
          ))}
        </List>
      )}
    </HomeBlock>
  )
}
