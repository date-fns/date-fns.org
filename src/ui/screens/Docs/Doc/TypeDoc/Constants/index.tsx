import type { DateFnsDocs } from '@date-fns/docs/types'
import {
  findDescription,
  findSummary,
  findFnDescription,
  findFnExamples,
  findExamples,
} from '@date-fns/docs/utils'
import { Fragment, FunctionComponent, h } from 'preact'
import { useMemo } from 'preact/hooks'
import type { DeclarationReflection } from 'typedoc'
import { CodeComponent } from '~/ui/components/Code'
import { DocDescription } from '~/ui/components/DocDescription'
import { DocExamples } from '~/ui/components/DocExamples'
import { DocHeader } from '~/ui/components/DocHeader'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { DocLinks } from '~/ui/components/DocLinks'
import { extractCodeFromTagString } from '~/utils/docs'
import * as styles from './styles.css'

interface TypeDocConstantsProps {
  page: DateFnsDocs.TypeDocPage
  doc: DeclarationReflection
}

export const TypeDocConstants: FunctionComponent<TypeDocConstantsProps> = ({
  page,
  doc,
}) => {
  const description = useMemo(() => findDescription(doc), [doc])

  return (
    <>
      <DocHeader>{page.title}</DocHeader>

      {description && <DocDescription description={description} />}

      {doc.children?.map((constant) => (
        <Constant constant={constant} />
      ))}

      <code>
        <pre>{JSON.stringify(doc, null, 2)}</pre>
      </code>

      <DocLinks />
    </>
  )
}

interface ConstantProps {
  constant: DeclarationReflection
}

function Constant({ constant }: ConstantProps) {
  if (constant.kindString !== 'Variable') return null

  const description = useMemo(
    () => findDescription(constant) || findSummary(constant),
    [constant]
  )

  const examples = useMemo(
    () => findExamples(constant).map(extractCodeFromTagString),
    [constant]
  )

  return (
    <section>
      <h2 id={constant.name}>
        <span class={styles.name}>{constant.name}</span>
        <DocHeaderAnchor anchor={constant.name} />
      </h2>

      {description && <DocDescription description={description} header="h3" />}

      {examples && <DocExamples examples={examples} header="h3" />}
    </section>
  )
}
