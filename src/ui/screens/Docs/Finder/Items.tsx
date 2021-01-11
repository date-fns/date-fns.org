import { h, FunctionComponent, Fragment } from 'preact'
import { PagePreview, Submodule } from '@date-fns/date-fns-db'
import { RouterLink } from '~/ui/router'
import { Item, ItemHeader, ItemText, ItemIcon } from './style.css'
import { docLink } from '~/ui/router/docLink'

interface Props {
  pages: PagePreview[]
  selectedVersion: string
  selectedSubmodule: Submodule
  selectedDoc: string
}

export const Items: FunctionComponent<Props> = ({
  pages,
  selectedVersion,
  selectedSubmodule,
  selectedDoc,
}) => (
  <>
    {pages.map((page) => (
      <Item
        key={page.slug}
        tag={RouterLink}
        to={docLink(page.slug, selectedSubmodule, selectedVersion)}
        isSelected={selectedDoc === page.slug}
      >
        <div>
          <ItemHeader tag="h4">{page.title}</ItemHeader>
          <ItemText tag="p">{page.summary}</ItemText>
        </div>

        <ItemIcon />
      </Item>
    ))}
  </>
)
