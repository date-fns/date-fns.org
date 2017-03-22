import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Code from 'app/ui/_lib/code'

export default function JSDocExamples ({examples}) {
  if (!examples) {
    return null
  }

  return <section>
    <h2 id='examples'>
      Examples
      <a href='#examples' className='doc-header_link'>#</a>
    </h2>

    <div>
      {examples.map((example, index) => {
        return <div className='jsdoc-code' key={index}>
          <Code
            value={example}
            options={{
              readOnly: true,
              mode: 'javascript'
            }}
          />
        </div>
      })}
    </div>
  </section>
}

JSDocExamples.propTypes = {
  examples: ImmutablePropTypes.list
}
