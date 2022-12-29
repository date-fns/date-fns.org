import { defaultSubmodule, Submodule } from '@date-fns/docs/db'
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
  if (!submodule || submodule === defaultSubmodule) {
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
