import {act} from 'enso'
import I from 'immutable'
import {getItem} from '../_lib/localStorage'
import {getJSON} from 'app/_lib/request'
import {firebaseURL} from 'app/_lib/firebase'

export function fetchVersions () {
  return getJSON(firebaseURL('versionIndices'))
    .then(versionIndices => {
      const indecies = I.OrderedMap(I.fromJS(mapIndices(versionIndices)))
      const latestVersionTag = indecies.keySeq().first()
      const selectedVersionTag = getItem('selectedVersionTag') || latestVersionTag

      act(state => state
        .set('versionIndices', indecies)
        .set('latestVersionTag', latestVersionTag)
        .set('selectedVersionTag', selectedVersionTag))
    })
    // TODO:
    //.catch(reason => act(state => state.set('contributors', Object.assign(new Error('Failed to fetch contributors'), {reason}))))
}

//export function subVersions () {
  //const unsub = subGet('versionIndices', versionIndices =>
    //act(state => {
      //const nextIndecies = I.OrderedMap(I.fromJS(mapIndices(versionIndices)))
      //const latestVersionTag = nextIndecies.keySeq().first()

      //if (!state.get('versionIndices')) {
        //const selectedTag = detectSelectedTag(latestVersionTag, nextIndecies)

        //subscribeToSelected(latestVersionTag, nextIndecies)
      //}

      //return state
        //.set('latestVersionTag', nextIndecies)
        //.set('versionIndices', nextIndecies)
    //}))

  //return unsub
//}

//function detectSelectedTag (latestVersionTag, indecies) {
  //const selectedVersionTag = getItem('selectedVersionTag') || latestVersionTag
  //const currentVersionIndex = indecies.getIn([selectedVersionTag, 'index'])

  //subGetIn(['versions', currentVersionIndex], version => {
    //console.log(version)
  //})
//}

//export function subscribeToVersions() {
//}

//function subscribeToSelected (latestVersionTag, indecies) {
  //const selectedVersionTag = getItem('selectedVersionTag') || latestVersionTag
  //const currentVersionIndex = indecies.getIn([selectedVersionTag, 'index'])

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

function sort ([, {dateA}], [, {dateB}]) {
  return dateB - dateA
}
