/* eslint-env mocha */

import Markdown from '.'
import React from 'react'
import { shallow } from 'enzyme'
import assert from 'power-assert'
import MarkdownCode from 'app/ui/_lib/markdown_code'

describe('Markdown', () => {
  it('renders passed markdown', () => {
    const wrapper = shallow(<Markdown value='Hello, world!' />)
    const result = wrapper.equals(<p>Hello, world!</p>)
    assert(result)
  })

  it('wraps sequential blocks into div', () => {
    const str = 'Hello,\n\nworld!'
    const wrapper = shallow(<Markdown value={str} />)
    const result = wrapper.equals(
      <div>
        <p>Hello,</p>
        <p>world!</p>
      </div>
    )
    assert(result)
  })

  it('assigns keys to sequential blocks', () => {
    const str = 'Hello,\n\nworld!'
    const wrapper = shallow(<Markdown value={str} />)
    const [p1, p2] = wrapper.children().nodes
    assert(p1.key === '0')
    assert(p2.key === '1')
  })

  it('handles soft breakes', () => {
    const str = 'Hello,\nworld!'
    const wrapper = shallow(<Markdown value={str} />)
    assert(wrapper.html() === '<p>Hello,\nworld!</p>')
  })

  it('renders nested tags', () => {
    const wrapper = shallow(<Markdown value='Hey, **there**!' />)
    const result = wrapper.equals(
      <p>
        Hey, <strong>there</strong>!
      </p>
    )
    assert(result)
  })

  it('renders code tag as MarkdownCode', () => {
    const str = "```\nconsole.log('Hello, world!')\n```"
    const wrapper = shallow(<Markdown value={str} />)
    assert(
      wrapper.find(MarkdownCode).prop('value') ===
        "console.log('Hello, world!')"
    )
  })

  it('passes code language to MarkdownCode', () => {
    const str = "```ruby\nputs('Hello, world!')\n```"
    const wrapper = shallow(<Markdown value={str} />)
    assert(wrapper.find(MarkdownCode).prop('language') === 'ruby')
  })
})
