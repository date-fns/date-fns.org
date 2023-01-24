import type { DateFnsDocs } from '@date-fns/docs/types'
import { findFn, findFnDescription, findFnExamples } from '@date-fns/docs/utils'
import { FunctionComponent, h } from 'preact'
import { useMemo } from 'preact/hooks'
import type { DeclarationReflection } from 'typedoc'
import { DocDescription } from '~/ui/components/DocDescription'
import { DocExamples } from '~/ui/components/DocExamples'
import { DocHeader } from '~/ui/components/DocHeader'
import { DocLinks } from '~/ui/components/DocLinks'
import { DocUsage } from '~/ui/components/DocUsage'
import { extractCodeFromTagString } from '~/utils/docs'
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
  const description = useMemo(() => fn && findFnDescription(fn), [fn])
  const { usage, usageTabs } = useMemo(() => generateUsage(doc.name), [doc])
  const signatures = fn && fn.signatures
  const examples = useMemo(
    () => fn && findFnExamples(fn).map(extractCodeFromTagString),
    [fn]
  )

  return (
    <div>
      <DocHeader>{page.title}</DocHeader>

      {description && <DocDescription description={description} />}

      <DocUsage usage={usage} usageTabs={usageTabs} />

      {signatures && <Signatures name={doc.name} signatures={signatures} />}

      {examples && <DocExamples examples={examples} />}

      <code>
        <pre>{JSON.stringify(doc, null, 2)}</pre>
      </code>

      <DocLinks />
    </div>
  )
}

function generateUsage(name: string) {
  const usage = {
    esm: {
      code: `import { ${name} } from "date-fns";`,
      title: 'ESM',
    },

    commonjs: {
      code: `const ${name} = require("date-fns/${name}");`,
      title: 'CommonJS',
    },
  }

  const usageTabs = ['esm', 'commonjs']

  return { usage, usageTabs }
}
