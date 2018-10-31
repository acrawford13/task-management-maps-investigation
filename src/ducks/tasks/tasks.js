import { fromJS, List } from 'immutable';
import tasks from '../../tasks.js';

export const FIND_CLOSEST_PROVIDERS = 'FIND_CLOSEST_PROVIDERS';
export const FIND_CLOSEST_PROVIDERS_SUCCESSED = 'FIND_CLOSEST_PROVIDERS_SUCCESSED';

export default function reducer(state = fromJS(tasks), action = {}) {
  switch(action.type) {
    case FIND_CLOSEST_PROVIDERS_SUCCESSED:
      const index = state.indexOf(state.find(task => task.get('id') === action.payload.task.id));
      console.log(index);
      return state.setIn([index, 'closest_providers'], List(action.payload.providers));
    default: return state;
  }
}

export function findClosestProvider(task) {
  return {
    type: FIND_CLOSEST_PROVIDERS,
    payload: { task }
  }
}

export function findClosestProviderSuccessed({ task, providers }) {
  return {
    type: FIND_CLOSEST_PROVIDERS_SUCCESSED,
    payload: { task, providers }
  }
}