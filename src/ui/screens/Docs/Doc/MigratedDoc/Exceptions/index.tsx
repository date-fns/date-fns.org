import { h, FunctionComponent } from 'preact'
import { MigratedDocTypedAttribute } from 'db/migratedDoc'
import { DocHeaderAnchor } from 'ui/components/DocHeaderAnchor'
import { Markdown } from 'ui/components/Markdown'

interface Props {
  exceptions: MigratedDocTypedAttribute[]
  selectedVersion: string
}

export const Exceptions: FunctionComponent<Props> = ({ exceptions, selectedVersion }) => (
  <section>
    <h2 id='exceptions'>
      Exceptions
      <DocHeaderAnchor anchor="exceptions" />
    </h2>

    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>

      <tbody>
        {exceptions.map((exception, index) => (
          <tr key={index}>
            <td>
              {exception.type.names.join(' | ')}
            </td>
            <td>
              <Markdown
                value={exception.description}
                selectedVersion={selectedVersion}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
)

