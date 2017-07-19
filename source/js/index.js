/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory'
import 'babel-polyfill';

import store from './store';
import GPressApp from './views/main';
import '../scss/app.scss'; // Yep, that's right.

require('../assets/favicon.ico'); // Tell webpack to load favicon.ico

const browserHistory = createBrowserHistory()
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={ store }>
    <Router history={history}>
      <Route path="/" component={ GPressApp }/>
    </Router>
  </Provider>, document.getElementById('root')
);
