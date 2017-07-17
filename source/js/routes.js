import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './views/main';
import HomePage from './views/home';

import DevPage from './views/DevPage';
import AboutPage from './views/AboutPage';
import WGroupGridListPage from './views/wgroup/WGroupGridListPage';
import WGroupTopicsPage from './views/wgroup/WGroupTopicsPage';
import WGroupTopicPage from './views/wgroup/WGroupTopicPage';
import WGroupAddPage from './views/wgroup/WGroupAddPage';
import WGroupRepoPage from './views/wgroup/WGroupRepoPage';

export const getRoutes = (store) => {
  const ensureAuthenticated = (nextState, replace) => { // eslint-disable-line no-unused-vars
    if (!store.getState().auth.token) {
      replace('/login');
    }
  };

  const skipIfAuthenticated = (nextState, replace) => { // eslint-disable-line no-unused-vars
    if (store.getState().auth.token) {
      replace('/');
    }
  };

  const clearMessages = () => { // eslint-disable-line no-unused-vars
    store.dispatch({
      type: 'CLEAR_MESSAGES',
    });
  };

  /* <Route path='about' component={ AboutPage } onEnter={skipIfAuthenticated} onLeave={clearMessages} />*/
  return (
    <Route path='/' component={ App }>
      <IndexRoute component={ HomePage } />
      <Route path='dev' component={ DevPage } />
      <Route path='wgroup-list' component={ WGroupGridListPage } />
      <Route path='wgroup-add' component={ WGroupAddPage } />
      <Route path='wgroup-topics' component={ WGroupTopicsPage } />
      <Route path='wgroup-topic' component={ WGroupTopicPage } />
      <Route path='wgroup-repo' component={ WGroupRepoPage } />
      <Route path='about' component={ AboutPage } />
    </Route>
  );
};
