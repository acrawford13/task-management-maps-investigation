import { fromJS, Map } from 'immutable';
import people from '../../people.js';

import { ASSIGN_TASK, UNASSIGN_TASK } from '../tasks/tasks';

const initialState = Map(people.map(value => [value.id, fromJS(value)]));

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ASSIGN_TASK:
      return state.updateIn([action.payload.provider.id, 'tasks'], value => value.push(action.payload.task.id));
    case UNASSIGN_TASK:
      return state.updateIn([action.payload.provider.id, 'tasks'], value =>
        value.delete(value.indexOf(action.payload.task.id)),
      );
    default:
      return state;
  }
}
