import type { DateFnsDocs } from '@date-fns/docs/types'
import {
  findDescription,
  findExamples,
  findSummary,
} from '@date-fns/docs/utils'
import { Fragment, FunctionComponent, h } from 'preact'
import { useMemo, useState } from 'preact/hooks'
import type { DeclarationReflection } from 'typedoc'
import { Code } from '~/ui/components/Code'
import { Debug } from '~/ui/components/Debug'
import { DocDescription } from '~/ui/components/DocDescription'
import { DocExamples } from '~/ui/components/DocExamples'
import { DocHeader } from '~/ui/components/DocHeader'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { DocLinks } from '~/ui/components/DocLinks'
import { DocUsage } from '~/ui/components/DocUsage'
import { Entities } from '~/ui/components/Entities'
import { HighlightQuery } from '~/ui/components/HighlightQuery'
import { NoSearchResults } from '~/ui/components/NoSearchResults'
import { Search } from '~/ui/components/Search'
import { SectionHeader } from '~/ui/components/SectionHeader'
import { SourceLink } from '~/ui/components/SourceLink'
import { TypeDocType } from '~/ui/components/TypeDocType'
import {
  extractCodeFromTagString,
  findSource,
  generateUsage,
  hightlightMarkdown,
} from '~/utils/docs'
import * as styles from './styles.css'

interface TypeDocConstantsProps {
  page: DateFnsDocs.TypeDocPage
  doc: DeclarationReflection
}

interface ConstantItem {
  constant: DeclarationReflection
  summary: string | undefined
  description: string | undefined
}

export const TypeDocConstants: FunctionComponent<TypeDocConstantsProps> = ({
  page,
  doc,
}) => {
  const description = useMemo(() => findDescription(doc), [doc])

  const [query, setQuery] = useState('')

  const constants: ConstantItem[] = useMemo(
    () =>
      doc.children?.map((constant) => {
        const summary = findSummary(constant)
        const description = findDescription(constant)
        return { constant, summary, description }
      }) || [],
    [doc]
  )

  const filtered = useMemo(
    () =>
      query
        ? constants.filter(
            (item) =>
              item.constant.name.toLowerCase().includes(query.toLowerCase()) ||
              item.summary?.toLowerCase().includes(query.toLowerCase()) ||
              item.description?.toLowerCase().includes(query.toLowerCase())
          )
        : constants,
    [constants, query]
  )

  return (
    <>
      <DocHeader source={findSource(doc, true)}>{page.title}</DocHeader>

      {description && <DocDescription description={description} />}

      <section class={styles.list}>
        <div class={styles.search}>
          <Search query={[query, setQuery]} bordered />
        </div>

        {filtered.length ? (
          <Entities alwaysMulti>
            {filtered.map((item) => (
              <Constant item={item} query={query} />
            ))}
          </Entities>
        ) : (
          <NoSearchResults noun="constants" query={query} setQuery={setQuery} />
        )}
      </section>

      <DocLinks />
    </>
  )
}

interface ConstantProps {
  item: ConstantItem
  query: string
}

function Constant({ item, query }: ConstantProps) {
  const constant = item.constant
  const name = constant.name
  const description = item.description || item.summary

  if (constant.kindString !== 'Variable') return null

  const { usage, usageTabs } = useMemo(() => generateUsage(name, 'constants'), [
    item,
  ])

  const examples = useMemo(
    () => findExamples(constant).map(extractCodeFromTagString),
    [item]
  )

  return (
    <section>
      <h2 id={name}>
        <span class={styles.name}>
          <HighlightQuery text={name} query={query} />
        </span>

        <SourceLink source={findSource(constant)} size="small" />

        <DocHeaderAnchor anchor={name} />
      </h2>

      {description && (
        <DocDescription
          description={hightlightMarkdown(description, query)}
          scope={name}
          header="h3"
        />
      )}

      <DocUsage usage={usage} usageTabs={usageTabs} scope={name} header="h3" />

      {constant.type && (
        <section>
          <SectionHeader header="Type" scope={name} tag="h3" />
          <Code value={<TypeDocType type={constant.type} />} />
        </section>
      )}

      {examples.length > 0 && (
        <DocExamples examples={examples} scope={name} header="h3" />
      )}
    </section>
  )
}
