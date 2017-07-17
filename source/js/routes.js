import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from './views/main';
import HomePage from './views/home';

import DevPage from './views/DevPage';
import AboutPage from './views/AboutPage';
import MainPage from './views/main/MainPage';
import WGroupGridListPage from './views/wgroup/WGroupGridListPage';
import WGroupTopicsPage from './views/wgroup/WGroupTopicsPage';
import WGroupTopicPage from './views/wgroup/WGroupTopicPage';
import WGroupAddPage from './views/wgroup/WGroupAddPage';
import WGroupRepoPage from './views/wgroup/WGroupRepoPage';

export const getRoutes = (store) => {

  const ensureAuthenticated = (nextState, replace) => { // eslint-disable-line no-unused-vars

    if (store.getState().auth.get('authenticated')) {
      replace('/main');
    }
  };

  const skipIfAuthenticated = (nextState, replace) => { // eslint-disable-line no-unused-vars

    if (!store.getState().auth.get('authenticated')) {
      replace('/home');
    }
  };
  
  const clearMessages = () => { // eslint-disable-line no-unused-vars
    store.dispatch({
      type: 'CLEAR_MESSAGES',
    });
  };

  /* <Route path='about' component={ AboutPage } onEnter={skipIfAuthenticated} onLeave={clearMessages} />*/
  return (
    <Route path='/' component={ App } >
      <IndexRedirect to="/main"/>
      <Route path='home' component={ HomePage } onEnter={ensureAuthenticated}/>
      <Route path='main' component={ MainPage } onEnter={skipIfAuthenticated} onLeave={clearMessages} />
      <Route path='wgroup-list' component={ WGroupGridListPage } onEnter={skipIfAuthenticated} onLeave={clearMessages} />
      <Route path='wgroup-add' component={ WGroupAddPage } onEnter={skipIfAuthenticated} onLeave={clearMessages} />
      <Route path='wgroup-topics' component={ WGroupTopicsPage } onEnter={skipIfAuthenticated} onLeave={clearMessages} />
      <Route path='wgroup-topic' component={ WGroupTopicPage } onEnter={skipIfAuthenticated} onLeave={clearMessages} />
      <Route path='wgroup-repo' component={ WGroupRepoPage } onEnter={skipIfAuthenticated} onLeave={clearMessages} />
      <Route path='about' component={ AboutPage } onEnter={skipIfAuthenticated} onLeave={clearMessages} />
    </Route>
  );
};
