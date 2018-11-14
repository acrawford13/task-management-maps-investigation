import { Map, List } from 'immutable';
import { SELECT_TASK } from '../view/view';
import tasks from 'tasks.js'

export const SET_FOCUSED_TASK = 'SET_FOCUSED_TASK';
export const ADD_POLYLINE = 'ADD_POLYLINE';
export const ADD_PATHS = 'ADD_PATHS';
export const CLEAR_PATHS = 'CLEAR_PATHS';
export const REMOVE_POLYLINE = 'REMOVE_POLYLINE';
export const CLEAR_POLYLINES = 'CLEAR_POLYLINES';

const initialState = Map({
  focused_task: null,
  // routes: List(tasks[0].best_provider[0].transit_info.routes),
  paths: List([]),
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SELECT_TASK:
    case SET_FOCUSED_TASK:
      return state.setIn(['focused_task'], action.payload.task);
    case ADD_POLYLINE:
      return state.update('polylines', polylines => polylines.push(action.payload.polyline));
    case ADD_PATHS:
      return state.update('paths', paths => paths.push(...action.payload.paths));
    case REMOVE_POLYLINE:
      return state.update('polylines', polylines => polylines.splice(action.payload.polylineId, 1));
    case CLEAR_POLYLINES:
      return state.set('polylines', List([]));
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

export function addPolyline(polyline) {
  return {
    type: ADD_POLYLINE,
    payload: { polyline },
  };
}

export function addPaths(paths) {
  return {
    type: ADD_PATHS,
    payload: { paths },
  };
}

export function removePolyline(polylineId) {
  return {
    type: REMOVE_POLYLINE,
    payload: { polylineId },
  };
}

export function clearPolylines() {
  return {
    type: CLEAR_POLYLINES,
  };
}

export function clearPaths() {
  return {
    type: CLEAR_PATHS,
  };
}
