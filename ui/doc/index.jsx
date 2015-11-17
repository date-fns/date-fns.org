import React from 'react'
import Code from 'app/ui/_lib/code'
import showdown from 'showdown'
import docs from 'app/_lib/docs'
import DocUsage from 'app/ui/doc/usage'
import DocSyntax from 'app/ui/doc/doc_syntax'
import DocArguments from 'app/ui/doc/doc_arguments'

const converter = new showdown.Converter({
  simplifiedAutoLink: true,
  tables: true,
  literalMidWordUnderscores: true
})

export default class Doc extends React.Component {
  static propTypes = {
    docId: React.PropTypes.string
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.docId !== undefined
  }

  render() {
    if (!this.props.docId) return null

    const doc = this._getDoc(this.props.docId)
    const params = this._calculateParams(doc.params)

    return <div className='doc'>
      <h2 className='doc-header'>
        {doc.name}
      </h2>

      <section className='doc-section'>
        <h3 className='doc-subheader'>
          Description
        </h3>

        <div
          className='doc-description'
          dangerouslySetInnerHTML={{__html: converter.makeHtml(doc.description)}}
        />
      </section>

      <DocUsage name={doc.name} />

      <DocSyntax name={doc.name} args={params} />

      <DocArguments args={params} />

      {this._renderReturnsSection(doc.returns)}

      {this._renderExceptionsSection(doc.exceptions)}

      {this._renderExamplesSection(doc.examples)}
    </div>
  }

  _renderReturnsSection(returns) {
    return <section className='doc-section'>
      <h3 className='doc-subheader'>
        Returns
      </h3>

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

  _renderExceptionsSection(exceptions) {
    if (!exceptions) return

    return <section className='doc-section'>
      <h3 className='doc-subheader'>
        Exceptions
      </h3>

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

  _renderExamplesSection(examples) {
    if (!examples) return

    return <section className='doc-section'>
      <h3 className='doc-subheader'>
        Examples
      </h3>

      <div>
        {examples.map((example, index) => {
          return <div className='doc-code' key={index}>
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

  _getDoc(docId) {
    for (let categoryName in docs) {
      let fns = docs[categoryName]
      for (let fnIndex in fns) {
        let fn = fns[fnIndex]
        if (fn.name == docId) {
          return fn
        }
      }
    }
  }

  _calculateParams(params) {
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
