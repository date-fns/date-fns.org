import { joinCommentParts } from '@date-fns/docs/utils'
import { h } from 'preact'
import { useMemo } from 'preact/hooks'
import type { DeclarationReflection } from 'typedoc'
import { TypeDocInterface } from '~/ui/components/TypeDocInterface'
import { Item } from '~/ui/components/Item'
import { Markdown } from '~/ui/components/Markdown'
import { createModal } from '~/ui/components/Modals'
import { RichText } from '~/ui/components/RichText'
import { TypeDocType } from '~/ui/components/TypeDocType'
import * as styles from './styles.css'

export interface TypesModalProps {
  typeId: number
  doc: DeclarationReflection
}

export const useTypesModal = createModal<TypesModalProps>(
  ({ typeId, doc }) => {
    const types = useMemo(() => extractTypes(doc), [doc])
    const map = useMemo(() => buildMap(types), [types])
    const type = map[typeId]

    console.log('>>> TYPE', type)

    return (
      <div class={styles.wrapper}>
        <div class={styles.nav}>
          {types.map((type) => (
            <a href={`#types/${type.name}/${type.id}`} class={styles.item}>
              <Item
                key={type.id}
                title={type.name}
                summary={
                  type.comment?.summary &&
                  joinCommentParts(type.comment.summary)
                }
                code
                selected={type.id === typeId}
              />
            </a>
          ))}
        </div>

        {type ? (
          <div class={styles.content}>
            <h2 class={styles.header}>
              {type.name}{' '}
              {type.kindString && (
                <span class={styles.badge[kindToBadgeStyle(type.kindString)]}>
                  {kindToBadgeTitle(type.kindString)}
                </span>
              )}
            </h2>

            {type.comment?.summary && (
              <RichText>
                <div class={styles.summary}>
                  <Markdown value={joinCommentParts(type.comment.summary)} />
                </div>
              </RichText>
            )}

            <RichText>
              {type.type && (
                <div>
                  <h3>Type</h3>

                  <div class={styles.code}>
                    <TypeDocType type={type.type} />
                  </div>
                </div>
              )}

              {type.typeParameters && (
                <div>
                  <h3>Generics</h3>

                  <TypeDocInterface list={type.typeParameters} />
                </div>
              )}

              <TypeContent type={type} />
            </RichText>

            <code>
              <pre>{JSON.stringify(type, null, 2)}</pre>
            </code>
          </div>
        ) : (
          <div class={styles.content}>
            The type definition is not found. If you see this,{' '}
            <a href="https://twitter.com/kossnocorp">ping me</a>.
          </div>
        )}
      </div>
    )
  },
  { size: 'xlarge', closeOnOverlayClick: true }
)

interface ContentProps {
  type: DeclarationReflection
}

function TypeContent({ type }: ContentProps) {
  switch (type.kindString) {
    case 'Interface':
      if (!type.children?.length) return null

      return (
        <div>
          <h3>Interface</h3>
          <TypeDocInterface list={type.children} />
        </div>
      )

    case 'Type parameter':
      return (
        <div>
          {type.default && (
            <div>
              <h3>Default type</h3>

              <div class={styles.code}>
                <TypeDocType type={type.default} />
              </div>
            </div>
          )}
        </div>
      )

    default:
      return null
  }
}

function extractTypes(
  dec: DeclarationReflection,
  acc?: DeclarationReflection[]
): DeclarationReflection[] {
  const types = acc || []

  dec.children?.forEach((child) => {
    switch (child.kindString) {
      // Ignore these types and their children
      case 'Module':
        return

      // Process function singatures and add their type parameters
      case 'Function':
        child.signatures?.forEach((signature) => {
          // @ts-ignore: For some reason TypeDoc contains the error, it's typeParameter not typeParameters
          signature.typeParameter?.forEach((param) => types.push(param))
        })
        return

      // Add these types, but not process their children
      case 'Interface':
      case 'Type alias':
        types.push(child)
        return

      default:
        console.log('~~~ UNHANDLED TYPE', child.kindString, child)
    }

    if (child.children) extractTypes(child, types)
  })

  return types
}

function buildMap(types: DeclarationReflection[]) {
  const map: Record<number, DeclarationReflection> = {}

  types.forEach((type) => {
    map[type.id] = type
  })

  return map
}

function kindToBadgeStyle(kindString: string): keyof typeof styles.badge {
  switch (kindString) {
    case 'Type alias':
      return 'alias'

    case 'Interface':
      return 'interface'

    case 'Type parameter':
      return 'generic'

    default:
      return 'alias'
  }
}

function kindToBadgeTitle(kindString: string): string {
  switch (kindString) {
    case 'Type alias':
      return 'Alias'

    case 'Interface':
      return 'Interface'

    case 'Type parameter':
      return 'Generic'

    default:
      return 'TODO'
  }
}
