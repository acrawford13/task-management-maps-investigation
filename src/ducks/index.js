import { combineReducers } from 'redux';

import tasks from './tasks/tasks';
import providers from './providers/providers';

export default combineReducers({
  tasks,
  providers,
});