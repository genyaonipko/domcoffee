import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import dataReducer from './salesReducer';
import dataUsersReducer from './usersReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import coffeeReducer from './coffeeReducer';
import settingsReducer from './settingsReducer';
import ownReducer from './ownReducer';

const rootReducer = combineReducers({
  form: formReducer,
  sales: dataReducer,
  coffee: coffeeReducer,
  own: ownReducer,
  error: errorReducer,
  auth: authReducer,
  users: dataUsersReducer,
  settings: settingsReducer,
});

export default rootReducer;
