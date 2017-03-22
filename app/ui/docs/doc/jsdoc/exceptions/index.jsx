import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

export default function JSDocExceptions ({exceptions}) {
  if (!exceptions) {
    return null
  }

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
          return <tr key='index'>
            <td>
              {exceptionData.getIn(['type', 'names'], ['Error']).join(' | ')}
            </td>
            <td>
              {exceptionData.get('description')}
            </td>
          </tr>
        })}
      </tbody>
    </table>
  </section>
}

JSDocExceptions.propTypes = {
  exceptions: ImmutablePropTypes.list
}
