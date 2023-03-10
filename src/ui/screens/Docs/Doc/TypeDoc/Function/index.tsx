import type { DateFnsDocs } from '@date-fns/docs/types'
import {
  findFn,
  findFnDescription,
  findFnExamples,
  traverseType,
} from '@date-fns/docs/utils'
import { FunctionComponent, h } from 'preact'
import { useMemo } from 'preact/hooks'
import type { DeclarationReflection, SignatureReflection } from 'typedoc'
import { DocDescription } from '~/ui/components/DocDescription'
import { DocExamples } from '~/ui/components/DocExamples'
import { DocHeader } from '~/ui/components/DocHeader'
import { DocLinks } from '~/ui/components/DocLinks'
import { DocUsage } from '~/ui/components/DocUsage'
import { InlineTypeContext } from '~/ui/contexts/InlineTypeContext'
import {
  extractCodeFromTagString,
  findSource,
  generateUsage,
  inlineTypeHash,
  pageTypeHash,
  pageTypeId,
  pageTypeIdHighlightMatch,
  ParentTypesMap,
} from '~/utils/docs'
import { Signatures } from './Signatures'

interface TypeDocFunctionProps {
  page: DateFnsDocs.TypeDocPage
  doc: DeclarationReflection
}

export const TypeDocFunction: FunctionComponent<TypeDocFunctionProps> = ({
  page,
  doc,
}) => {
  const fn = useMemo(() => findFn(doc), [doc])
  const parentTypesMap = useMemo(() => buildParentTypesMap(fn), [fn])
  const description = useMemo(() => fn && findFnDescription(fn), [fn])
  const { usage, usageTabs } = useMemo(() => generateUsage(doc.name), [doc])
  const signatures = fn && fn.signatures
  const examples = useMemo(
    () => fn && findFnExamples(fn).map(extractCodeFromTagString),
    [fn]
  )

  console.log('+++++++++++++++++++++++', parentTypesMap)

  return (
    <InlineTypeContext.Provider
      value={{
        buildId: (refl) => pageTypeId(refl.name, refl.id),
        idHighlightMatch: pageTypeIdHighlightMatch,
        parentTypesMap,
      }}
    >
      <DocHeader source={findSource(fn)}>{page.title}</DocHeader>

      {description && <DocDescription description={description} skipHeader />}

      <DocUsage usage={usage} usageTabs={usageTabs} />

      {signatures && <Signatures name={doc.name} signatures={signatures} />}

      {examples && <DocExamples examples={examples} />}

      <code>
        <pre>{JSON.stringify(doc, null, 2)}</pre>
      </code>

      <DocLinks />
    </InlineTypeContext.Provider>
  )
}

function buildParentTypesMap(
  refl: DeclarationReflection | undefined
): ParentTypesMap {
  const map: ParentTypesMap = {}

  refl?.signatures?.forEach((signature) => {
    signature?.typeParameter?.map((r) => {
      map[r.id] = pageTypeHash(r.name, r.id)
    })
  })

  return map
}
