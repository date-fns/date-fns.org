import React from 'react'
import Code from 'app/ui/_lib/code'
import showdown from 'showdown'
import docs from 'app/_lib/docs'
import DocUsage from 'app/ui/doc/usage'

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
    if (this.props.docId) {
      const doc = this._getDoc(this.props.docId)
      const params = this._calculateParams(doc.params)

      return <div className='doc'>
        <h2 className='doc-header'>
          {doc.name}
        </h2>

        <DocUsage name={doc.name} />

        {this._renderSyntaxSection(doc.name, params)}

        <section className='doc-section'>
          <h3 className='doc-subheader'>
            Description
          </h3>

          <div
            className='doc-description'
            dangerouslySetInnerHTML={{__html: converter.makeHtml(doc.description)}}
          />
        </section>

        {this._renderArgumentsSection(params)}

        {this._renderReturnsSection(doc.returns)}

        {this._renderExceptionsSection(doc.exceptions)}

        {this._renderExamplesSection(doc.examples)}
      </div>
    } else {
      return null
    }
  }

  _renderSyntaxSection(name, args) {
    const argsString = args ? (
      args
        .filter((arg) => !arg.isProperty)
        .reduce((acc, arg, index, array) => {
          const isLast = index === array.length - 1
          const {argumentsString, nesting} = this._addArgumentSyntax(
            acc.result, arg, acc.nesting, isLast
          )

          acc.result = argumentsString
          acc.nesting = nesting
          return acc
        }, {nesting: 0, result: ''})
        .result
    ) : ''

    return <section className='doc-section'>
      <h3 className='doc-subheader'>
        Syntax
      </h3>

      <Code
        value={`${name}(${argsString})`}
        options={{
          readOnly: true,
          mode: 'javascript'
        }}
      />
    </section>
  }

  _renderArgumentsSection(args) {
    if (!args) return

    return <section className='doc-section'>
      <h3 className='doc-subheader'>
        Arguments
      </h3>

      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Type
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>

        <tbody>
          {this._renderArguments(args)}
        </tbody>
      </table>
    </section>
  }

  _renderArguments(args, renderProperties) {
    return args
      .filter((arg) => renderProperties || !arg.isProperty)
      .map((arg, index) => {
        return <tr key={index}>
          <td>
            {arg.name}
            {arg.optional ? this._renderArgumentOptionalLabel(arg.defaultvalue) : null}
          </td>
          <td>
            {this._renderArgumentType(arg.type, arg.variable)}
          </td>
          <td>
            {arg.description}
            {arg.props ? this._renderArgumentPropsTable(arg.props) : null}
          </td>
        </tr>
      })
  }

  _renderArgumentOptionalLabel(defaultValue) {
    return <div className='doc-argument_optional'>
      {defaultValue !== undefined ? `(optional, default=${defaultValue})` : '(optional)'}
    </div>
  }

  _renderArgumentType(type, variable) {
    const types = type.names.join(' | ')
    if (variable) {
      return type.names.length > 1 ? `...(${types})` : `...${types}`
    } else {
      return types
    }
  }

  _renderArgumentPropsTable(props) {
    return <div>
      <div className='doc-argument_props'>
        Properties:
      </div>

      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Type
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>

        <tbody>
          {this._renderArguments(props, true)}
        </tbody>
      </table>
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

  _addArgumentSyntax(argumentsString, arg, nesting, isLast) {
    if (!arg.optional && nesting > 0) {
      argumentsString += ']'.repeat(nesting) + ', '
    } else if (argumentsString !== '') {
      argumentsString += ', '
    }

    if (arg.optional) {
      nesting += 1
      argumentsString += '['
    }

    if (arg.variable) {
      argumentsString += '...'
    }

    argumentsString += arg.name

    if (arg.defaultvalue !== undefined) {
      argumentsString += '=' + arg.defaultvalue
    }

    if (isLast) {
      argumentsString += ']'.repeat(nesting)
    }

    return {argumentsString, nesting}
  }
}
