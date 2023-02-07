import type {
  DeclarationReflection,
  ParameterReflection,
  SignatureReflection,
  TypeParameterReflection,
} from 'typedoc'

export type ParentTypesMap = Record<number, string>

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

export function generateTypeUsage(name: string) {
  const usage = {
    esm: {
      code: `import type { ${name} } from "date-fns";`,
      title: 'ESM',
    },
  }

  const usageTabs = ['esm']

  return { usage, usageTabs }
}

export function extractCodeFromTagString(example: string): string {
  return example.match(/```ts\n([\s\S]+?)\n```/)?.[1] ?? ''
}

export function findSource(
  ref:
    | ParameterReflection
    | DeclarationReflection
    | TypeParameterReflection
    | undefined,
  trimHash = false
) {
  const url = ref?.sources?.[0].url
  if (!url) return
  return trimHash ? url.replace(/#.*$/, '') : url
}

export function hightlightMarkdown(text: string, query: string) {
  if (!query) return text
  const regex = new RegExp(query, 'gi')
  return text.replace(regex, (match) => `==${match}==`)
}

export function typeHash(name: string, id: number, nested?: string) {
  return `#${typeId(name, id, nested)}`
}

export function typeId(name: string, id: number, nested?: string) {
  return `types/${name}/${id}${nested ? `/${nested}` : ''}`
}

const typeHashRE = /types\/\w+\/(\d+)(?:\/\w+\/(\d+)(?:\/\w+))?/

export function matchTypeHash(hash: string) {
  const captures = hash.match(typeHashRE)
  if (!captures) return {}

  const type = captures[1]
  if (!type) return {}

  const typeId = parseInt(type)
  if (isNaN(typeId)) return {}

  const nestedId = captures[2] ? parseInt(captures[2]) : undefined

  return { typeId, nestedId }
}

export function inlineTypeHash(
  refl: DeclarationReflection,
  type: TypeParameterReflection | ParameterReflection | DeclarationReflection
) {
  return `#${inlineTypeId(refl, type)}`
}

export function inlineTypeId(
  refl: DeclarationReflection,
  type: TypeParameterReflection | ParameterReflection | DeclarationReflection
) {
  return typeId(refl.name, refl.id, `${type.name}/${type.id}/${rand()}`)
}

export function inlineTypeIdHighlightMatch(id: string, hash: string) {
  const idMatches = matchTypeHash(id)
  const hashMatches = matchTypeHash(hash)
  return (
    idMatches.typeId === hashMatches.typeId &&
    idMatches.nestedId === hashMatches.nestedId
  )
}

function rand() {
  return btoa(Math.random().toString().slice(2, 5)).slice(0, 3)
}
