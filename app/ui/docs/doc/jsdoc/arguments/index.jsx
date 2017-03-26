import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

export default class JSDocArguments extends React.Component {
  static propTypes = {
    args: ImmutablePropTypes.list
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
            {arg.get('name')}
            {this._renderArgumentOptionalLabel(arg.get('optional'), arg.get('defaultvalue'))}
          </td>
          <td>
            {this._renderArgumentType(arg.get('type'), arg.get('variable'))}
          </td>
          <td>
            {arg.get('description')}
            {this._renderArgumentPropsTable(arg.get('props'))}
          </td>
        </tr>
      })
  }

  _renderArgumentOptionalLabel (optional, defaultValue) {
    if (!optional) {
      return null
    }

    return <div className='jsdoc_arguments-optional'>
      {defaultValue !== undefined ? `(optional, default=${defaultValue})` : '(optional)'}
    </div>
  }

  _renderArgumentType (type, variable) {
    const types = type.get('names').join(' | ')
    if (variable) {
      return type.get('names').length > 1 ? `...(${types})` : `...${types}`
    } else {
      return types
    }
  }

  _renderArgumentPropsTable (props) {
    if (!props) {
      return null
    }

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
