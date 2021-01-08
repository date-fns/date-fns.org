import { h } from 'preact'
import { AnyNode } from '~/utils/remarkableTree'
import { Node } from './Node'

export function renderTree(nodes: AnyNode[], selectedVersion?: string) {
  return nodes.map((node, index) => (
    <Node node={node} selectedVersion={selectedVersion} key={index} />
  ))
}

export function getUrlIdFromText(node: AnyNode) {
  return getTextFromToken(node)
    .join(' ')
    .toLowerCase()
    .replace(/[^\w\d.]/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function getTextFromToken(node: AnyNode): string[] {
  if (node.type === 'text') {
    return [node.content]
  } else if (node.type === 'tag' && node.children) {
    return node.children.reduce((acc, childNode) => {
      if (childNode.type === 'text') {
        return acc.concat(childNode.content)
      } else if (childNode.type === 'tag') {
        return acc.concat(
          childNode.children.map((grandChildNode) =>
            getUrlIdFromText(grandChildNode)
          )
        )
      } else {
        return acc
      }
    }, [] as string[])
  } else {
    return []
  }
}
