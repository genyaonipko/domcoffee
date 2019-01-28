import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

/* eslint-disable */
const enhancer = compose(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

export default store;
