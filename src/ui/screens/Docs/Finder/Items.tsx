import { h, FunctionComponent, Fragment } from 'preact'
import { PagePreview } from 'db'
import { RouterLink } from 'ui/router'
import { Item, ItemHeader, ItemText, ItemIcon } from './style.css'

interface Props {
  pages: PagePreview[]
  selectedVersion: string
  selectedDoc: string
}

export const Items: FunctionComponent<Props> = ({ pages, selectedVersion, selectedDoc }) => (
  <>
    {pages.map(page => (
      <Item
        key={page.slug}
        tag={RouterLink}
        to={{ name: 'versionDocs', params: { doc: page.slug, version: selectedVersion } }}
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
