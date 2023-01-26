import { ComponentChildren, Fragment, FunctionComponent, h } from 'preact'
import { Markdown } from '~/ui/components/Markdown'
import { SectionHeader } from '../SectionHeader'

interface ReturnType {
  description: string
  type: ComponentChildren
}

interface DocReturnsProps {
  returns: ReturnType[]
  scope?: string
  header?: 'h2' | 'h3'
}

export const DocReturns: FunctionComponent<DocReturnsProps> = ({
  returns,
  scope,
  header,
}) => {
  return (
    <section>
      <SectionHeader header="Returns" scope={scope} tag={header} />

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
}
