import { DEFAULT_SUBMODULE, Submodule } from '@date-fns/date-fns-db'
import { AppRouteRef } from '~/ui/router'

export function docLink(
  doc: string,
  submodule: Submodule,
  version?: string
): AppRouteRef {
  if (submodule === DEFAULT_SUBMODULE) {
    return version
      ? {
          name: 'versionDocs',
          params: {
            doc,
            version,
          },
        }
      : {
          name: 'docs',
          params: { doc },
        }
  }

  return version
    ? {
        name: 'submoduleVersionDocs',
        params: {
          doc,
          version,
          submodule,
        },
      }
    : {
        name: 'submoduleDocs',
        params: {
          doc,
          submodule,
        },
      }
}
