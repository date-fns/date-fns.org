import { act } from 'enso'
import I from 'immutable'
import Either from 'app/types/either'
import { getJSON } from 'app/_lib/request'

export function fetchContributors () {
  return getJSON('https://api.github.com/repos/date-fns/date-fns/contributors?per_page=999')
    .then(contributors =>
      act(state =>
        state.set('contributors', Either.Right(I.fromJS(contributors)))
      )
    )
    .catch(reason =>
      act(state =>
        state.set(
          'contributors',
          Either.Left({ message: 'Failed to fetch contributors', reason })
        )
      )
    )
}
