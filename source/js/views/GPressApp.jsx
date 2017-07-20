import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import { Switch } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import RootMenuBar from './main/RootMenuBar';
import SigninDialog from './component/SigninDialog';

import HomePage from './home';

import DevPage from './DevPage';
import AboutPage from './AboutPage';
import MainPage from './main/MainPage';
import LoadingPage from './main/LoadingPage';
import WGroupGridListPage from './wgroup/WGroupGridListPage';
import WGroupTopicsPage from './wgroup/WGroupTopicsPage';
import WGroupTopicPage from './wgroup/WGroupTopicPage';
import WGroupAddPage from './wgroup/WGroupAddPage';
import WGroupRepoPage from './wgroup/WGroupRepoPage';

import SysSettingsPage from './config/SysSettingsPage';

const rootTheme = getMuiTheme(lightBaseTheme);

injectTapEventPlugin();

function getStyles(muiTheme) {
  const { baseTheme } = muiTheme;

  return {
    homeLayout: {
      padding:0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    }
  };
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
        menuActive: '',
        menuPaneVisible : true,
        menuPane: null,
        menuItems: null
      };
    this.styles = getStyles(rootTheme);
  }

  onMenuSwitch = () => {
    this.setState({ menuPaneVisible: !this.state.menuPaneVisible});
  }

  refMenuBar = (refMenuBar) =>{
    this._menuBar = refMenuBar;
  }

  resetRootMenu = ({menuPaneVisible, menuPane, menuActive, menuItems}) => {
    
    let newState = {menuPaneVisible, menuPane, menuActive, menuItems};
    
    this.setState( newState );
  }

  render() {
    const { authenticated, storeReady } = this.props;
    const routeProps = {
      storeReady,
      authenticated : authenticated,
      muiTheme : rootTheme , 
      resetRootMenu : this.resetRootMenu ,
      state : this.state,
      styles: this.styles,
    }
    return (
      <MuiThemeProvider muiTheme={ rootTheme }>
        <div className='container'>
           { authenticated ? 
            <RootMenuBar 
              ref={ this.refMenuBar }
              menuPaneVisible={ this.state.menuPaneVisible }
              menuActive={ this.state.menuActive }
              menuPane={ this.state.menuPane }
              onMenuSwitch={ this.onMenuSwitch }
              menuItems={ this.state.menuItems }
              muiTheme={ rootTheme }
            /> : null
          }
          <Switch>
            <PublicRoute path="/home" component={HomePage} {...routeProps}/>
            <AuthRoute path="/main" component={ MainPage } {...routeProps}/>
            <AuthRoute path="/wgroup-list" component={ WGroupGridListPage } {...routeProps}/>
            <AuthRoute path="/wgroup-add" component={ WGroupAddPage } {...routeProps}/>
            <AuthRoute path="/wgroup-topics" component={ WGroupTopicsPage } {...routeProps}/>
            <AuthRoute path="/wgroup-topic" component={ WGroupTopicPage } {...routeProps}/>
            <AuthRoute path="/wgroup-repo" component={ WGroupRepoPage } {...routeProps}/>
            <AuthRoute path="/sys-settings" component={ SysSettingsPage } {...routeProps}/>
            <AuthRoute path="/about" component={ AboutPage } {...routeProps}/>
            <DirectRoute />
          </Switch>  
          <SigninDialog muiTheme={ rootTheme }/>        
        </div>
      </MuiThemeProvider>
    );
  }
}

const PublicRoute = ({ component: Component, muiTheme, styles, state, storeReady, resetRootMenu, authenticated, ...rest }) => (
  <Route {...rest} render={ props => (
    <div className={'page-layout'} style={ styles.homeLayout }>
      { authenticated ? 
        <Redirect to={'/main' }/> : 
        <Component muiTheme={muiTheme} { ...props} />
      }
    </div>
  )
  }/>
)

const AuthRoute = ({ component: Component,  muiTheme, styles, state, storeReady, resetRootMenu, authenticated, ...rest }) => {
  return (
  <Route {...rest} render={ props => (
    <div className={ state.menuPaneVisible && state.menuPane ? 'page-layout root-menu-pinned':'page-layout'}>
      { !storeReady ? 
        ( <LoadingPage muiTheme={muiTheme} { ...props} /> ) :
        ( authenticated ? 
          <Component muiTheme={ muiTheme } resetRootMenu = { resetRootMenu } { ...props} /> :
          <Redirect to={'/home' }/> 
        )
      }
    </div>
  )}/>
)}

const DirectRoute = ({ authenticated, storeReady}) => (
   authenticated ? 
    <Redirect to={{ pathname: '/main' }}/> :
    <Redirect to={{ pathname: '/home' }}/> 
)

App.propTypes = {
  children: PropTypes.element,
  authenticated: PropTypes.bool
};

export default connect(
  (state) => ({
    authenticated: state.auth.get('authenticated'),
    storeReady: state.app.get('storeReady'),
  })
)(App);