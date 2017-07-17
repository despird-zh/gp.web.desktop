import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import RootMenuBar from './RootMenuBar';
import SigninDialog from '../component/SigninDialog';

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

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
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
          <div className={ this.state.menuPaneVisible && this.state.menuPane ? 'page-layout root-menu-pinned':'page-layout'}>
            {this.props.children && React.cloneElement(this.props.children, {
              resetRootMenu: this.resetRootMenu,
              muiTheme: rootTheme,
            })}
          </div> :
          <div className={'page-layout'} style={ this.styles.homeLayout }>
            {this.props.children && React.cloneElement(this.props.children, {
              muiTheme: rootTheme,
            })}
          </div>
          }
          <SigninDialog />
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  account: PropTypes.string,
  authenticated: PropTypes.bool
};

export default connect(
  (state) => ({
    authenticated: state.auth.get('authenticated'),
    account: state.auth.get('account'),
  })
)(App);