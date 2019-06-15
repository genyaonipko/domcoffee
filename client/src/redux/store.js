/* eslint-disable */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import Config from '../Config';

const { __DEV__ } = Config;

const enhancers = [];
const middleware = [
    thunk,
];

if (__DEV__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const store = createStore(rootReducer, composedEnhancers);

export default store;
