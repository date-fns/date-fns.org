import { Submodule } from '@date-fns/docs/db'
import { createRouter, InferRouteRef, route } from '@switcher/preact'

export const appRoutes = [
  route('home', '/'),
  route('docs', (params: { page: string }) => `/docs/${params.page}`),
  route(
    'versionDocs',
    (params: { version: string; page: string }) =>
      `/${params.version}/docs/${params.page}`
  ),
  route(
    'submoduleDocs',
    (params: { submodule: Submodule; page: string }) =>
      `/docs/${params.submodule}/${params.page}`
  ),
  route(
    'submoduleVersionDocs',
    (params: { submodule: Submodule; version: string; page: string }) =>
      `/${params.version}/docs/${params.submodule}/${params.page}`
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
