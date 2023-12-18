import { DateFnsDocs } from '@date-fns/docs/types'
import {
  findDescription,
  findFnSummary,
  joinCommentParts,
  traverseType,
} from '@date-fns/docs/utils'
import { h } from 'preact'
import { useMemo } from 'preact/hooks'
import type { DeclarationReflection, SignatureReflection } from 'typedoc'
import { Code } from '~/ui/components/Code'
import { Debug } from '~/ui/components/Debug'
import { DocUsage } from '~/ui/components/DocUsage'
import { Item } from '~/ui/components/Item'
import { Markdown } from '~/ui/components/Markdown'
import { Missing } from '~/ui/components/Missing'
import { createModal } from '~/ui/components/Modals'
import { NoSearchResults } from '~/ui/components/NoSearchResults'
import { RichText } from '~/ui/components/RichText'
import { Search } from '~/ui/components/Search'
import { SectionHeader } from '~/ui/components/SectionHeader'
import { SourceLink } from '~/ui/components/SourceLink'
import { TypeDocInterface } from '~/ui/components/TypeDocInterface'
import { TypeDocType } from '~/ui/components/TypeDocType'
import { InlineTypeContext } from '~/ui/contexts/InlineTypeContext'
import { useActiveItem } from '~/ui/hooks/useActiveItem'
import { useQuery } from '~/ui/hooks/useQuery'
import {
  ParentTypesMap,
  findSource,
  generateTypeUsage,
  inlineTypeHash,
  inlineTypeId,
  inlineTypeIdHighlightMatch,
  typeHash,
  typeId as typeIdStr,
} from '~/utils/docs'
import * as styles from './styles.css'

export interface TypesModalProps {
  parent: string
  typeId: number
  doc: DeclarationReflection
  nestedId: number | undefined
}

interface TypeItem {
  type: DeclarationReflection
  summary: string | undefined
  description: string | undefined
}

