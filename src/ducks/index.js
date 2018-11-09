import { combineReducers } from 'redux';

import tasks from './tasks/tasks';
import providers from './providers/providers';
import view from './view/view';
import map from './map/map';

export default combineReducers({
  tasks,
  providers,
  view,
  map,
});