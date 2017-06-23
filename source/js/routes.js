import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './views/main';
import HomePage from './views/home';

import DevPage from './views/DevPage';
import AboutPage from './views/AboutPage';

import WGroupPage from './views/wgroup/WGroupPage';
import WGroupTopicsPage from './views/wgroup/WGroupTopicsPage';
import WGroupTopicPage from './views/wgroup/WGroupTopicPage';
import WGroupRepoPage from './views/wgroup/WGroupRepoPage';
import WGroupBulletinPage from './views/wgroup/WGroupBulletinPage';
import WGroupGridListPage from './views/wgroup/WGroupGridListPage';

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
      <Route path='about' component={ AboutPage } />
      <Route path='wgroup' component={ WGroupPage }>
        <IndexRoute component={ WGroupTopicsPage } />
        <Route path='topics' component={ WGroupTopicsPage } />
        <Route path='topic' component={ WGroupTopicPage } />
        <Route path='repo' component={ WGroupRepoPage } />
        <Route path='bulletin' component={ WGroupBulletinPage } />
        <Route path='gridlist' component={ WGroupGridListPage } />
      </Route>
    </Route>
  );
};
