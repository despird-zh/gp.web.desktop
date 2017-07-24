import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './appReducer';
import dev from './devReducer';
import auth from './authReducer';
import config from './configReducer';
import master from './masterReducer';
import security from './securityReducer';

const rootReducer = combineReducers({
  app,
  dev,
  config,
  auth,
  master,
  security,
  routing: routerReducer,
});

export default rootReducer;
