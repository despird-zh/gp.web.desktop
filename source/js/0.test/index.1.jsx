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

import RootMenuBar from './RootMenuBar';
import SigninDialog from '../component/SigninDialog';

import HomePage from '../home';

import DevPage from '../DevPage';
import AboutPage from '../AboutPage';
import MainPage from '../main/MainPage';
import WGroupGridListPage from '../wgroup/WGroupGridListPage';
import WGroupTopicsPage from '../wgroup/WGroupTopicsPage';
import WGroupTopicPage from '../wgroup/WGroupTopicPage';
import WGroupAddPage from '../wgroup/WGroupAddPage';
import WGroupRepoPage from '../wgroup/WGroupRepoPage';

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
    const { authenticated } = this.props;
    console.log('auth state:',authenticated);
    return (
      <MuiThemeProvider muiTheme={ rootTheme }>
        <div className='container'>
          <Switch>
            <PublicRoute path="/" component={HomePage}
              authenticated={ authenticated } 
              muiTheme={ rootTheme } 
              styles={this.styles}/>
            <Route path="/home" component={HomePage}
              authenticated={ authenticated } 
              muiTheme={ rootTheme } 
              styles={this.styles}/>
            <AuthRoute path="/main" component={ MainPage }
              authenticated={ authenticated } 
              muiTheme={ rootTheme } 
              resetRootMenu = { this.resetRootMenu }
              styles={this.styles}/>
            <Route component={NoMatch}/>
          </Switch>  
           <SigninDialog />        
        </div>
      </MuiThemeProvider>
    );
  }
}

const PublicRoute = ({ component: Component, muiTheme, styles, authenticated, ...rest }) => (
  <Route {...rest} render={ props => (
    <div className={'page-layout'} style={ styles.homeLayout }>
      { authenticated ? 
        <Redirect to={{ pathname: '/main' }}/> : 
        <Component muiTheme={muiTheme} { ...props} />
      }
    </div>
  )
  }/>
)

const AuthRoute = ({ component: Component,  muiTheme, styles, resetRootMenu, authenticated, ...rest }) => (
  <Route {...rest} render={props => (
    <div className={ this.state.menuPaneVisible && this.state.menuPane ? 'page-layout root-menu-pinned':'page-layout'}>
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
      { authenticated ? 
        <Component muiTheme={ muiTheme } resetRootMenu = { resetRootMenu } { ...props} /> :
        <Redirect to={{ pathname: '/home' }}/> 
      }
    </div>
  )}/>
)

const NoMatch = () => <h3>NoMatch</h3>

App.propTypes = {
  children: PropTypes.element,
  authenticated: PropTypes.bool
};

export default connect(
  (state) => ({
    authenticated: state.auth.get('authenticated'),
  })
)(App);