import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-sessionstorage';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from './dev';
import rootReducer from './reducers';

const reducer = storage.reducer(rootReducer);
const engine = createEngine('gpress-state');
const session = storage.createMiddleware(engine);
const load = storage.createLoader(engine);

function configureStoreProd(initialState) {
  const middlewares = [
    thunk, session
  ];

  const store = createStore(reducer, initialState, compose(
    applyMiddleware(...middlewares)
    )
  );

  load(store);
  return store;
}

function configureStoreDev(initialState) {
  const middlewares = [
    // Add other middleware on this line...
    thunk, logger, session
  ];

  const store = createStore(reducer, initialState, compose(
    applyMiddleware(...middlewares)
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  load(store)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'));
  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
