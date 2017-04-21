import React from 'react'
import Markdown from 'app/ui/_lib/markdown'
import JSDocUsage from './usage'
import JSDocSyntax from './syntax'
import JSDocArguments from './arguments'
import JSDocProperties from './properties'
import JSDocReturns from './returns'
import JSDocExceptions from './exceptions'
import JSDocExamples from './examples'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {FeaturesPropType} from 'app/types/features'

export default function JSDoc ({content, isFPFn, features, selectedVersionTag}) {
  const name = content.get('name')
  const params = calculateParams(content.get('params'))
  const properties = calculateParams(content.get('properties'))

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

    <JSDocUsage
      name={name}
      usageAvailable={content.get('kind') !== 'typedef'}
      camelCase={features.camelCase}
      isFPFn={isFPFn}
    />

    <JSDocSyntax name={name} args={params} isFPFn={isFPFn} />
    <JSDocArguments args={params} selectedVersionTag={selectedVersionTag} />
    <JSDocProperties properties={properties} selectedVersionTag={selectedVersionTag} />
    <JSDocReturns returns={content.get('returns')} selectedVersionTag={selectedVersionTag} />
    <JSDocExceptions exceptions={content.get('exceptions')} selectedVersionTag={selectedVersionTag} />
    <JSDocExamples examples={content.get('examples')} />
  </div>
}

JSDoc.propTypes = {
  content: ImmutablePropTypes.map,
  isFPFn: React.PropTypes.bool,
  features: FeaturesPropType,
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
