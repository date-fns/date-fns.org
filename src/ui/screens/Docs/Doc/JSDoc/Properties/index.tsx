import { h, FunctionComponent } from 'preact'
import { JSDocParam } from '@date-fns/date-fns-db'
import { DocParams } from '~/ui/components/DocParams'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'

interface Props {
  properties: JSDocParam[]
}

export const Properties: FunctionComponent<Props> = ({ properties }) => (
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
        <DocParams params={properties} />
      </tbody>
    </table>
  </section>
)
