import { fromJS, List, OrderedMap } from 'immutable';
import tasks from '../../tasks.js';
import moment from 'moment-timezone';
import { getDataset } from 'utils/datasets';

export const FIND_CLOSEST_PROVIDERS = 'FIND_CLOSEST_PROVIDERS';
export const FIND_CLOSEST_PROVIDERS_SUCCESSED = 'FIND_CLOSEST_PROVIDERS_SUCCESSED';
export const ASSIGN_TASK = 'ASSIGN_TASK';
export const UNASSIGN_TASK = 'UNASSIGN_TASK';

const taskSortByStartTime = (taskA, taskB) => {
  const aStart = moment.utc(taskA.start_time);
  const bStart = moment.utc(taskB.start_time);
  if (aStart.isBefore(bStart)) {
    return -1;
  }
  if (bStart.isBefore(aStart)) {
    return 1;
  }
  return 0;
};

const dataset = getDataset();

const initialState = OrderedMap(tasks[dataset.name].sort(taskSortByStartTime).map(value => [value.id, fromJS(value)]));

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
