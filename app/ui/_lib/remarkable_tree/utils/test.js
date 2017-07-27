/* eslint-env mocha */

import { text, tag, softbreak, code, tagName, attrs } from '.'
import assert from 'power-assert'

describe('Remarkable tree utils', () => {
  describe('text', () => {
    it('returns a text structure', () => {
      assert.deepEqual(text('Yay!'), {
        type: 'text',
        content: 'Yay!'
      })
    })
  })

  describe('tag', () => {
    it('returns a tag structure', () => {
      assert.deepEqual(tag('p'), {
        type: 'tag',
        tagName: 'p',
        attrs: {},
        children: []
      })
    })

    it('allows to pass attrs', () => {
      assert.deepEqual(tag('p', { a: 1, b: 2 }), {
        type: 'tag',
        tagName: 'p',
        attrs: { a: 1, b: 2 },
        children: []
      })
    })

    it('allows to pass children', () => {
      assert.deepEqual(tag('p', {}, [1, 2, 3]), {
        type: 'tag',
        tagName: 'p',
        attrs: {},
        children: [1, 2, 3]
      })
    })
  })

  describe('softbreak', () => {
    it('returns a softbreak structure', () => {
      assert.deepEqual(softbreak('yay!'), {
        type: 'softbreak'
      })
    })
  })

  describe('code', () => {
    it('returns a code structure', () => {
      assert.deepEqual(code("console.log('Hello, world!')"), {
        type: 'code',
        language: undefined,
        content: "console.log('Hello, world!')"
      })
    })

    it('allows to specify the language', () => {
      assert.deepEqual(code("console.log('Hello, world!')", 'javascript'), {
        type: 'code',
        language: 'javascript',
        content: "console.log('Hello, world!')"
      })
    })
  })

  describe('tagName', () => {
    it('returns p for paragraph_open', () => {
      assert(tagName({ type: 'paragraph_open' }) === 'p')
    })

    it('returns strong for strong_open', () => {
      assert(tagName({ type: 'strong_open' }) === 'strong')
    })

    it('returns strong for em_open', () => {
      assert(tagName({ type: 'em_open' }) === 'em')
    })

    it('returns ul for bullet_list_open', () => {
      assert(tagName({ type: 'bullet_list_open' }) === 'ul')
    })

    it('returns ol for ordered_list_open', () => {
      assert(tagName({ type: 'ordered_list_open' }) === 'ol')
    })

    it('returns li for list_item_open', () => {
      assert(tagName({ type: 'list_item_open' }) === 'li')
    })

    it('returns hX with proper level for heading_open', () => {
      assert(tagName({ type: 'heading_open', hLevel: 2 }) === 'h2')
    })

    it('returns a for link_open', () => {
      assert(tagName({ type: 'link_open' }) === 'a')
    })

    it('returns blockquote for blockquote_open', () => {
      assert(tagName({ type: 'blockquote_open' }) === 'blockquote')
    })

    it('returns table for table_open', () => {
      assert(tagName({ type: 'table_open' }) === 'table')
    })

    it('returns thead for thead_open', () => {
      assert(tagName({ type: 'thead_open' }) === 'thead')
    })

    it('returns tr for tr_open', () => {
      assert(tagName({ type: 'tr_open' }) === 'tr')
    })

    it('returns th for th_open', () => {
      assert(tagName({ type: 'th_open' }) === 'th')
    })

    it('returns tbody for tbody_open', () => {
      assert(tagName({ type: 'tbody_open' }) === 'tbody')
    })

    it('returns td for td_open', () => {
      assert(tagName({ type: 'td_open' }) === 'td')
    })

    it('throws an error if the token has an unknown type', () => {
      assert.throws(() => {
        tagName({ type: 'whoops' })
      }, /Can't retrieve the tag name from a token: an unknown token type "whoops"/)
    })
  })

  describe('attrs', () => {
    it('returns empty object for random token type', () => {
      assert.deepEqual(attrs({ type: 'random' }), {})
    })

    it('returns href & title for link_open', () => {
      assert.deepEqual(
        attrs({
          type: 'link_open',
          href: 'https://date-fns.org',
          title: 'date-fns'
        }),
        {
          href: 'https://date-fns.org',
          title: 'date-fns'
        }
      )
    })
  })
})
