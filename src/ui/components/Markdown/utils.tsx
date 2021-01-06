import { h } from 'preact'
import { Token } from './Token'

type FIXME = any

export function renderTree (tokens: FIXME[], selectedVersion: string) {
  return tokens.map((token, index) => <Token token={token} selectedVersion={selectedVersion} key={index} />)
}

export function getUrlIdFromText (token: FIXME) {
  return getTextFromToken(token)
    .join(' ')
    .toLowerCase()
    .replace(/[^\w\d.]/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function getTextFromToken (token: FIXME) {
  if (token.type === 'text') {
    return [token.content]
  } else {
    return token.children.reduce((acc: FIXME, token: FIXME) => {
      if (token.type === 'text') {
        return acc.concat(token.content)
      } else {
        return acc.concat(
          token.children.map((token: FIXME) => getUrlIdFromText(token))
        )
      }
    }, [])
  }
}
