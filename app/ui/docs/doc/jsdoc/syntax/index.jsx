import React from 'react'
import Code from 'app/ui/_lib/code'

export default function JSDocSyntax ({ syntax }) {
  if (!syntax) {
    return null
  }

  return (
    <section>
      <h2 id='syntax'>
        Syntax
        <a href='#syntax' className='doc-header_link'>
          #
        </a>
      </h2>

      <Code
        value={syntax}
        options={{
          readOnly: true,
          mode: 'javascript'
        }}
      />
    </section>
  )
}

JSDocSyntax.propTypes = {
  syntax: React.PropTypes.string
}
