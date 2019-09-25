import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import packsReducer from './packsReducers/packsReducer';
import { dataUsersReducer } from './usersReducer';
import authReducer from './authReducer';
import coffeeReducer from './salesReducers/coffeeReducer';
import portionsReducer from './salesReducers/portionsReducer';
import { additionalReducer, errorReducer } from './additionalReducer';
import owncupsReducer from './own/owncupsReducer';
import ownpacksReducer from './own/ownpacksReducer';
import innercupsReducer from './inner/innercupsReducer';
import innerpacksReducer from './inner/innerpacksReducer';

const rootReducer = combineReducers({
  form: formReducer,
  packs: packsReducer,
  innercups: innercupsReducer,
  innerpacks: innerpacksReducer,
  coffee: coffeeReducer,
  owncups: owncupsReducer,
  ownpacks: ownpacksReducer,
  portions: portionsReducer,
  error: errorReducer,
  auth: authReducer,
  users: dataUsersReducer,
  settings: additionalReducer,
});

export default rootReducer;
