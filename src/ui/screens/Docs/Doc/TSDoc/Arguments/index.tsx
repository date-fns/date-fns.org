import { h, FunctionComponent } from 'preact'
import type { DateFnsDocs } from '@date-fns/docs/types'
import { DocParams } from '~/ui/components/DocParams'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'

interface Props {
  args: DateFnsDocs.JSDocParam[]
}

export const Arguments: FunctionComponent<Props> = ({ args }) => (
  <section>
    <h2 id="arguments">
      Arguments
      <DocHeaderAnchor anchor="arguments" />
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
        <DocParams params={args} />
      </tbody>
    </table>
  </section>
)
