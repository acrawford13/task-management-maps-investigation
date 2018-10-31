import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import Map from './components/Map/Map';
import reducers from './ducks';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';
import './App.css'

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

export default () => <Provider store={store}><Map /></Provider>