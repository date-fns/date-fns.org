import { h } from 'preact'
import { AnyNode } from '~/utils/remarkableTree'
import { Node } from './Node'

export function renderTree(nodes: AnyNode[], selectedVersion: string) {
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
    return node.children.reduce((acc, node) => {
      if (node.type === 'text') {
        return acc.concat(node.content)
      } else if (node.type === 'tag') {
        return acc.concat(node.children.map((node) => getUrlIdFromText(node)))
      } else {
        return acc
      }
    }, [] as string[])
  } else {
    return []
  }
}
