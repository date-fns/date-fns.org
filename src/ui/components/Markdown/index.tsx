import { h, FunctionComponent } from 'preact'
import { Remarkable } from 'remarkable'
import { remarkableTree } from '~/utils/remarkableTree'
import { renderTree } from './utils'

const md = new Remarkable({
  linkify: true,
})

interface Props {
  value: string
  selectedVersion: string
}

export const Markdown: FunctionComponent<Props> = ({
  value,
  selectedVersion,
}) => {
  // Replace JSDoc-style links with markdown links
  const valueWithFixedLinks = value
    ? value.replace(/\[([^\]]+)\]{@link ([^}]+)}/g, '[$1]($2)')
    : ''

  const tree = remarkableTree(md.parse(valueWithFixedLinks, {}))
  const result = renderTree(tree, selectedVersion)

  // Render single node as is
  if (result.length === 1) {
    return result[0]
    // Then there are more than one node, wrap into div
  } else {
    return <div>{result}</div>
  }
}
