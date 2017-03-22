import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

export default function JSDocReturns ({returns}) {
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
              {returnsData.getIn(['type', 'names']).join(' | ')}
            </td>
            <td>
              {returnsData.get('description')}
            </td>
          </tr>
        })}
      </tbody>
    </table>
  </section>
}

JSDocReturns.propTypes = {
  returns: ImmutablePropTypes.list
}
