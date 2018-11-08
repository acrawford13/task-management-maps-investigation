import { combineReducers } from 'redux';

import tasks from './tasks/tasks';
import providers from './providers/providers';
import view from './view/view';

export default combineReducers({
  tasks,
  providers,
  view,
});