export const useTypesModal = createModal<TypesModalProps>(
  ({ parent, typeId, doc }) => {
    const types = useMemo(() => extractTypes(doc), [doc])
    const map = useMemo(() => buildMap(types), [types])
    const type = map[typeId] as DeclarationReflection | undefined
    const parentTypesMap = useMemo(() => buildParentTypesMap(type), [type])
    const usage = useMemo(
      () => type && kindHasUsage(type.kind) && generateTypeUsage(type.name),
      [type]
    )
    const scope = type && typeIdStr(type.name, type.id)

    const { query, setQuery, searchRef } = useQuery()

    // @ts-expect-error - TypeDoc is being difficult
    const navItems: TypeItem[] = useMemo(
      () =>
        types.map((t) => {
          const summary = getSummary(t)
          const description = findDescription(t)
          return { type: t, summary, description }
        }) || [],
      [types]
    )

    const filteredNav = useMemo(
      () =>
        query
          ? navItems.filter(
              (item) =>
                item.type.name.toLowerCase().includes(query.toLowerCase()) ||
                item.summary?.toLowerCase().includes(query.toLowerCase()) ||
                item.description?.toLowerCase().includes(query.toLowerCase())
            )
          : navItems,
      [navItems, query]
    )

    const { activeRef } = useActiveItem()

    const summary = useMemo(() => type && getSummary(type), [type])

    return (
      <InlineTypeContext.Provider
        value={
          type
            ? {
                buildId: inlineTypeId.bind(null, type),
                idHighlightMatch: inlineTypeIdHighlightMatch,
                parentTypesMap,
              }
            : {}
        }
      >
        <div class={styles.wrapper}>
          <div class={styles.title}>
            <TitleIcon /> <span class={styles.titleParent}>{parent}</span> types
          </div>

          <div class={styles.main}>
            <div class={styles.nav}>
              <Search query={[query, setQuery]} inputRef={searchRef} />

              <div class={styles.list}>
                {filteredNav.length ? (
                  filteredNav.map(({ type, summary, description }) => (
                    <a href={typeHash(type.name, type.id)} class={styles.item}>
                      <Item
                        key={type.id}
                        title={type.name}
                        summary={summary || description}
                        code
                        active={type.id === typeId}
                        query={query}
                        activeRef={activeRef}
                      />
                    </a>
                  ))
                ) : (
                  <div class={styles.noResults}>
                    <NoSearchResults noun="types" query={[query, setQuery]} />
                  </div>
                )}
              </div>
            </div>

            {type ? (
              <div class={styles.content} key={type.id}>
                <div class={styles.header}>
                  <h2 class={styles.headerText}>
                    {type.name}
                    {type.kind && (
                      <span class={styles.badge[kindToBadgeStyle(type.kind)]}>
                        {kindToBadgeTitle(type.kind)}
                      </span>
                    )}
                  </h2>

                  <SourceLink source={findSource(type)} />
                </div>

                {summary && (
                  <RichText>
                    <div class={styles.summary}>
                      <Markdown value={summary} />
                    </div>
                  </RichText>
                )}

                <RichText>
                  {usage && (
                    <DocUsage
                      usage={usage.usage}
                      usageTabs={usage.usageTabs}
                      header="h3"
                      scope={scope}
                    />
                  )}

                  {type.type && (
                    <section>
                      <SectionHeader header="Type" scope={scope} tag="h3" />
                      <Code value={<TypeDocType type={type.type} />} />
                    </section>
                  )}

                  {type.typeParameters && (
                    <section>
                      <SectionHeader header="Generics" scope={scope} tag="h3" />
                      <TypeDocInterface list={type.typeParameters} />
                    </section>
                  )}

                  <TypeContent type={type} scope={scope} />
                </RichText>

                <Debug data={type} />
              </div>
            ) : (
              <div class={styles.content}>
                <Missing message="The type definition is not found." />
              </div>
            )}
          </div>
        </div>
      </InlineTypeContext.Provider>
    )
  },
  { size: 'xlarge', closeOnOverlayClick: true }
)

interface ContentProps {
  type: DeclarationReflection
  scope: string | undefined
}

function TypeContent({ type, scope }: ContentProps) {
  switch (type.kind) {
    case DateFnsDocs.ReflectionKind.Interface:
      if (!type.children?.length) return null

      return (
        <div>
          <SectionHeader header="Interface" scope={scope} tag="h3" />
          <TypeDocInterface list={type.children} />
        </div>
      )

    case DateFnsDocs.ReflectionKind.TypeParameter:
      return (
        <div>
          {
            // @ts-expect-error - TypeDoc is being difficult
            type.default && (
              <div>
                <SectionHeader header="Default type" scope={scope} tag="h3" />
                <Code
                  value={
                    <TypeDocType
                      type={
                        // @ts-expect-error - TypeDoc is being difficult
                        type.default
                      }
                    />
                  }
                />
              </div>
            )
          }
        </div>
      )

    default:
      return null
  }
}

function TitleIcon() {
  return (
    <svg
      class={styles.titleIcon}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
    >
      <path
        fill="currentColor"
        d="M415.2 21.06L255.2 501.1C252.4 509.4 243.3 513.1 234.9 511.2C226.6 508.4 222 499.3 224.8 490.9L384.8 10.94C387.6 2.554 396.7-1.977 405.1 .8175C413.4 3.612 417.1 12.67 415.2 21.06L415.2 21.06zM170.6 139.9L40.08 256L170.6 372C177.2 377.9 177.8 388 171.1 394.6C166.1 401.2 155.1 401.8 149.4 395.9L5.371 267.1C1.955 264.9 .0003 260.6 0 256C-.0003 251.4 1.954 247.1 5.37 244L149.4 116C155.1 110.2 166.1 110.8 171.1 117.4C177.8 123.1 177.2 134.1 170.6 139.9L170.6 139.9zM490.6 116L634.6 244C638 247.1 640 251.4 640 255.1C640 260.6 638 264.9 634.6 267.1L490.6 395.9C484 401.8 473.9 401.2 468 394.6C462.2 388 462.8 377.9 469.4 372L599.9 255.1L469.4 139.9C462.8 134.1 462.2 123.1 468 117.4C473.9 110.8 484 110.2 490.6 116H490.6z"
      />
    </svg>
  )
}

