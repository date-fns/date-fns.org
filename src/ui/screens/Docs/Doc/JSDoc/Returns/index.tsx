import { h, FunctionComponent } from 'preact'
import { JSDocAttribute } from '@date-fns/docs/db'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { Markdown } from '~/ui/components/Markdown'

interface Props {
  returns: JSDocAttribute[]
}

export const Returns: FunctionComponent<Props> = ({ returns }) => (
  <section>
    <h2 id="returns">
      Returns
      <DocHeaderAnchor anchor="returns" />
    </h2>

    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>

      <tbody>
        {returns.map((returnData, index) => (
          <tr key={index}>
            <td>{returnData.type.names.join(' | ')}</td>
            <td>
              <Markdown value={returnData.description} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
)
