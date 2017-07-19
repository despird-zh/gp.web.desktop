import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from './dev';
import rootReducer from './reducers';
import { persistStore } from 'redux-persist'
import { asyncSessionStorage } from 'redux-persist/storages'

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

let store = process.env.NODE_ENV === 'production' ? configureStoreProd(): configureStoreDev();

persistStore(store, 
{ 
  storage: asyncSessionStorage,
  debounce:33,
  keyPrefix:'gpress:'
}, () => {
  console.log('rehydration complete')
})

export default store;
