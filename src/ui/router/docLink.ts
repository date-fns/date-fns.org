import { DEFAULT_SUBMODULE, Submodule } from '@date-fns/date-fns-db'
import { AppRouteRef } from '~/ui/router'

export interface DocLinkParams {
  page: string
  submodule?: Submodule
  version?: string
}
export function docLink({
  page,
  submodule,
  version,
}: DocLinkParams): AppRouteRef {
  if (!submodule || submodule === DEFAULT_SUBMODULE) {
    return version
      ? {
          name: 'versionDocs',
          params: {
            page,
            version,
          },
        }
      : {
          name: 'docs',
          params: { page },
        }
  }

  return version
    ? {
        name: 'submoduleVersionDocs',
        params: {
          page,
          version,
          submodule,
        },
      }
    : {
        name: 'submoduleDocs',
        params: {
          page,
          submodule,
        },
      }
}
