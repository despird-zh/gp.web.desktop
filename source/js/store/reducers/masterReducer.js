import { Map, List } from 'immutable';
import {REHYDRATE} from 'redux-persist/constants';
import {
  MST_SAVE_STORAGES,
  MST_SAVE_IMAGES,
  MST_SAVE_DICTS,
  MST_SAVE_ENTITIES,
  MST_SAVE_ORGHIER,
} from '../actions/masterActions';
import {
  PURGE_TOKEN_ACT,
} from '../actions/authActions';

const initialState = Map({

  storagelist: Map({
    storages: [],
    type: 'ALL',
    state: 'ALL',
  }),
  dictlist: Map({
    entries: [],
    search: '',
    group: '',
    language: 'en_us',
  }),
  entitylist: Map({
    entities: [],
  }),
  imagelist: Map({
    images: [],
    category: '',
    format: '',
  }),
  orghier: Map({
    orgnodes: [],
    orgmembers: [],
    infomode: 'mbr-add',
    orgadd: {},
    orgedit: {},
    memberadd: {},
  }),
});

const actionsMap = {
  [REHYDRATE] : (state, action) => { // eslint-disable-line no-unused-vars
    var masterState = action.payload.master;
    
    if(!masterState) return state;

    return state.withMutations((map) => {
      map.setIn(['storagelist','storages'],[]);
      map.setIn(['storagelist','type'],'ALL');
      map.setIn(['storagelist','state'],'ALL');
      map.setIn(['dictlist','entries'],[]);
      map.setIn(['dictlist','search'],'ALL');
      map.setIn(['dictlist','group'],'ALL');
      map.setIn(['entitylist','entities'], masterState.entitylist.entities);
      map.setIn(['imagelist','images'],[]);
      map.setIn(['imagelist','category'],'ALL');
      map.setIn(['imagelist','format'],'ALL');
      map.setIn(['orghier','orgnodes'],[]);
      map.setIn(['orghier','orgmembers'],[]);
      map.setIn(['orghier','format'],'ALL');
    });
  },
  [PURGE_TOKEN_ACT]: (state, { type }) => { // eslint-disable-line no-unused-vars
    return state.withMutations((map) => {
      map.setIn(['storagelist','storages'],[]);
      map.setIn(['storagelist','type'],'ALL');
      map.setIn(['storagelist','state'],'ALL');
      map.setIn(['dictlist','entries'],[]);
      map.setIn(['dictlist','search'],'ALL');
      map.setIn(['dictlist','group'],'ALL');
      map.setIn(['entitylist','entities'],[]);
      map.setIn(['imagelist','images'],[]);
      map.setIn(['imagelist','category'],'ALL');
      map.setIn(['imagelist','format'],'ALL');
      map.setIn(['orghier','orgnodes'],[]);
      map.setIn(['orghier','orgmembers'],[]);
      map.setIn(['orghier','format'],'ALL');
    });
    
  },
  // Loader Action
  [MST_SAVE_STORAGES]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.withMutations((map) => {
      if (data.storages) {
        map.setIn(['storagelist', 'storages'], data.storages);
        delete data.storages; // eslint-disable-line
      }
      map.mergeDeep({ 'storagelist': data });
    });
  },

  // Loader Action
  [MST_SAVE_IMAGES]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.withMutations((map) => {
      if (data.images) {
        map.setIn(['imagelist', 'images'], data.images);
        delete data.images; // eslint-disable-line
      }
      map.mergeDeep({ 'imagelist': data });
    });
  },

  [MST_SAVE_DICTS]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.withMutations((map) => {
      if (data.entries) {
        map.setIn(['dictlist', 'entries'], data.entries);
        delete data.entries; // eslint-disable-line
      }
      map.mergeDeep({ 'dictlist': data });
    });
  },

  [MST_SAVE_ENTITIES]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.withMutations((map) => {
      if (data.entities) {
        map.setIn(['entitylist', 'entities'], data.entities);
        delete data.entities; // eslint-disable-line
      }
      map.mergeDeep({ 'entitylist': data });
    });
  },

  [MST_SAVE_ORGHIER]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.withMutations((map) => {
      if (data.orgmembers) {
        map.setIn(['orghier', 'orgmembers'], data.orgmembers);
        delete data.orgmembers; // eslint-disable-line
      }
      if (data.orgnodes) {
        map.setIn(['orghier', 'orgnodes'], data.orgnodes);
        delete data.orgnodes; // eslint-disable-line
      }
      if (data.orgadd) {
        map.updateIn(['orghier', 'orgadd'], value => {
          return Object.assign({}, value, data.orgadd);
        });
        delete data.orgadd; // eslint-disable-line
      }
      if (data.orgedit) {
        map.updateIn(['orghier', 'orgedit'], value => {
          return Object.assign({}, value, data.orgedit);
        });
        delete data.orgedit; // eslint-disable-line
      }
      if (data.memberadd) {
        map.setIn(['orghier', 'memberadd'], data.memberadd);
        delete data.memberadd; // eslint-disable-line
      }
      map.mergeDeep({ 'orghier': data });
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
