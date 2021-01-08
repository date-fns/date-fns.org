import { h, FunctionComponent } from 'preact'
import { MigratedDocParam } from '@date-fns/date-fns-db'
import { DocParams } from '~/ui/components/DocParams'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'

interface Props {
  args: MigratedDocParam[]
  selectedVersion: string
}

export const Arguments: FunctionComponent<Props> = ({ args, selectedVersion }) => (
  <section>
      <h2 id='arguments'>
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
          <DocParams params={args} selectedVersion={selectedVersion} />
        </tbody>
      </table>
    </section>
)
