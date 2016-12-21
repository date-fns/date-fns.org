import React from 'react'
import Code from 'app/ui/_lib/code'
import Markdown from 'app/ui/_lib/markdown'
import JSDocUsage from './usage'
import JSDocSyntax from './syntax'
import JSDocArguments from './arguments'

export default class JSDoc extends React.Component {
  static propTypes = {
    doc: React.PropTypes.object.isRequired
  }

  render () {
    const {doc} = this.props
    const docContent = doc.content
    const params = this._calculateParams(docContent.params)

    return <div className='jsdoc'>
      <h1>
        <span className='jsdoc-header'>
          {docContent.name}
        </span>
      </h1>

      <section>
        <h2 id='description'>
          Description
          <a href='#description' className='doc-header_link'>#</a>
        </h2>

        <Markdown value={docContent.description} />
      </section>

      <JSDocUsage name={docContent.name} />

      <JSDocSyntax name={docContent.name} args={params} />

      <JSDocArguments args={params} />

      {this._renderReturnsSection(docContent.returns)}

      {this._renderExceptionsSection(docContent.exceptions)}

      {this._renderExamplesSection(docContent.examples)}
    </div>
  }

  _renderReturnsSection (returns) {
    return <section>
      <h2 id='returns'>
        Returns
        <a href='#returns' className='doc-header_link'>#</a>
      </h2>

      <table>
        <thead>
          <tr>
            <th>
              Type
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>

        <tbody>
          {returns.map((returnsData, index) => {
            return <tr key='index'>
              <td>
                {returnsData.type.names.join(' | ')}
              </td>
              <td>
                {returnsData.description}
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </section>
  }

  _renderExceptionsSection (exceptions) {
    if (!exceptions) return

    return <section>
      <h2 id='exceptions'>
        Exceptions
        <a href='#exceptions' className='doc-header_link'>#</a>
      </h2>

      <table>
        <thead>
          <tr>
            <th>
              Type
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>

        <tbody>
          {exceptions.map((exceptionData, index) => {
            const {type = {names: ['Error']}, description} = exceptionData

            return <tr key='index'>
              <td>
                {type.names.join(' | ')}
              </td>
              <td>
                {description}
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </section>
  }

  _renderExamplesSection (examples) {
    if (!examples) return

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

  _calculateParams (params) {
    if (!params) {
      return null
    }

    const paramIndices = params.reduce((result, param, index) => {
      result[param.name] = index
      return result
    }, {})

    return params.map((param, index) => {
      const {name, isProperty} = param
      const indexOfDot = name.indexOf('.')

      if (indexOfDot >= 0 && !isProperty) {
        const parentIndex = paramIndices[name.substring(0, indexOfDot)]
        const parent = params[parentIndex]

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
}
