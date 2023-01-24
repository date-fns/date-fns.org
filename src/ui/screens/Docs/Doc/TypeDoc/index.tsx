import type { DateFnsDocs } from '@date-fns/docs/types'
import { findFnDescription, findFnExamples, findFn } from '@date-fns/docs/utils'
import { FunctionComponent, h } from 'preact'
import { useContext, useEffect, useMemo } from 'preact/hooks'
import { parse } from 'typeroo'
import { DocExamples } from '~/ui/components/DocExamples'
import { DocHeader } from '~/ui/components/DocHeader'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { DocLinks } from '~/ui/components/DocLinks'
import { DocUsage } from '~/ui/components/DocUsage'
import { Markdown } from '~/ui/components/Markdown'
import { RouterContext } from '~/ui/router'
import { Signatures } from './Signatures'
import { useTypesModal } from './Types'

interface TypeDocProps {
  page: DateFnsDocs.TypeDocPage
}

const typeHashRE = /types\/(\w+)\/(\w+)/

export const TypeDoc: FunctionComponent<TypeDocProps> = ({ page }) => {
  const { location, navigate } = useContext(RouterContext)
  const doc = useMemo(() => parse(page.doc), [page.slug])
  const fn = useMemo(() => findFn(doc), [doc])
  const description = useMemo(() => fn && findFnDescription(fn), [fn])
  const { usage, usageTabs } = useMemo(() => generateUsage(doc.name), [doc])
  const signatures = fn && fn.signatures
  const examples = useMemo(() => fn && findFnExamples(fn).map(extractCode), [
    fn,
  ])

  const showTypesModal = useTypesModal()

  useEffect(() => {
    const captures = location.hash.match(typeHashRE)
    if (!captures) return

    const type = captures[2]
    if (!type) return

    const typeId = parseInt(type)
    if (isNaN(typeId)) return

    showTypesModal({
      typeId,
      doc,
      onClose: () => {
        // TODO: Fix Switcher to allow replacing the current location
        if (location.name === '404') return
        navigate({ ...location, hash: '' })
      },
    })
  }, [window.location.href])

  return (
    <div>
      <DocHeader>{page.title}</DocHeader>

      {description && (
        <section>
          <h2 id="description">
            Description
            <DocHeaderAnchor anchor="description" />
          </h2>

          <Markdown value={description} />
        </section>
      )}

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

function extractCode(example: string): string {
  return example.match(/```ts\n([\s\S]+?)\n```/)?.[1] ?? ''
}
