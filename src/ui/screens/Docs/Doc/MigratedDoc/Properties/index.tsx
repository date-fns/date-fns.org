import { h, FunctionComponent } from 'preact'
import { MigratedDocParam } from 'db/migratedDoc'
import { DocParams } from 'ui/components/DocParams'
import { DocHeaderAnchor } from 'ui/components/DocHeaderAnchor'

interface Props {
  properties: MigratedDocParam[]
  selectedVersion: string
}

export const Properties: FunctionComponent<Props> = ({ properties, selectedVersion }) => (
  <section>
    <h2 id='properties'>
      Properties
      <DocHeaderAnchor anchor="properties" />
    </h2>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>

      <tbody>
        <DocParams params={properties} selectedVersion={selectedVersion} />
      </tbody>
    </table>
  </section>
)
