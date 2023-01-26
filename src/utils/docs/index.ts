import type { DeclarationReflection } from 'typedoc'

export function generateUsage(name: string, module = name) {
  const usage = {
    esm: {
      code: `import { ${name} } from "date-fns";`,
      title: 'ESM',
    },

    commonjs: {
      code: `const ${name} = require("date-fns/${module}");`,
      title: 'CommonJS',
    },
  }

  const usageTabs = ['esm', 'commonjs']

  return { usage, usageTabs }
}

export function extractCodeFromTagString(example: string): string {
  return example.match(/```ts\n([\s\S]+?)\n```/)?.[1] ?? ''
}

export function findSource(ref: DeclarationReflection, trimHash = false) {
  const url = ref.sources?.[0].url
  if (!url) return
  return trimHash ? url.replace(/#.*$/, '') : url
}

export function hightlightMarkdown(text: string, query: string) {
  if (!query) return text
  const regex = new RegExp(query, 'gi')
  return text.replace(regex, (match) => `==${match}==`)
}
