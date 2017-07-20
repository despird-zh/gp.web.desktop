import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './appReducer';
import dev from './devReducer';
import auth from './authReducer';
import config from './configReducer';

const rootReducer = combineReducers({
  app,
  dev,
  config,
  auth,
  routing: routerReducer,
});

export default rootReducer;
