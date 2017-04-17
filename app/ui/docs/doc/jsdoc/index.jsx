import React from 'react'
import Markdown from 'app/ui/_lib/markdown'
import JSDocUsage from './usage'
import JSDocSyntax from './syntax'
import JSDocArguments from './arguments'
import JSDocReturns from './returns'
import JSDocExceptions from './exceptions'
import JSDocExamples from './examples'
import ImmutablePropTypes from 'react-immutable-proptypes'

export default function JSDoc ({content, selectedVersionTag}) {
  const name = content.get('name')
  const params = calculateParams(content.get('params'))

  return <div className='jsdoc'>
    <h1>
      <span className='jsdoc-header'>
        {name}
      </span>
    </h1>

    <section>
      <h2 id='description'>
        Description
        <a href='#description' className='doc-header_link'>#</a>
      </h2>

      <Markdown value={content.get('description')} selectedVersionTag={selectedVersionTag} />
    </section>

    <JSDocUsage name={name} />
    <JSDocSyntax name={name} args={params} />
    <JSDocArguments args={params} />
    <JSDocReturns returns={content.get('returns')} />
    <JSDocExceptions exceptions={content.get('exceptions')} />
    <JSDocExamples examples={content.get('examples')} />
  </div>
}

JSDoc.propTypes = {
  doc: ImmutablePropTypes.map,
  selectedVersionTag: React.PropTypes.any
}

function calculateParams (params) {
  if (!params) {
    return null
  }

  const paramsArray = params.map((param) => param.toJS())

  const paramIndices = paramsArray.reduce((result, param, index) => {
    result[param.name] = index
    return result
  }, {})

  return paramsArray.map((param, index) => {
    const {name, isProperty} = param

    const indexOfDot = name.indexOf('.')

    if (indexOfDot >= 0 && !isProperty) {
      const parentIndex = paramIndices[name.substring(0, indexOfDot)]
      const parent = paramsArray.get(parentIndex)

      param.name = name.substring(indexOfDot + 1)
      param.isProperty = true
      if (!parent.props) {
        parent.props = [param]
      } else {
        parent.props.push(param)
      }
    }

    return param
  })
}
