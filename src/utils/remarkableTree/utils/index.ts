type FIXME = any

export function text (content: FIXME) {
  return {
    type: 'text',
    content
  }
}

export function tag (tagName: FIXME, attrs = {}, children: FIXME[] = []) {
  return {
    type: 'tag',
    tagName,
    attrs,
    children
  }
}

export function softbreak () {
  return {
    type: 'softbreak'
  }
}

export function code (content: FIXME, language: FIXME) {
  return {
    type: 'code',
    language,
    content
  }
}

export function tagName (token: FIXME) {
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
      return `h${token.hLevel}`
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
    default:
      throw new Error(
        `Can't retrieve the tag name from a token: an unknown token type "${token.type}"`
      )
  }
}

export function attrs (token: FIXME) {
  switch (token.type) {
    case 'link_open':
      return { href: token.href, title: token.title }
    default:
      return {}
  }
}
