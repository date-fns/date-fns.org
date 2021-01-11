import { h, FunctionComponent } from 'preact'
import { MigratedDocTypedAttribute } from '@date-fns/date-fns-db'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { Markdown } from '~/ui/components/Markdown'

interface Props {
  returns: MigratedDocTypedAttribute[]
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
