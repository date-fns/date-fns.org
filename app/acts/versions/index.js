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
      const selectedVersionTag = getItem('selectedVersionTag') || versions.keySeq().first()
      const selectedVersion = versions.get(selectedVersionTag)

      act(state => state
        .set('versions', versions)
        .set('selectedVersion', selectedVersion))
    })
    // TODO:
    // .catch(reason => act(state => state.set('contributors', Object.assign(new Error('Failed to fetch contributors'), {reason}))))
}

export function changeSelectedVersion (tag) {
  act(state => state
    .set('selectedVersion', state.versions.get(tag))
    .remove('docs'))
}

export function fetchDocs (tag, docsKey) {
  if (!docsKey) {
    act(state => state.remove('docs'))
  } else {
    return getJSON(firebaseURL(`docs/${docsKey}`))
      .then(docs => {
        act(state => {
          if (docs && !state.docs.tag && docs.tag === tag) {
            return state.set('docs', Docs(I.fromJS(docs)).update('pages', (pages) => pages.map(Page)))
          } else {
            return state.remove('docs')
          }
        })
      })
  }
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
