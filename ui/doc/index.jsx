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

  render() {
    if (this.props.docId) {
      let doc = this._doc()
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

        {this._renderArgumentsSection(doc.params)}

        {this._renderReturnsSection(doc.returns)}

        {this._renderExceptionsSection(doc.exceptions)}

        {this._renderExamplesSection(doc.examples, doc.id)}
      </div>
    } else {
      return null
    }
  }

  _renderArgumentsSection(args) {
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
        </td>
        <td>
          {arg.type.names.join(' | ')}
        </td>
        <td>
          {arg.description}
        </td>
      </tr>
    })
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

      <ul>
        {exceptions.map((exception, index) => {
          return <li key={index}>
            {exception.description}
          </li>
        })}
      </ul>
    </section>
  }

  _renderExamplesSection(examples, docID) {
    if (!examples) return

    return <section className='doc-section'>
      <h3 className='doc-subheader'>
        Examples
      </h3>

      <div>
        {examples.map((example, index) => {
          return <div className='doc-code' key={`${docID}-${index}`}>
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
