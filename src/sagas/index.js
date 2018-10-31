import { all, fork } from 'redux-saga/effects';

import tasks from './tasks/tasks';

export default function* rootSaga() {
  yield all([fork(tasks)]);
}
