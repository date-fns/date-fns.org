import { joinCommentParts } from '@date-fns/docs/utils'
import { FunctionComponent, h } from 'preact'
import type {
  DeclarationReflection,
  ParameterReflection,
  TypeParameterReflection,
} from 'typedoc'
import { Markdown } from '../Markdown'
import { TypeDocType } from '../TypeDocType'
import * as styles from './styles.css'

interface TypeDocInterfaceProps {
  list:
    | ParameterReflection[]
    | DeclarationReflection[]
    | TypeParameterReflection[]
}

export const TypeDocInterface: FunctionComponent<TypeDocInterfaceProps> = ({
  list,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>

      <tbody>
        {list.map((item, index) => (
          <tr key={index}>
            <td class={styles.code}>
              {item.name}

              {item.flags.isOptional && (
                <div class={styles.optional}>(optional)</div>
              )}
            </td>

            <td style={styles.code}>
              {item.type && <TypeDocType type={item.type} />}
            </td>

            <td>
              {item.comment?.summary && (
                <Markdown value={joinCommentParts(item.comment.summary)} />
              )}

              <code>
                <pre>{JSON.stringify(item, null, 2)}</pre>
              </code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
