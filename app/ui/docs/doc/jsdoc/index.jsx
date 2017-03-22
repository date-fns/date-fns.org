import React from 'react'
import Code from 'app/ui/_lib/code'
import Markdown from 'app/ui/_lib/markdown'
import JSDocUsage from './usage'
import JSDocSyntax from './syntax'
import JSDocArguments from './arguments'
import JSDocReturns from './returns'
import JSDocExceptions from './exceptions'
import JSDocExamples from './examples'

export default function JSDoc ({doc}) {
  const docContent = doc.get('content')
  const name = docContent.get('name')
  const params = calculateParams(docContent.get('params'))

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

      <Markdown value={docContent.get('description')} />
    </section>

    <JSDocUsage name={name} />
    <JSDocSyntax name={name} args={params} />
    <JSDocArguments args={docContent.get('params')} />
    <JSDocReturns returns={docContent.get('returns')}/>
    <JSDocExceptions exceptions={docContent.get('exceptions')}/>
    <JSDocExamples examples={docContent.get('examples')}/>
  </div>
}

JSDoc.propTypes = {
  doc: React.PropTypes.object.isRequired
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
