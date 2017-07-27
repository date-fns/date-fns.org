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
      const latestVersionTag = versions.findKey(version => !version.prerelease)

      act(state => {
        const newState = state
          .set('versions', Either.Right(versions))
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
    : state.latestVersionTag
}

function versionsToOrderedMap (versions) {
  const orderedObject = Object.values(versions)
    .sort(versionsSortFn)
    .map(versionsMapFn)

  return I.OrderedMap(orderedObject)
}

export function versionsSortFn ({ date: dateA }, { date: dateB }) {
  return dateB - dateA
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
