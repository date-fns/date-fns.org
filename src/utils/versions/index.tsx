import type { DateFnsDocs } from '@date-fns/docs'

export function filterPreReleaseVersions(
  versions: DateFnsDocs.VersionPreview[],
  selectedVersion?: string
) {
  return versions.filter(
    (version) => version.version === selectedVersion || !version.preRelease
  )
}

export function sortVersions(versions: DateFnsDocs.VersionPreview[]) {
  return [...versions].sort(
    (versionA, versionB) => versionB.createdAt - versionA.createdAt
  )
}

export function getLatestVersion(versions: DateFnsDocs.VersionPreview[]) {
  return sortVersions(filterPreReleaseVersions(versions))[0]
}
