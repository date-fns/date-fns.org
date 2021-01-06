import { text, tag, softbreak, code, tagName, attrs } from './utils'

type FIXME = any

export function remarkableTree (tokens: FIXME) {
  var tree: FIXME = []
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
      tree = tree.concat(remarkableTree(token.children))
      pos++

      // Process text token
    } else if (token.type === 'text') {
      tree.push(text(token.content))
      pos++

      // Process softbreak token
    } else if (token.type === 'softbreak') {
      tree.push(softbreak())
      pos++

      // Process code token
    } else if (token.type === 'code') {
      tree.push(tag('code', {}, [text(token.content)]))
      pos++

      // Process fence token
    } else if (token.type === 'fence') {
      tree.push(code(token.content, token.params))
      pos++

      // Process image token
    } else if (token.type === 'image') {
      const { alt, src, title } = token
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

function getTagChildren (tokens: FIXME, openingPos: FIXME, closingPos: FIXME) {
  return remarkableTree(tokens.slice(openingPos + 1, closingPos))
}

const OPENING_TAG_TOKEN_TYPE_PATTERN = /(.+)_open$/

function isOpeningTagToken (token: FIXME) {
  return OPENING_TAG_TOKEN_TYPE_PATTERN.test(token.type)
}

function isClosingTagToken (token: FIXME, openingToken: FIXME) {
  const [, tagName] = openingToken.type.match(OPENING_TAG_TOKEN_TYPE_PATTERN)
  return token.type === `${tagName}_close` && token.level === openingToken.level
}

function getClosingPosFor (tokens: FIXME, pos: FIXME) {
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
