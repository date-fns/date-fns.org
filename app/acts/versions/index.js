import {act} from 'enso'
import I from 'immutable'
import {getItem} from '../_lib/localStorage'
import {getJSON} from 'app/_lib/request'
import {firebaseURL} from 'app/_lib/firebase'

export function fetchVersionIndices () {
  return getJSON(firebaseURL('versionIndices'))
    .then(versionIndices => {
      const indices = I.OrderedMap(I.fromJS(mapIndices(versionIndices)))
      const latestVersionTag = indices.keySeq().first()
      const selectedVersionTag = getItem('selectedVersionTag') || latestVersionTag

      act(state => state
        .set('versionIndices', indices)
        .set('latestVersionTag', latestVersionTag)
        .set('selectedVersionTag', selectedVersionTag))
    })
    // TODO:
    //.catch(reason => act(state => state.set('contributors', Object.assign(new Error('Failed to fetch contributors'), {reason}))))
}

export function fetchVersion (versionIndices, tag) {
  const index = versionIndices.find(versionIndex => versionIndex.tag === tag).index

  return getJSON(firebaseURL(`versions/${index}`))
    .then(version => {
      act(state => state.set('selectedVersion', version))
    })
}

//export function subVersions () {
  //const unsub = subGet('versionIndices', versionIndices =>
    //act(state => {
      //const nextIndices = I.OrderedMap(I.fromJS(mapIndices(versionIndices)))
      //const latestVersionTag = nextIndices.keySeq().first()

      //if (!state.get('versionIndices')) {
        //const selectedTag = detectSelectedTag(latestVersionTag, nextIndices)

        //subscribeToSelected(latestVersionTag, nextIndices)
      //}

      //return state
        //.set('latestVersionTag', nextIndices)
        //.set('versionIndices', nextIndices)
    //}))

  //return unsub
//}

//function detectSelectedTag (latestVersionTag, indices) {
  //const selectedVersionTag = getItem('selectedVersionTag') || latestVersionTag
  //const currentVersionIndex = indices.getIn([selectedVersionTag, 'index'])

  //subGetIn(['versions', currentVersionIndex], version => {
    //console.log(version)
  //})
//}

//export function subscribeToVersions() {
//}

//function subscribeToSelected (latestVersionTag, indices) {
  //const selectedVersionTag = getItem('selectedVersionTag') || latestVersionTag
  //const currentVersionIndex = indices.getIn([selectedVersionTag, 'index'])

  //subGetIn(['versions', currentVersionIndex], version => {
    //console.log(version)
  //})
//}

function mapIndices (indices) {
  return Object.values(indices)
    .map(versionsToOrderedMap)
    .sort(sort)
}

function versionsToOrderedMap ({tag, ...meta}) {
  return [tag, I.fromJS(meta)]
}

function sort ([, metaA], [, metaB]) {
  const dateA = metaA.get('date')
  const dateB = metaB.get('date')
  return dateB - dateA
}
