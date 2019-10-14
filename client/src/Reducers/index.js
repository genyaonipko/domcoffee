import { reducer as formReducer } from 'redux-form';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import Config from '../Config';
import { PacksReducer } from './PacksReducers';
import { AuthReducer } from './AuthReducers';
import { CoffeeReducer } from './CoffeeReducers';
import { PortionsReducer } from './PortionsReducers';
import { CommonReducer } from './CommonReducers';
import { UserReducer } from './UserReducers';

const rootReducer = combineReducers({
  form: formReducer,
  packs: PacksReducer,
  coffee: CoffeeReducer,
  portions: PortionsReducer,
  auth: AuthReducer,
  users: UserReducer,
  common: CommonReducer,
});

const { __DEV__ } = Config;

const enhancers = [];
const middleware = [
    thunk,
];

const isMobile = window.innerWidth < 420;

if (__DEV__ && !isMobile) {
  // eslint-disable-next-line
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const store = createStore(rootReducer, composedEnhancers);

export default store;
