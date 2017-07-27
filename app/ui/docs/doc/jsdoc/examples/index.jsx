import React from 'react'
import Markdown from 'app/ui/_lib/markdown'
import Code from 'app/ui/_lib/code'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { EitherPropType } from 'app/types/either'

export default function JSDocExamples ({ examples, selectedVersionTag }) {
  if (!examples) {
    return null
  }

  return (
    <section>
      <h2 id='examples'>
        Examples
        <a href='#examples' className='doc-header_link'>
          #
        </a>
      </h2>

      {renderExamples(examples, selectedVersionTag)}
    </section>
  )
}

JSDocExamples.propTypes = {
  examples: React.PropTypes.oneOfType([
    ImmutablePropTypes.list,
    React.PropTypes.string
  ]),
  selectedVersionTag: EitherPropType(
    React.PropTypes.object,
    React.PropTypes.string
  ).isRequired
}

function renderExamples (examples, selectedVersionTag) {
  if (typeof examples === 'string') {
    return <Markdown value={examples} selectedVersionTag={selectedVersionTag} />
  }

  return (
    <div>
      {examples.map((example, index) => {
        return (
          <div className='jsdoc-code' key={index}>
            <Code
              value={example}
              options={{
                readOnly: true,
                mode: 'javascript'
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
