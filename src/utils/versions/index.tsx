import { VersionPreview } from '@date-fns/date-fns-db'

export function filterPreReleaseVersions(
  versions: VersionPreview[],
  selectedVersion?: string
) {
  return versions.filter(
    (version) => version.version === selectedVersion || !version.preRelease
  )
}

export function sortVersions(versions: VersionPreview[]) {
  return [...versions].sort(
    (versionA, versionB) => versionB.createdAt - versionA.createdAt
  )
}

export function getLatestVersion(versions: VersionPreview[]) {
  return sortVersions(filterPreReleaseVersions(versions))[0]
}
