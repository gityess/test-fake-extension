import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import { connectionReducer } from './connection';
import { exportReducer } from './export';
import { importReducer } from './import';
import { reportReducer } from './report';
import { userReducer } from './user';

export default combineReducers({
  routing: routerReducer,
  connection: connectionReducer,
  import: importReducer,
  export: exportReducer,
  report: reportReducer,
  user: userReducer,
  form: formReducer
});
