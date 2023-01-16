import { h, FunctionComponent, Fragment } from 'preact'
import type { DateFnsDocs } from '@date-fns/docs/types'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import type { ParameterReflection, TypeParameterReflection } from 'typedoc'
import { TSDocType } from '~/ui/components/TSDocType'
import { Markdown } from '~/ui/components/Markdown'
import { joinCommentParts } from '@date-fns/docs/utils'
import * as styles from './styles.css'

interface Props {
  args: TypeParameterReflection[]
  header: 'h2' | 'h3'
}

export const Generics: FunctionComponent<Props> = ({ args, header }) => {
  const headerContent = (
    <>
      Generics
      <DocHeaderAnchor anchor="generics" />
    </>
  )

  return (
    <section>
      {header === 'h2' ? (
        <h2 id="generics">{headerContent}</h2>
      ) : (
        <h3 id="generics">{headerContent}</h3>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {args.map((arg, index) => (
            <tr key={index}>
              <td>
                {arg.name}

                {arg.flags.isOptional && (
                  <div class={styles.optionalLabel}>(optional)</div>
                )}
              </td>

              <td>{arg.type && <TSDocType type={arg.type} />}</td>

              <td>
                {arg.comment?.summary && (
                  <Markdown value={joinCommentParts(arg.comment.summary)} />
                )}
                <code>
                  <pre>{JSON.stringify(arg, null, 2)}</pre>
                </code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
