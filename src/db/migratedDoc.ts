export type MigratedDocType = {
  names: string[]
}

export type MigratedDocTypedAttribute = {
  description: string
  type: MigratedDocType
}

type MigratedDocException = MigratedDocTypedAttribute
type MigratedDocReturn = MigratedDocTypedAttribute
// TODO: test defaultvalue, variable, props
export type MigratedDocParam = MigratedDocTypedAttribute & {
  name: string
  optional?: boolean
  defaultvalue?: string
  variable?: boolean
  props?: MigratedDocParam[]
}

export type MigratedDocUsage = {
  [usageTab: string]: {
    code: string
    title: string
    text?: string
  }
}

/**
 * Documentation page migrated from old date-fns.org realtime database
 */
export type MigratedDocFunction = {
  args?: MigratedDocParam[]
  category: string
  content: {
    category: string
    description: string
    examples: string[]
    exceptions: MigratedDocException[]
    id: string
    kind: string
    longname: string
    meta: {
      filename: string
      lineno: number
      path: string
    }
    name: string
    order: number
    properties?: MigratedDocParam[]
    params?: MigratedDocParam[]
    returns?: MigratedDocReturn[]
    scope: string
    summary: string
    type?: MigratedDocType
  }
  description: string
  isFPFn?: boolean
  kind: 'function' | 'typedef'
  relatedDocs?: {
    default?: string
    fp?: string
    fpWithOptions?: string
  }
  syntax?: string
  title: string
  type: 'jsdoc'
  urlId: string
  usage?: MigratedDocUsage
  usageTabs?: string[]
}
