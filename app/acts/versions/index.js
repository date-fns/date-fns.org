import {act} from 'enso'
import I from 'immutable'
import {getItem} from '../_lib/localStorage'
import {getJSON} from 'app/_lib/request'
import {firebaseURL} from 'app/_lib/firebase'

export function fetchVersions () {
  return getJSON(firebaseURL('versions'))
    .then(versionsObject => {
      const versions = I.OrderedMap(I.fromJS(mapVersions(versionsObject)))
      const latestVersionTag = versions.keySeq().first()
      const selectedVersionTag = getItem('selectedVersionTag') || latestVersionTag
      const selectedVersion = versions.get(selectedVersionTag)

      act(state => state
        .set('versions', versions)
        .set('latestVersionTag', latestVersionTag)
        .set('selectedVersionTag', selectedVersionTag)
        .set('selectedVersion', selectedVersion))
    })
    // TODO:
    //.catch(reason => act(state => state.set('contributors', Object.assign(new Error('Failed to fetch contributors'), {reason}))))
}

export function changeSelectedVersion (tag) {
  act(state => state
    .set('selectedVersionTag', tag)
    .set('selectedVersion', state.getIn(['versions', tag], I.Map()))
    .remove('docs'))
}

export function fetchDocs (versions, tag) {
  const docsKey = versions.getIn([tag, 'docsKey'])

  if (!docsKey) {
    act(state => state.remove('docs'))
  } else {
    return getJSON(firebaseURL(`docs/${docsKey}`))
      .then(docs => {
        act(state => {
          if (state.get('selectedVersionTag') === tag && !state.get('docs') && docs) {
            return state.set('docs', I.fromJS(docs))
          } else {
            return state.remove('docs')
          }
        })
      })
  }
}

// export function fetchVersion (versionIndices, tag) {
//   const index = versionIndices.get(tag).get('index')
//
//   return getJSON(firebaseURL(`versions/${index}`))
//     .then(version => {
//       act(state => state.set('selectedVersion', version))
//     })
// }

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

function mapVersions (version) {
  return Object.values(version)
    .map(versionToOrderedMap)
    .sort(sort)
}

function versionToOrderedMap ({tag, ...meta}) {
  return [tag, I.fromJS(meta)]
}

function sort ([, metaA], [, metaB]) {
  const dateA = metaA.get('date')
  const dateB = metaB.get('date')
  return dateB - dateA
}
