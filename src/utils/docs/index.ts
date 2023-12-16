import type {
  DeclarationReflection,
  ParameterReflection,
  SignatureReflection,
  TypeParameterReflection,
} from 'typedoc'

export type ParentTypesMap = Record<number, string>

export interface Usage {
  [usageTab: string]: UsageTab | UsageTabWithOptions
}

export interface UsageBase {
  title: string
  text?: string
}

export interface UsageTab extends UsageBase {
  code: string
}

export interface UsageTabWithOptions extends UsageBase {
  code: (option: string) => string
  options: Record<string, string>
}

export interface UsageMap {
  usage: Usage
  usageTabs: string[]
}

export interface GenerateUsageOptions {
  submodule?: string
  alwaysSubmodule?: boolean
}

export function generateUsage(
  name: string,
  options?: GenerateUsageOptions
): UsageMap {
  const submodule = options?.submodule || name
  const path = `date-fns${options?.alwaysSubmodule ? `/${submodule}` : ''}`

  const usage: Usage = {
    esm: {
      code: `import { ${name} } from "${path}";`,
      title: 'ESM',
    },

    commonjs: {
      code: `const { ${name} } = require("${path}");`,
      title: 'CommonJS',
    },

    cdn: {
      title: 'CDN',
      code: (cdn) =>
        `import { ${name} } from "${cdn}/date-fns/${submodule}.mjs";`,
      options: {
        unpkg: 'https://unpkg.com',
        Skypack: 'https://cdn.skypack.dev',
        'esm.sh': 'https://esm.sh',
        JSPM: 'https://jspm.io',
        jsDelivr: 'https://cdn.jsdelivr.net/npm',
      },
    },
  }

  const usageTabs = ['esm', 'commonjs', 'cdn']

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
  const url = ref && 'sources' in ref && ref?.sources?.[0].url
  if (!url) return
  return trimHash ? url.replace(/#.*$/, '') : url
}

export function highlightMarkdown(text: string, query: string | undefined) {
  if (!query) return text
  const regex = new RegExp(query, 'gi')
  return text.replace(regex, (match) => `==${match}==`)
}

export function pageTypeHash(name: string, id: number) {
  return `#${pageTypeId(name, id)}`
}

export function pageTypeId(name: string, id: number) {
  return `page/${name}/${id}/${rand()}`
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

const pageTypeHashRE = /page\/\w+\/(\d+)(?:\/\w+)?/

export function matchPageTypeHash(hash: string) {
  const captures = hash.match(pageTypeHashRE)
  if (!captures) return

  const type = captures[1]
  if (!type) return

  const typeId = parseInt(type)
  if (isNaN(typeId)) return

  return typeId
}

export function pageTypeIdHighlightMatch(id: string, hash: string) {
  const idMatch = matchPageTypeHash(id)
  const hashMatch = matchPageTypeHash(hash)
  return (idMatch && idMatch === hashMatch) || false
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

export function parseMajorVersion(version: string) {
  const majorVersionStr = version.match(/v(\d+)/)?.[1]
  const majorVersion = majorVersionStr && parseInt(majorVersionStr)
  return majorVersion || 1
}

export function fnHasOptions(fn: DeclarationReflection | undefined) {
  return !!fn?.signatures?.find((sig) =>
    sig.parameters?.find((param) => param.name === 'options')
  )
}

export let debugTypeDoc = false
try {
  debugTypeDoc = localStorage.getItem('debug') === 'true'
} catch (_) {}
