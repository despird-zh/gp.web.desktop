import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './appReducer';
import dev from './devReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
  app,
  dev,
  auth,
  routing: routerReducer,
});

export default rootReducer;
