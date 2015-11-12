import React from 'react'
import Code from 'app/ui/_lib/code'
import showdown from 'showdown'
import docs from 'app/_lib/docs'

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
      let doc = this._doc()
      return <div className='doc'>
        <h2 className='doc-header'>
          {doc.name}
        </h2>

        {this._renderSyntaxSection(doc.name, doc.params)}

        <section className='doc-section'>
          <h3 className='doc-subheader'>
            Description
          </h3>

          <div
            className='doc-description'
            dangerouslySetInnerHTML={{__html: converter.makeHtml(doc.description)}}
          />
        </section>

        {this._renderArgumentsSection(doc.params)}

        {this._renderReturnsSection(doc.returns)}

        {this._renderExceptionsSection(doc.exceptions)}

        {this._renderExamplesSection(doc.examples)}
      </div>
    } else {
      return null
    }
  }

  _renderSyntaxSection(name, args) {
    const argsString = (args || [])
      .map((arg) => {
        const spreadString = arg.variable ? '...' : ''
        const defaultValueString = arg.defaultvalue !== undefined ? '=' + arg.defaultvalue : ''
        const argString = spreadString + arg.name + defaultValueString
        return arg.optional ? `[${argString}]` : argString
      })
      .join(', ')

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

  _renderArguments(args) {
    return args.map((arg, index) => {
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
          {returns.map((retunsData, index) => {
            return <tr key='index'>
              <td>
                {retunsData.type.names.join(' | ')}
              </td>
              <td>
                {retunsData.description}
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

  _doc() {
    for (let categoryName in docs) {
      let fns = docs[categoryName]
      for (let fnIndex in fns) {
        let fn = fns[fnIndex]
        if (fn.name == this.props.docId) {
          return fn
        }
      }
    }
  }
}
