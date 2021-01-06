import { VersionPreview } from 'db'

export function filterPreReleaseVersions (versions: VersionPreview[]) {
  return versions.filter(version => !version.preRelease)
}

export function sortVersions (versions: VersionPreview[]) {
  return [...versions].sort((versionA, versionB) => versionB.createdAt - versionA.createdAt)
}

export function getLatestVersion (versions: VersionPreview[]) {
  return sortVersions(filterPreReleaseVersions(versions))[0]
}
