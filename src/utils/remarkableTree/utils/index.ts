import { HeadingToken, LinkOpenToken, Token } from 'remarkable/lib'

interface TextNode {
  type: 'text'
  content: string
}
export function text(content: string): TextNode {
  return {
    type: 'text',
    content,
  }
}

interface TagNode {
  type: 'tag'
  tagName: string
  attrs: Attrs
  children: AnyNode[]
}
export function tag(
  tagName: string,
  attrs = {},
  children: AnyNode[] = []
): TagNode {
  return {
    type: 'tag',
    tagName,
    attrs,
    children,
  }
}

interface SoftbreakNode {
  type: 'softbreak'
}
export function softbreak(): SoftbreakNode {
  return {
    type: 'softbreak',
  }
}

interface CodeNode {
  type: 'code'
  language?: string
  content: string
}
export function code(content: string, language?: string): CodeNode {
  return {
    type: 'code',
    language,
    content,
  }
}

export function getTagName(token: Token) {
  switch (token.type) {
    case 'paragraph_open':
      return 'p'
    case 'strong_open':
      return 'strong'
    case 'em_open':
      return 'em'
    case 'bullet_list_open':
      return 'ul'
    case 'ordered_list_open':
      return 'ol'
    case 'list_item_open':
      return 'li'
    case 'heading_open':
      return `h${(token as HeadingToken).hLevel}`
    case 'link_open':
      return 'a'
    case 'blockquote_open':
      return 'blockquote'
    case 'table_open':
      return 'table'
    case 'thead_open':
      return 'thead'
    case 'tr_open':
      return 'tr'
    case 'th_open':
      return 'th'
    case 'tbody_open':
      return 'tbody'
    case 'td_open':
      return 'td'
    case 'mark_open':
      return 'mark'
    default:
      throw new Error(
        `Can't retrieve the tag name from a token: an unknown token type "${token.type}"`
      )
  }
}

interface Attrs {
  href?: string
  title?: string
}
export function getAttrs(token: Token): Attrs {
  switch (token.type) {
    case 'link_open':
      return {
        href: (token as LinkOpenToken).href,
        title: (token as LinkOpenToken).title,
      }
    default:
      return {}
  }
}

export type AnyNode = TextNode | TagNode | SoftbreakNode | CodeNode
