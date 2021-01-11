import { h, FunctionComponent } from 'preact'
import { MigratedDocTypedAttribute, Submodule } from '@date-fns/date-fns-db'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { Markdown } from '~/ui/components/Markdown'

interface Props {
  exceptions: MigratedDocTypedAttribute[]
}

export const Exceptions: FunctionComponent<Props> = ({ exceptions }) => (
  <section>
    <h2 id="exceptions">
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
            <td>{exception.type.names.join(' | ')}</td>
            <td>
              <Markdown value={exception.description} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
)
