import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './epics';
import rootReducer from './reducers';

const reduxRouterMiddleware = routerMiddleware(browserHistory)
const epicMiddleware = createEpicMiddleware(rootEpic);
const middlewares = [epicMiddleware, reduxRouterMiddleware];

export default () => createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middlewares)),
);
