import { h, FunctionComponent, Fragment } from 'preact'
import {
  MigratedDocParam,
  MigratedDocType,
  Submodule,
} from '@date-fns/date-fns-db'
import { Markdown } from '~/ui/components/Markdown'
import { OptionalLabel, PropsLabel } from './style.css'

interface Props {
  params: MigratedDocParam[]
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
  <OptionalLabel>
    {defaultValue !== undefined
      ? `(optional, default=${defaultValue})`
      : '(optional)'}
  </OptionalLabel>
)

const ParamPropsTable: FunctionComponent<{
  props: MigratedDocParam[]
}> = ({ props }) => (
  <div>
    <PropsLabel>Properties:</PropsLabel>

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
  type: MigratedDocType
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
