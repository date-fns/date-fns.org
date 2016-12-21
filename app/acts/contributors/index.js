import {act} from 'enso'
import I from 'immutable'
import {getJSON} from 'app/_lib/request'

export function fetchContributors () {
  return getJSON('https://api.github.com/repos/date-fns/date-fns/contributors')
    .then(contributors => act(state => state.set('contributors', I.fromJS(contributors))))
    .catch(reason => act(state => state.set('contributors', Object.assign(new Error('Failed to fetch contributors'), {reason}))))
}
