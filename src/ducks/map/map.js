import { Map } from 'immutable';
import { SELECT_TASK } from '../view/view';

export const SET_FOCUSED_TASK = 'SET_FOCUSED_TASK';

const initialState = Map({
  focused_task: null,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SELECT_TASK:
    case SET_FOCUSED_TASK:
      return state.setIn(['focused_task'], action.payload.task);
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