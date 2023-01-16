import { ComponentChildren, FunctionComponent, h, Fragment } from 'preact'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { Markdown } from '~/ui/components/Markdown'

interface ReturnType {
  description: string
  type: ComponentChildren
}

interface Props {
  returns: ReturnType[]
  header?: 'h2' | 'h3'
}

export const DocReturns: FunctionComponent<Props> = ({ returns, header }) => {
  const headerContent = (
    <>
      Returns
      <DocHeaderAnchor anchor="returns" />
    </>
  )

  return (
    <section>
      {header === 'h2' ? (
        <h2 id="returns">{headerContent}</h2>
      ) : (
        <h3 id="returns">{headerContent}</h3>
      )}

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
