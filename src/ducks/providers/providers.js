import { fromJS } from 'immutable';
import people from '../../people.js';

export default function reducer(state = fromJS(people), action = {}) {
  switch(action.type) {
    default: return state;
  }
}