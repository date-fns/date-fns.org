import { h, FunctionComponent } from 'preact'
import { MigratedDocTypedAttribute } from 'db/migratedDoc'
import { DocHeaderAnchor } from 'ui/components/DocHeaderAnchor'
import { Markdown } from 'ui/components/Markdown'

interface Props {
  returns: MigratedDocTypedAttribute[]
  selectedVersion: string
}

export const Returns: FunctionComponent<Props> = ({ returns, selectedVersion }) => (
  <section>
    <h2 id='returns'>
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
            <td>
              {returnData.type.names.join(' | ')}
            </td>
            <td>
              <Markdown
                value={returnData.description}
                selectedVersion={selectedVersion}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
)

