import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from 'ducks';
import rootSaga from 'sagas';
import createSagaMiddleware from 'redux-saga';

const enhancers = [];
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = window;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }

  middleware.push(createLogger());
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
const store = createStore(reducers, {}, composedEnhancers);

sagaMiddleware.run(rootSaga);

export default store;