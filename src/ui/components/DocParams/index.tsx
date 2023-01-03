import { h, FunctionComponent, Fragment } from 'preact'
import type { DateFnsDocs } from '@date-fns/docs'
import { Markdown } from '~/ui/components/Markdown'
import * as styles from './styles.css'

interface Props {
  params: DateFnsDocs.JSDocParam[]
}

export const DocParams: FunctionComponent<Props> = ({ params }) => (
  <>
    {params.map((param, index) => (
      <tr key={index}>
        <td>
          {param.name}
          {param.optional && (
            <ParamOptionalLabel defaultValue={param.defaultvalue} />
          )}
        </td>
        <td>
          <ParamType type={param.type} variable={param.variable} />
        </td>
        <td>
          <Markdown value={param.description} />
          {param.props && <ParamPropsTable props={param.props} />}
        </td>
      </tr>
    ))}
  </>
)

const ParamOptionalLabel: FunctionComponent<{
  defaultValue?: string
}> = ({ defaultValue }) => (
  <div class={styles.optionalLabel}>
    {defaultValue !== undefined
      ? `(optional, default=${defaultValue})`
      : '(optional)'}
  </div>
)

const ParamPropsTable: FunctionComponent<{
  props: DateFnsDocs.JSDocParam[]
}> = ({ props }) => (
  <div>
    <div class={styles.propsLabel}>Properties:</div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>

      <tbody>
        <DocParams params={props} />
      </tbody>
    </table>
  </div>
)

const ParamType: FunctionComponent<{
  type: DateFnsDocs.JSDocType
  variable?: boolean
}> = ({ type, variable }) => {
  const names = type.names
  const types = names.join(' | ')
  if (variable) {
    return <span>{names.length > 1 ? `...(${types})` : `...${types}`}</span>
  } else {
    return <span>{types}</span>
  }
}
