import {act} from 'enso'
import I from 'immutable'
import Version from 'app/types/version'
import Features from 'app/types/features'
import Docs from 'app/types/docs'
import Page from 'app/types/page'
import {getItem} from '../_lib/localStorage'
import {getJSON} from 'app/_lib/request'
import {firebaseURL} from 'app/_lib/firebase'

export function fetchVersions () {
  return getJSON(firebaseURL('versions'))
    .then(versionsObject => {
      const versions = versionsToOrderedMap(versionsObject)
      const latestVersionTag = versions.keySeq().first()

      act(state => state
        .set('versions', versions)
        .set('latestVersionTag', latestVersionTag))
    })
    // TODO:
    // .catch(reason => act(state => state.set('contributors', Object.assign(new Error('Failed to fetch contributors'), {reason}))))
}

export function fetchDocsIfNeeded (state, prevState) {
  const prevSelectedVersionTag = getSelectedVersionTag(prevState)
  const selectedVersionTag = getSelectedVersionTag(state)

  const versionsLoaded = (prevState ? prevState.versions.size : 0) !== state.versions.size
  const selectedVersionChanged = prevSelectedVersionTag !== selectedVersionTag

  if (selectedVersionTag && (versionsLoaded || selectedVersionChanged)) {
    const docsKey = state.getIn(['versions', selectedVersionTag, 'docsKey'])
    return fetchDocs(selectedVersionTag, docsKey)
  }
}

function fetchDocs (tag, docsKey) {
  act(state => state.remove('docs'))

  if (docsKey) {
    return getJSON(firebaseURL(`docs/${docsKey}`))
      .then(docs => {
        act(state => {
          const versionTag = state.getIn(['routeData', 'params', 'versionTag'])
          const selectedVersionTag = versionTag ? decodeURI(versionTag) : state.latestVersionTag

          if (docs && tag === selectedVersionTag) {
            return state.set('docs', Docs(I.fromJS(docs)).update('pages', (pages) => pages.map(Page)))
          } else {
            return state.remove('docs')
          }
        })
      })
  }
}

export function getSelectedVersionTag (state) {
  if (!state) {
    return null
  }

  const versionTag = state.getIn(['routeData', 'params', 'versionTag'])
  return versionTag ? decodeURI(versionTag) : state.latestVersionTag
}

function versionsToOrderedMap (versions) {
  const orderedObject = Object.values(versions)
    .sort(versionsSortFn)
    .map(versionsMapFn)

  return I.OrderedMap(orderedObject)
}

function versionsSortFn ({date: dateA}, {date: dateB}) {
  return dateB - dateA
}

function versionsMapFn (versionObject) {
  const {tag} = versionObject
  return [tag, Version(I.fromJS(versionObject).update('features', features => Features(features)))]
}
