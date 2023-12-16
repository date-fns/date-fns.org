import { Fragment, FunctionComponent, h } from 'preact'
import { Markdown } from '~/ui/components/Markdown'
import { SectionHeader } from '~/ui/components/SectionHeader'

export interface TypeDocThrow {
  description: string
}

export interface TypeDocThrowsProps {
  throws: TypeDocThrow[]
  scope?: string
  header?: 'h2' | 'h3'
}

export const Throws: FunctionComponent<TypeDocThrowsProps> = ({
  throws,
  scope,
  header,
}) => {
  return (
    <section>
      <SectionHeader header="Throws" scope={scope} tag={header} />

      <table>
        <thead>
          <tr>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {throws.map((throwData, index) => (
            <tr key={index}>
              <td>
                <Markdown value={throwData.description} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
