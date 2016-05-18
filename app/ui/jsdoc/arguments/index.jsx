import React from 'react'

export default class JSDocArguments extends React.Component {
  static propTypes = {
    args: React.PropTypes.array
  }

  render () {
    if (!this.props.args || this.props.args.length === 0) return null

    return <section>
      <h2 id='arguments'>
        Arguments
        <a href='#arguments' className='doc-header_link'>#</a>
      </h2>

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
          {this._renderArguments(this.props.args)}
        </tbody>
      </table>
    </section>
  }

  _renderArguments (args, isProps) {
    return args
      .filter((arg) => isProps || !arg.isProperty)
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

  _renderArgumentOptionalLabel (defaultValue) {
    return <div className='jsdoc_arguments-optional'>
      {defaultValue !== undefined ? `(optional, default=${defaultValue})` : '(optional)'}
    </div>
  }

  _renderArgumentType (type, variable) {
    const types = type.names.join(' | ')
    if (variable) {
      return type.names.length > 1 ? `...(${types})` : `...${types}`
    } else {
      return types
    }
  }

  _renderArgumentPropsTable (props) {
    return <div>
      <div className='jsdoc_arguments-props_label'>
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
}
