import { BlockContentToken, CodeToken, FenceToken, ImageToken, TextToken, Token } from 'remarkable/lib'
import { AnyNode, text, tag, softbreak, code, tagName, attrs } from './utils'

export { AnyNode }

export function remarkableTree (tokens: Token[]) {
  var tree: AnyNode[] = []
  var pos = 0
  while (pos < tokens.length) {
    let token = tokens[pos]

    // Process tag token
    if (isOpeningTagToken(token)) {
      let closingPos = getClosingPosFor(tokens, pos)
      tree.push(
        tag(
          tagName(token),
          attrs(token),
          getTagChildren(tokens, pos, closingPos)
        )
      )
      pos = closingPos + 1

      // Process "inline" token
    } else if (token.type === 'inline') {
      tree = tree.concat(remarkableTree((token as BlockContentToken).children ?? []))
      pos++

      // Process text token
    } else if (token.type === 'text') {
      tree.push(text((token as TextToken).content ?? ''))
      pos++

      // Process softbreak token
    } else if (token.type === 'softbreak') {
      tree.push(softbreak())
      pos++

      // Process code token
    } else if (token.type === 'code') {
      tree.push(tag('code', {}, [text((token as CodeToken).content ?? '')]))
      pos++

      // Process fence token
    } else if (token.type === 'fence') {
      tree.push(code((token as FenceToken).content, (token as FenceToken).params))
      pos++

      // Process image token
    } else if (token.type === 'image') {
      const { alt, src, title } = token as ImageToken
      tree.push(tag('img', { alt, src, title }, []))
      pos++

      // Fail
    } else {
      throw new Error(
        `Failed to convert Remarkable tokens stream to a tree: an unknown token type "${token.type}"`
      )
    }
  }
  return tree
}

function getTagChildren (tokens: Token[], openingPos: number, closingPos: number) {
  return remarkableTree(tokens.slice(openingPos + 1, closingPos))
}

const OPENING_TAG_TOKEN_TYPE_PATTERN = /(.+)_open$/

function isOpeningTagToken (token: Token) {
  return OPENING_TAG_TOKEN_TYPE_PATTERN.test(token.type)
}

function isClosingTagToken (token: Token, openingToken: Token) {
  const [, tagName] = openingToken.type.match(OPENING_TAG_TOKEN_TYPE_PATTERN)!
  return token.type === `${tagName}_close` && token.level === openingToken.level
}

function getClosingPosFor (tokens: Token[], pos: number) {
  const openingToken = tokens[pos]

  let closingPos = pos + 1
  while (!isClosingTagToken(tokens[closingPos], openingToken)) {
    closingPos++
    if (closingPos >= tokens.length) {
      throw new Error(
        `Failed to convert Remarkable tokens stream to a tree: can't find the closing token for "${openingToken.type}"`
      )
    }
  }

  return closingPos
}
