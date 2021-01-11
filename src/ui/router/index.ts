import { Submodule } from '@date-fns/date-fns-db'
import { createRouter, InferRouteRef, route } from '@switcher/preact'

export const appRoutes = [
  route('home', '/'),
  route('docs', (params: { doc: string }) => `/docs/${params.doc}`),
  route(
    'versionDocs',
    (params: { version: string; doc: string }) =>
      `/${params.version}/docs/${params.doc}`
  ),
  route(
    'submoduleDocs',
    (params: { submodule: Submodule; doc: string }) =>
      `/docs/${params.submodule}/${params.doc}`
  ),
  route(
    'submoduleVersionDocs',
    (params: { submodule: Submodule; version: string; doc: string }) =>
      `/${params.version}/docs/${params.submodule}/${params.doc}`
  ),
]

export const {
  buildHref,
  useRouter,
  RouterContext,
  RouterLink,
  resolveLocation,
  refToLocation,
} = createRouter(appRoutes)

// Type to use in prop definitions
export type AppRouteRef = InferRouteRef<typeof appRoutes>
