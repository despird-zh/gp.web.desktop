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
    return (
      <MuiThemeProvider muiTheme={ rootTheme }>
        <div className='container'>
        <ul>
          <li><Link to="/public">Public Page</Link></li>
          <li><Link to="/protected">Protected Page</Link></li>
        </ul>
          <Switch>
            <PublicRoute path="/public" component={Public}/>
            <PublicRoute path="/login" component={Login}/>
            <PrivateRoute path="/protected" component={Protected}/>
            <DirectRoute component={NoMatch}/>
          </Switch>  
           <SigninDialog />        
        </div>
      </MuiThemeProvider>
    );
  }
}


const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

const PublicRoute = ({ component: Component, muiTheme, styles, authenticated, ...rest }) => (
  <Route {...rest} render={ props => (
    fakeAuth.isAuthenticated ?
        <Redirect to={{ pathname: '/protected' }}/> : 
        <Component muiTheme={muiTheme} { ...props}/>
  )
  }/>
)

const DirectRoute = ({ component: Component, muiTheme, styles, authenticated, ...rest }) => (
  <Route {...rest} render={ props => (
    fakeAuth.isAuthenticated ?
        <Redirect to={{ pathname: '/protected' }}/> : 
        <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
  )
  }/>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

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