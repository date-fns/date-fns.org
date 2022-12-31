import { h, FunctionComponent, Fragment } from 'preact'
import type { DateFnsDocs } from '@date-fns/docs/types'
import { RouterLink } from '~/ui/router'
import { Item, ItemHeader, ItemText, ItemIcon } from './style.css'
import { docLink } from '~/ui/router/docLink'

interface Props {
  pages: DateFnsDocs.PagePreview[]
  selectedVersion: string
  selectedSubmodule: DateFnsDocs.Submodule
  selectedPage: string
  onNavigate(): void
}

export const Items: FunctionComponent<Props> = ({
  pages,
  selectedVersion,
  selectedSubmodule,
  selectedPage,
  onNavigate,
}) => (
  <>
    {pages.map((page) => (
      <Item
        key={page.slug}
        tag={RouterLink}
        to={docLink({
          page: page.slug,
          submodule: selectedSubmodule,
          version: selectedVersion,
        })}
        isSelected={selectedPage === page.slug}
        onClick={onNavigate}
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
