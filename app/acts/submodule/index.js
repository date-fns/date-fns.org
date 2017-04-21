import {act} from 'enso'

export function changeSubmodule (value) {
  act(state => state.set('submodule', value))
}
