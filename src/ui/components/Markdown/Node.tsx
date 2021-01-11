import { h, FunctionComponent, Fragment } from 'preact'
import { getUrlIdFromText, renderTree } from './utils'
import { MarkdownCode } from '~/ui/components/MarkdownCode'
import { RouterLink } from '~/ui/router'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { AnyNode } from '~/utils/remarkableTree'
import { DEFAULT_SUBMODULE, Submodule } from '@date-fns/date-fns-db'
import { docLink } from '~/ui/router/docLink'
import { useContext } from 'preact/hooks'
import { DocLinkContext } from '~/ui/router/DocLinkContext'

interface Props {
  node: AnyNode
}

export const Node: FunctionComponent<Props> = ({ node }) => {
  const docLinkParams = useContext(DocLinkContext)

  switch (node.type) {
    case 'tag':
      const extraAttrs: { id?: string } = {}
      const extraChildren = []

      if (/^h[2-6]$/.test(node.tagName)) {
        const headerLinkId = getUrlIdFromText(node)
        extraAttrs.id = headerLinkId
        extraChildren.push(<DocHeaderAnchor anchor={headerLinkId} />)
      }

      // Replace internal links with Link component
      if (
        node.tagName === 'a' &&
        node.attrs.href?.startsWith('https://date-fns.org/docs/')
      ) {
        const page = node.attrs.href.replace('https://date-fns.org/docs/', '')

        // Check for the case if the link is exactly 'https://date-fns.org/docs/'
        if (page) {
          return (
            <RouterLink to={docLink({ ...docLinkParams, page })}>
              {renderTree(node.children)}
            </RouterLink>
          )
        }
      }

      return h(
        node.tagName,
        Object.assign({}, node.attrs, extraAttrs),
        renderTree(node.children).concat(extraChildren)
      )

    case 'text':
      return <>{node.content}</> ?? null

    case 'softbreak':
      return <>{'\n'}</>

    case 'code':
      return (
        <MarkdownCode value={node.content.trim()} language={node.language} />
      )
  }
}
