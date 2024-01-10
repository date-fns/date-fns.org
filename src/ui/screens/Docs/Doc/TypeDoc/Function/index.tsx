import type { DateFnsDocs } from '@date-fns/docs/types'
import {
  findFn,
  findFnDescription,
  findFnExamples,
  findSummary,
  findTags,
} from '@date-fns/docs/utils'
import { FunctionComponent, h } from 'preact'
import { useMemo } from 'preact/hooks'
import type { DeclarationReflection } from 'typedoc'
import { Debug } from '~/ui/components/Debug'
import { DocDescription } from '~/ui/components/DocDescription'
import { DocExamples } from '~/ui/components/DocExamples'
import { DocHeader } from '~/ui/components/DocHeader'
import { DocLinks } from '~/ui/components/DocLinks'
import { DocUsage } from '~/ui/components/DocUsage'
import { InlineTypeContext } from '~/ui/contexts/InlineTypeContext'
import {
  ParentTypesMap,
  extractCodeFromTagString,
  findSource,
  fnHasOptions,
  generateUsage,
  pageTypeHash,
  pageTypeId,
  pageTypeIdHighlightMatch,
} from '~/utils/docs'
import { Aliases } from './Aliases'
import { FP } from './FP'
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
  const description = useMemo(
    () => fn && (findFnDescription(fn) || findSummary(fn)),
    [fn]
  )
  const { usage, usageTabs } = useMemo(() => generateUsage(doc.name), [doc])
  const aliases = useMemo(() => fn && findTags(fn, '@alias'), [fn]);
  const signatures = fn && fn.signatures
  const examples = useMemo(
    () => fn && findFnExamples(fn).map(extractCodeFromTagString),
    [fn]
  )

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

      <FP
        name={doc.name}
        selectedVersion={page.version}
        pure={page.pure}
        hasOptions={fnHasOptions(fn)}
      />

      {aliases && <Aliases aliases={aliases} />}

      {signatures && <Signatures name={doc.name} signatures={signatures} />}

      {!signatures && examples && <DocExamples examples={examples} />}

      <Debug data={doc} />

      <DocLinks />
    </InlineTypeContext.Provider>
  )
}

function buildParentTypesMap(
  refl: DeclarationReflection | undefined
): ParentTypesMap {
  const map: ParentTypesMap = {}

  refl?.signatures?.forEach((signature) => {
    // @ts-expect-error - TypeDoc is being difficult
    signature?.typeParameter?.map((r) => {
      map[r.id] = pageTypeHash(r.name, r.id)
    })
  })

  return map
}
