// redux store is exported from this file
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootSaga from '../sagas/index';
import rootReducer from './reducer/index';

const PRELOADED_STATE = {};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  PRELOADED_STATE,
  composeWithDevTools({})(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default store;