function extractTypes(
  dec: DeclarationReflection,
  acc?: DeclarationReflection[]
): DeclarationReflection[] {
  const types = acc || []

  dec.children?.forEach((child) => {
    switch (child.kind) {
      // Ignore these types and their children
      case DateFnsDocs.ReflectionKind.Function:
        return

      // // Process function singatures and add their type parameters
      // case 'Function':
      //   child.signatures?.forEach((signature) => {
      //     // @ts-ignore: For some reason TypeDoc contains the error, it's typeParameter not typeParameters
      //     signature.typeParameter?.forEach((param) => types.push(param))
      //   })
      //   return

      // Add these types, but not process their children
      case DateFnsDocs.ReflectionKind.Interface:
      case DateFnsDocs.ReflectionKind.TypeAlias:
      case DateFnsDocs.ReflectionKind.ObjectLiteral:
        // Ignore external, i.e. Record
        if (child.flags.isExternal) return
        types.push(child)
        return

      // Ignore the properties (i.e. weekStartsOn from Locale)
      case DateFnsDocs.ReflectionKind.Property:
        return

      default:
        console.log('~~~ UNHANDLED TYPE', child.kind, child)
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

function kindHasUsage(kind: DateFnsDocs.ReflectionKind): boolean {
  switch (kind) {
    case DateFnsDocs.ReflectionKind.TypeAlias:
    case DateFnsDocs.ReflectionKind.Interface:
      return true

    default:
      return false
  }
}

function kindToBadgeStyle(
  kind: DateFnsDocs.ReflectionKind
): keyof typeof styles.badge {
  switch (kind) {
    case DateFnsDocs.ReflectionKind.TypeAlias:
      return 'alias'

    case DateFnsDocs.ReflectionKind.Interface:
      return 'interface'

    case DateFnsDocs.ReflectionKind.TypeParameter:
      return 'generic'

    default:
      return 'alias'
  }
}

function kindToBadgeTitle(kind: DateFnsDocs.ReflectionKind): string {
  switch (kind) {
    case DateFnsDocs.ReflectionKind.ObjectLiteral:
    case DateFnsDocs.ReflectionKind.TypeAlias:
      return 'Alias'

    case DateFnsDocs.ReflectionKind.Interface:
      return 'Interface'

    case DateFnsDocs.ReflectionKind.TypeParameter:
      return 'Generic'

    default:
      return 'TODO'
  }
}

function buildParentTypesMap(
  refl: DeclarationReflection | undefined,
  type: DeclarationReflection | SignatureReflection | undefined = refl,
  accMap?: ParentTypesMap
): ParentTypesMap {
  const map: ParentTypesMap = accMap || {}

  refl &&
    // @ts-expect-error - TypeDoc is being difficult
    ((refl && type?.typeParameter) || type?.typeParameters)?.map((ref) => {
      map[ref.id] = inlineTypeHash(refl, ref)
    })

  type?.type &&
    traverseType(type.type, (ref) => {
      if (ref.type === 'reflection') {
        ref.declaration?.signatures?.forEach((signature) => {
          buildParentTypesMap(refl, signature, map)
        })
      }
    })

  return map
}

function getSummary(refl: DeclarationReflection) {
  return refl.comment?.summary
    ? joinCommentParts(refl.comment?.summary)
    : refl.type?.type === 'reflection' && findFnSummary(refl.type.declaration)
}
