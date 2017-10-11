import { act } from 'enso'
import I from 'immutable'
import Version from 'app/types/version'
import Features from 'app/types/features'
import Docs from 'app/types/docs'
import Page from 'app/types/page'
import Either from 'app/types/either'
import { getJSON } from 'app/_lib/request'
import { firebaseURL } from 'app/_lib/firebase'

export function fetchVersions () {
  return getJSON(firebaseURL('versions'))
    .then(versionsObject => {
      const versions = versionsToOrderedMap(versionsObject)
      const latestStableVersionTag = versions.findKey(version => !version.prerelease)
      const latestVersionTag = versions.first().get('tag')

      act(state => {
        const newState = state
          .set('versions', Either.Right(versions))
          .set('latestStableVersionTag', Either.Right(latestStableVersionTag))
          .set('latestVersionTag', Either.Right(latestVersionTag))

        fetchDocs(newState)

        return newState
      })
    })
    .catch(reason => {
      const err = { message: 'Failed to fetch version list', reason }
      act(state =>
        state
          .set('versions', Either.Left(err))
          .set('latestStableVersionTag', Either.Left(err))
          .set('latestVersionTag', Either.Left(err))
          .set('docs', Either.Left(err))
      )
    })
}

export function onVersionChange (state, prevState) {
  if (!state || !prevState) {
    return null
  }

  getSelectedVersionTag(state).map(tag => {
    getSelectedVersionTag(prevState)
      .chain(
        prevTag =>
          tag === prevTag
            ? Either.Left(/* version not changed */)
            : Either.Right()
      )
      .chain(() => {
        // Fetch docs if version changed
        fetchDocs(state)
        return state.versions
      })
      .map(versions => versions.get(tag))
      .map(version => !areSubmodulesAvailable(version))
      .map(submodulesUnavailable => {
        if (submodulesUnavailable) {
          act(state => state.set('submodule', ''))
        }
      })
  })
}

function fetchDocs (state) {
  Either.of(tag => versions => ({ tag, docsKey: versions.get(tag).docsKey }))
    .ap(getSelectedVersionTag(state))
    .ap(state.versions)
    .map(({ tag, docsKey }) => {
      act(state =>
        state.set('docs', Either.Left({ message: 'Loading docs...' }))
      )

      getJSON(firebaseURL(`docs/${docsKey}`))
        .then(docsJSON => {
          act(state =>
            getSelectedVersionTag(state)
              .chain(selectedVersionTag => {
                if (docsJSON && tag === selectedVersionTag) {
                  return Either.Right(
                    Docs(I.fromJS(docsJSON)).update('pages', pages =>
                      pages.map(Page)
                    )
                  )
                } else {
                  return Either.Left()
                }
              })
              .map(docs => state.set('docs', Either.Right(docs)))
              .getOrElse(state)
          )
        })
        .catch(reason => {
          const err = { message: 'Failed to fetch documentation', reason }
          act(state => state.set('docs', Either.Left(err)))
        })
    })
}

export function getSelectedVersionTag (state) {
  if (!state) {
    return Either.Left({ message: 'Loading...' })
  }

  const versionTag = state.getIn(['routeData', 'params', 'versionTag'])
  return versionTag
    ? Either.Right(decodeURI(versionTag))
    : state.latestStableVersionTag
}

function versionsToOrderedMap (versions) {
  const orderedObject = Object.values(versions)
    .sort(versionsSortFn)
    .map(versionsMapFn)

  return I.OrderedMap(orderedObject)
}

export function versionsSortFn ({ tag: tagA }, { tag: tagB }) {
  return versionToSortableNumber(tagB) - versionToSortableNumber(tagA)
}

function versionsMapFn (versionObject) {
  const { tag } = versionObject
  return [
    tag,
    Version(
      I.fromJS(versionObject).update('features', features => Features(features))
    )
  ]
}

export function areSubmodulesAvailable (version) {
  const { features } = version
  return features.fp || features.utc
}

function versionToSortableNumber(version) {
  return version
    .replace('v', '')
    .replace('alpha', 1)
    .replace('beta', 2)
    .replace('rc', 3)
    .split(/[\.-]/g)
    .reduce(
      (acc, numStr, index) =>
        acc + parseInt(numStr) * Math.pow(1000, 5 - index),
      Math.pow(10, 20)
    )
}
