import { CSSComponent } from 'types/decss'

export const enum IconType {
  modular = 'modular',
  native = 'native',
  immutable = 'immutable',
  types = 'types',
  fp = 'fp',
  consistent = 'consistent',
  i18n = 'i18n',
  reliable = 'reliable',
  simple = 'simple',
  fast = 'fast',
  docs = 'docs',
  coming = 'coming'
}

export const List: CSSComponent
export const Item: CSSComponent
export const Icon: CSSComponent<{ type: IconType }>
export const Content: CSSComponent
export const Title: CSSComponent
export const Description: CSSComponent
