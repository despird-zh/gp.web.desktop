import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist'
import { asyncSessionStorage } from 'redux-persist/storages'
import { logger } from './dev';
import rootReducer from './reducers';
import { storeReadyAction } from './actions/appActions';

function configureStoreProd() {

  return createStore(rootReducer, applyMiddleware(thunk) );
}

function configureStoreDev() {

  const middleware = applyMiddleware(thunk, logger);
  let enhancer;

  // Enable DevTools if browser extension is installed
  if (window.__REDUX_DEVTOOLS_EXTENSION__) { // eslint-disable-line
    enhancer = compose(
      middleware,
      window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
    );
  } else {
    enhancer = compose(middleware);
  }

  return createStore(rootReducer, enhancer);

}

export const store = process.env.NODE_ENV === 'production' ? configureStoreProd(): configureStoreDev();

export const persistor = persistStore(store, 
{ 
  storage: asyncSessionStorage,
  debounce:33,
  keyPrefix:'gpress:'
}, () => {
  store.dispatch(storeReadyAction());
})

