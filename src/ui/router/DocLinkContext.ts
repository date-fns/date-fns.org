import { createContext } from 'preact'
import { defaultSubmodule } from '@date-fns/docs/db'
import { DocLinkParams } from '~/ui/router/docLink'

export const DocLinkContext = createContext<Omit<DocLinkParams, 'page'>>({
  submodule: defaultSubmodule,
})
