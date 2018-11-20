import { fromJS, OrderedMap } from 'immutable';
import people from '../../people.js';

import { ASSIGN_TASK, UNASSIGN_TASK } from '../tasks/tasks';

const sortByName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (b.name < a.name) {
    return 1;
  }
  return 0;
};

const initialState = OrderedMap(people.sort(sortByName).map(value => [value.id, fromJS(value)]));

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
