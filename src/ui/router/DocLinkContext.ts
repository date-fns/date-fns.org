import { createContext } from 'preact'
import { DEFAULT_SUBMODULE } from '@date-fns/date-fns-db'
import { DocLinkParams } from '~/ui/router/docLink'

export const DocLinkContext = createContext<Omit<DocLinkParams, 'page'>>({
  submodule: DEFAULT_SUBMODULE,
})
