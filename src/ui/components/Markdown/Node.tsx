import { h, FunctionComponent, Fragment } from 'preact'
import { getUrlIdFromText, renderTree } from './utils'
import { MarkdownCode } from '~/ui/components/MarkdownCode'
import { RouterLink } from '~/ui/router'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { AnyNode } from '~/utils/remarkableTree'

interface Props {
  node: AnyNode
  selectedVersion: string
}

export const Node: FunctionComponent<Props> = ({ node, selectedVersion }) => {
  switch (node.type) {
    case 'tag':
      const extraAttrs: { id?: string } = {}
      const extraChildren = []

      if (/^h[2-6]$/.test(node.tagName)) {
        let headerLinkId = getUrlIdFromText(node)
        extraAttrs.id = headerLinkId
        extraChildren.push(<DocHeaderAnchor anchor={headerLinkId} />)
      }

      // Replace internal links with Link component
      if (
        node.tagName === 'a' &&
        node.attrs.href?.startsWith('https://date-fns.org/docs/')
      ) {
        const doc = node.attrs.href.replace('https://date-fns.org/docs/', '')

        // Check for the case if the link is exactly 'https://date-fns.org/docs/'
        if (doc) {
          return (
            <RouterLink
              to={{
                name: 'versionDocs',
                params: { doc, version: selectedVersion },
              }}
            >
              {renderTree(node.children, selectedVersion)}
            </RouterLink>
          )
        }
      }

      return h(
        node.tagName,
        Object.assign({}, node.attrs, extraAttrs),
        renderTree(node.children, selectedVersion).concat(extraChildren)
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
