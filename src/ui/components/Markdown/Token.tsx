import { h, FunctionComponent } from 'preact'
import { getUrlIdFromText, renderTree } from './utils'
import { MarkdownCode } from 'ui/components/MarkdownCode'
import { RouterLink } from 'ui/router'

type FIXME = any

interface Props {
  token: FIXME
  selectedVersion: string
}

export const Token: FunctionComponent<Props> = ({ token, selectedVersion }) => {
  switch (token.type) {
    case 'tag':
      const extraAttrs: FIXME = {}
      const extraChildren = []

      if (/^h[2-6]$/.test(token.tagName)) {
        let headerLinkId = getUrlIdFromText(token)
        extraAttrs.id = headerLinkId
        extraChildren.push(
          <a
            href={`#${headerLinkId}`}
            className='doc-header_link'
          >
            #
          </a>
        )
      }

      // Replace internal links with Link component
      if (
        token.tagName === 'a' &&
        token.attrs.href.startsWith('https://date-fns.org/docs/')
      ) {
        const doc = token.attrs.href.replace(
          'https://date-fns.org/docs/',
          ''
        )

        // Check for the case if the link is exactly 'https://date-fns.org/docs/'
        if (doc) {
          return (
            <RouterLink
              to={{ name: 'versionDocs', params: { doc, version: selectedVersion } }}
            >
              {renderTree(token.children, selectedVersion)}
            </RouterLink>
          )
        }
      }

      return h(
        token.tagName,
        Object.assign({}, token.attrs, extraAttrs),
        renderTree(token.children, selectedVersion).concat(extraChildren)
      )

    case 'text':
      return token.content

    case 'softbreak':
      return '\n'

    case 'code':
      return (
        <MarkdownCode
          value={token.content.trim()}
          language={token.language}
        />
      )
  }
}