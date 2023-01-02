import { ComponentChildren, FunctionComponent, h } from 'preact'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { Markdown } from '~/ui/components/Markdown'

interface ReturnType {
  description: string
  type: ComponentChildren
}

interface Props {
  returns: ReturnType[]
}

export const DocReturns: FunctionComponent<Props> = ({ returns }) => (
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
            <td>{returnData.type}</td>
            <td>
              <Markdown value={returnData.description} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
)
