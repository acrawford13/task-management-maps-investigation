import { Map, List } from 'immutable';
import { SELECT_TASK } from '../view/view';

export const SET_FOCUSED_TASK = 'SET_FOCUSED_TASK';
export const ADD_PATHS = 'ADD_PATHS';
export const CLEAR_PATHS = 'CLEAR_PATHS';

const initialState = Map({
  focused_task: null,
  paths: List([]),
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SELECT_TASK:
    case SET_FOCUSED_TASK:
      return state.setIn(['focused_task'], action.payload.task);
    case ADD_PATHS:
      return state.update('paths', paths => paths.push(...action.payload.paths));
    case CLEAR_PATHS:
      return state.set('paths', List([]));
    default:
      return state;
  }
}

export function setFocusedTask(task) {
  return {
    type: SET_FOCUSED_TASK,
    payload: { task },
  };
}

export function addPaths(paths) {
  return {
    type: ADD_PATHS,
    payload: { paths },
  };
}

export function clearPaths() {
  return {
    type: CLEAR_PATHS,
  };
}
