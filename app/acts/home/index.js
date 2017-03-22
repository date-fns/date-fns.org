import {act} from 'enso'
import I from 'immutable'
import {getItem} from '../_lib/localStorage'
import {getJSON} from 'app/_lib/request'
import {firebaseURL} from 'app/_lib/firebase'

export function fetchHomeContent () {
  // act(state => {
  //   const selectedVersionTag = state.get('selectedVersionTag')
  //   const selectedVersionIndex = state.getIn(['versions', selectedVersionTag, 'index'])
  //   getJSON(firebaseURL(`versions/${selectedVersionIndex}/gettingStarted`))
  //     .then(gettingStarted =>
  //       act(state =>
  //         state.setIn(['homeContent', selectedVersionTag, 'gettingStarted'], gettingStarted)))
  //
  //   return state
  // })
    // TODO:
    //.catch(reason => act(state => state.set('contributors', Object.assign(new Error('Failed to fetch contributors'), {reason}))))
}
