import { fromJS, Map, List } from 'immutable';
import tasks from '../../tasks.js';

export const FIND_CLOSEST_PROVIDERS = 'FIND_CLOSEST_PROVIDERS';
export const FIND_CLOSEST_PROVIDERS_SUCCESSED = 'FIND_CLOSEST_PROVIDERS_SUCCESSED';
export const ASSIGN_TASK = 'ASSIGN_TASK';
export const UNASSIGN_TASK = 'UNASSIGN_TASK';

const initialState = Map(tasks.map(value => [value.id, fromJS(value)]));

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ASSIGN_TASK:
      return state
        .setIn([action.payload.task.id, 'assigned_provider'], action.payload.provider.id)
        .setIn([action.payload.task.id, 'status'], 'assigned');
    case UNASSIGN_TASK:
      return state
        .setIn([action.payload.task.id, 'assigned_provider'], null)
        .setIn([action.payload.task.id, 'status'], 'not_assigned');
    case FIND_CLOSEST_PROVIDERS_SUCCESSED: {
      const index = state.indexOf(state.find(task => task.get('id') === action.payload.task.id));
      return state.setIn([index, 'closest_providers'], List(action.payload.providers));
    }
    default:
      return state;
  }
}

export function findClosestProvider(task) {
  return {
    type: FIND_CLOSEST_PROVIDERS,
    payload: { task },
  };
}

export function findClosestProviderSuccessed({ task, providers }) {
  return {
    type: FIND_CLOSEST_PROVIDERS_SUCCESSED,
    payload: { task, providers },
  };
}

export function assignTask({ task, provider }) {
  return {
    type: ASSIGN_TASK,
    payload: { task, provider },
  };
}

export function unassignTask({ task, provider }) {
  return {
    type: UNASSIGN_TASK,
    payload: { task, provider },
  };
}
