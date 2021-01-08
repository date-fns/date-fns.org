/* eslint-env mocha */

import { text, tag, softbreak, code, getTagName, getAttrs } from '.'
import assert from 'power-assert'

describe('Remarkable tree utils', () => {
  describe('text', () => {
    it('returns a text structure', () => {
      assert.deepEqual(text('Yay!'), {
        type: 'text',
        content: 'Yay!',
      })
    })
  })

  describe('tag', () => {
    it('returns a tag structure', () => {
      assert.deepEqual(tag('p'), {
        type: 'tag',
        tagName: 'p',
        attrs: {},
        children: [],
      })
    })

    it('allows to pass attrs', () => {
      assert.deepEqual(tag('p', { a: 1, b: 2 }), {
        type: 'tag',
        tagName: 'p',
        attrs: { a: 1, b: 2 },
        children: [],
      })
    })

    it('allows to pass children', () => {
      assert.deepEqual(tag('p', {}, [1, 2, 3] as any[]), {
        type: 'tag',
        tagName: 'p',
        attrs: {},
        children: [1, 2, 3],
      })
    })
  })

  describe('softbreak', () => {
    it('returns a softbreak structure', () => {
      assert.deepEqual(softbreak(), {
        type: 'softbreak',
      })
    })
  })

  describe('code', () => {
    it('returns a code structure', () => {
      assert.deepEqual(code("console.log('Hello, world!')"), {
        type: 'code',
        language: undefined,
        content: "console.log('Hello, world!')",
      })
    })

    it('allows to specify the language', () => {
      assert.deepEqual(code("console.log('Hello, world!')", 'javascript'), {
        type: 'code',
        language: 'javascript',
        content: "console.log('Hello, world!')",
      })
    })
  })

  describe('getTagName', () => {
    it('returns p for paragraph_open', () => {
      assert(getTagName({ type: 'paragraph_open' } as any) === 'p')
    })

    it('returns strong for strong_open', () => {
      assert(getTagName({ type: 'strong_open' } as any) === 'strong')
    })

    it('returns strong for em_open', () => {
      assert(getTagName({ type: 'em_open' } as any) === 'em')
    })

    it('returns ul for bullet_list_open', () => {
      assert(getTagName({ type: 'bullet_list_open' } as any) === 'ul')
    })

    it('returns ol for ordered_list_open', () => {
      assert(getTagName({ type: 'ordered_list_open' } as any) === 'ol')
    })

    it('returns li for list_item_open', () => {
      assert(getTagName({ type: 'list_item_open' } as any) === 'li')
    })

    it('returns hX with proper level for heading_open', () => {
      assert(getTagName({ type: 'heading_open', hLevel: 2 } as any) === 'h2')
    })

    it('returns a for link_open', () => {
      assert(getTagName({ type: 'link_open' } as any) === 'a')
    })

    it('returns blockquote for blockquote_open', () => {
      assert(getTagName({ type: 'blockquote_open' } as any) === 'blockquote')
    })

    it('returns table for table_open', () => {
      assert(getTagName({ type: 'table_open' } as any) === 'table')
    })

    it('returns thead for thead_open', () => {
      assert(getTagName({ type: 'thead_open' } as any) === 'thead')
    })

    it('returns tr for tr_open', () => {
      assert(getTagName({ type: 'tr_open' } as any) === 'tr')
    })

    it('returns th for th_open', () => {
      assert(getTagName({ type: 'th_open' } as any) === 'th')
    })

    it('returns tbody for tbody_open', () => {
      assert(getTagName({ type: 'tbody_open' } as any) === 'tbody')
    })

    it('returns td for td_open', () => {
      assert(getTagName({ type: 'td_open' } as any) === 'td')
    })

    it('throws an error if the token has an unknown type', () => {
      assert.throws(() => {
        getTagName({ type: 'whoops' } as any)
      }, /Can't retrieve the tag name from a token: an unknown token type "whoops"/)
    })
  })

  describe('attrs', () => {
    it('returns empty object for random token type', () => {
      assert.deepEqual(getAttrs({ type: 'random' } as any), {})
    })

    it('returns href & title for link_open', () => {
      assert.deepEqual(
        getAttrs({
          type: 'link_open',
          href: 'https://date-fns.org',
          title: 'date-fns',
        } as any),
        {
          href: 'https://date-fns.org',
          title: 'date-fns',
        }
      )
    })
  })
})
