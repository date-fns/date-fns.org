import { h, FunctionComponent } from 'preact'
import type { DateFnsDocs } from '@date-fns/docs/types'
import { JSDocParams } from '~/ui/components/JSDocParams'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'

interface Props {
  properties: DateFnsDocs.JSDocParam[]
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
        <JSDocParams params={properties} />
      </tbody>
    </table>
  </section>
)
