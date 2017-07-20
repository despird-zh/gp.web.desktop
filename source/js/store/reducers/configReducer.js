import { Map } from 'immutable';
import {REHYDRATE} from 'redux-persist/constants';
import {
  CFG_SAVE_PROFILE,
  CFG_SAVE_SETTINGS,
} from '../actions/configActions';
import {
  PURGE_TOKEN_ACT,
} from '../actions/authActions';

const initialState = Map({
  profile: Map(),
  settings: [],
});

const actionsMap = {
  [REHYDRATE] : (state, action) => {
    var configState = action.payload.config;
    
    if(!configState) return state;
    return state.mergeDeep({profile: configState.profile})
            .set('settings', configState.settings);
  },
  [PURGE_TOKEN_ACT]: (state, { type }) => { // eslint-disable-line no-unused-vars
    return state.merge({
      profile: Map(),
      settings: [],
    });
  },
  // Loader Action
  [CFG_SAVE_PROFILE]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.mergeDeep({
      profile: data,
    });
  },

  [CFG_SAVE_SETTINGS]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.set('settings', data);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}