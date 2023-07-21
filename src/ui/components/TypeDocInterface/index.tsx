import { joinCommentParts } from '@date-fns/docs/utils'
import { Fragment, h } from 'preact'
import { useContext } from 'preact/hooks'
import type {
  DeclarationReflection,
  ParameterReflection,
  TypeParameterReflection,
} from 'typedoc'
import { InlineTypeContext } from '~/ui/contexts/InlineTypeContext'
import { findSource } from '~/utils/docs'
import { Debug } from '../Debug'
import { IdHightlight } from '../IdHighlight'
import { InlineCode } from '../InlineCode'
import { Markdown } from '../Markdown'
import { SourceLink } from '../SourceLink'
import { TypeDocType } from '../TypeDocType'
import * as styles from './styles.css'

interface TypeDocInterfaceProps<
  Ref extends
    | ParameterReflection
    | DeclarationReflection
    | TypeParameterReflection
> {
  list: Ref[]
}

export function TypeDocInterface<
  Ref extends
    | ParameterReflection
    | DeclarationReflection
    | TypeParameterReflection
>({ list }: TypeDocInterfaceProps<Ref>) {
  const inline = useContext(InlineTypeContext)

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
        {list.map((item, index) => {
          const id = inline.buildId?.(item)
          return (
            <tr key={index} id={id}>
              <td class={styles.code}>
                <span class={styles.nowrap}>
                  <IdHightlight id={id} match={inline.idHighlightMatch}>
                    {item.name}
                    {item.flags.isOptional && <span>?</span>}
                  </IdHightlight>

                  <SourceLink source={findSource(item)} size="small" />
                </span>
              </td>

              <td style={styles.code}>
                {item.type && (
                  <InlineCode>
                    <TypeDocType type={item.type} />
                  </InlineCode>
                )}
              </td>

              <td>
                {item.comment?.summary && (
                  <Markdown value={joinCommentParts(item.comment.summary)} />
                )}

                <Debug data={item} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
