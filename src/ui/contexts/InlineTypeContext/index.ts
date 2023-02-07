import { createContext } from 'preact'
import type {
  DeclarationReflection,
  ParameterReflection,
  TypeParameterReflection,
} from 'typedoc'

export type ParentTypesMap = Record<number, string>

export interface InlineTypeContextValue {
  buildId?: (
    ref: TypeParameterReflection | ParameterReflection | DeclarationReflection
  ) => string
  idHighlightMatch?: (id: string, hash: string) => boolean
  parentTypesMap?: ParentTypesMap
}

export const InlineTypeContext = createContext<InlineTypeContextValue>({})
