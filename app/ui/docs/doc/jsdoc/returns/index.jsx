import React from 'react'
import Markdown from 'app/ui/_lib/markdown'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { EitherPropType } from 'app/types/either'

export default function JSDocReturns ({ returns, selectedVersionTag }) {
  if (!returns) {
    return null
  }

  return (
    <section>
      <h2 id='returns'>
        Returns
        <a href='#returns' className='doc-header_link'>
          #
        </a>
      </h2>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {returns.map((returnsData, index) => {
            return (
              <tr key='index'>
                <td>
                  {returnsData.getIn(['type', 'names']).join(' | ')}
                </td>
                <td>
                  <Markdown
                    value={returnsData.get('description')}
                    selectedVersionTag={selectedVersionTag}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

JSDocReturns.propTypes = {
  returns: ImmutablePropTypes.list,
  selectedVersionTag: EitherPropType(
    React.PropTypes.object,
    React.PropTypes.string
  ).isRequired
}
