import { h, FunctionComponent } from 'preact'
import { MigratedDocParam, Submodule } from '@date-fns/date-fns-db'
import { DocParams } from '~/ui/components/DocParams'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'

interface Props {
  properties: MigratedDocParam[]
  selectedSubmodule: Submodule
  selectedVersion: string
}

export const Properties: FunctionComponent<Props> = ({
  properties,
  selectedVersion,
  selectedSubmodule,
}) => (
  <section>
    <h2 id="properties">
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
        <DocParams
          params={properties}
          selectedVersion={selectedVersion}
          selectedSubmodule={selectedSubmodule}
        />
      </tbody>
    </table>
  </section>
)
