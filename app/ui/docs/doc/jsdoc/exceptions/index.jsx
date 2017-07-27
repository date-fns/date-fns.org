import React from 'react'
import Markdown from 'app/ui/_lib/markdown'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { EitherPropType } from 'app/types/either'

export default function JSDocExceptions ({ exceptions, selectedVersionTag }) {
  if (!exceptions) {
    return null
  }

  return (
    <section>
      <h2 id='exceptions'>
        Exceptions
        <a href='#exceptions' className='doc-header_link'>
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
          {exceptions.map((exceptionData, index) => {
            return (
              <tr key={index}>
                <td>
                  {exceptionData
                    .getIn(['type', 'names'], ['Error'])
                    .join(' | ')}
                </td>
                <td>
                  <Markdown
                    value={exceptionData.get('description')}
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

JSDocExceptions.propTypes = {
  exceptions: ImmutablePropTypes.list,
  selectedVersionTag: EitherPropType(
    React.PropTypes.object,
    React.PropTypes.string
  ).isRequired
}
