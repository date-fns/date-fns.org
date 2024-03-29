import { SponsorsResponseNode, Sponsor } from './types'

function getProfileURL(node: SponsorsResponseNode) {
  return (
    node.fromAccount.website ??
    `https://opencollective.com/${node.fromAccount.slug}`
  )
}

export function isOneTime(node: SponsorsResponseNode) {
  return node.status === 'PAID'
}

export function isActive(node: SponsorsResponseNode) {
  return node.status === 'ACTIVE'
}

export function isGold(node: SponsorsResponseNode) {
  return (
    (isOneTime(node) && node.amount.value >= 500) ||
    (isActive(node) &&
      (node.tier?.slug === 'gold-sponsors' || node.amount.value >= 500))
  )
}

export function isSilver(node: SponsorsResponseNode) {
  return (
    isActive(node) &&
    (node.tier?.slug === 'silver-sponsors' ||
      (node.amount.value >= 100 && node.amount.value < 500))
  )
}

export function isBronze(node: SponsorsResponseNode) {
  return (
    isActive(node) &&
    (node.tier?.slug === 'bronze-sponsors' ||
      (node.amount.value >= 50 && node.amount.value < 100))
  )
}

export function isBacker(node: SponsorsResponseNode) {
  return (
    isActive(node) &&
    !isSilver(node) &&
    !isBronze(node) &&
    node.amount.value >= 10 &&
    new Date(node.createdAt).getTime() < new Date(2020, 4, 5).getTime()
  )
}

export function sponsorsMapFn(node: SponsorsResponseNode): Sponsor {
  return {
    id: node.fromAccount.slug,
    url: getProfileURL(node),
    imageUrl: node.fromAccount.imageUrl,
    name: node.fromAccount.name,
  }
}

export function sponsorsSortFn(
  nodeA: SponsorsResponseNode,
  nodeB: SponsorsResponseNode
): number {
  return (
    new Date(nodeB.createdAt).getTime() - new Date(nodeA.createdAt).getTime()
  )
}
