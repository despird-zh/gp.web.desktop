import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Throttle from 'lodash.throttle';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import { grey200 } from 'material-ui/styles/colors';
import typography from 'material-ui/styles/typography';

import PageHeaderBar from '../component/PageHeaderBar';
import RootMenuBar from './RootMenuBar';

import ActionHomeMenu from 'material-ui/svg-icons/action/home';

const rootTheme = getMuiTheme(lightBaseTheme);

const styles = {

  header: {
    background: rootTheme.appBar.color,
  },
  footer: {
    background: grey200,
    height: 44,
    color: typography.textDarkBlack,
  },

};

injectTapEventPlugin();

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
        menuPaneInvisible : true,
        menuPane: null
      };
  }

  onMenuSwitch = () => {
    this.setState({ menuPaneInvisible: !this.state.menuPaneInvisible});
  }

  refMenuBar = (refMenuBar) =>{
    this._menuBar = refMenuBar;
  }

  setRootMenu = (menuPaneInvisible, menuPane) => {
    this.setState({menuPaneInvisible, menuPane});
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ rootTheme }>
        <div className='container'>
          <RootMenuBar 
            ref={ this.refMenuBar }
            menuPaneInvisible={ this.state.menuPaneInvisible }
            menuPane={ this.state.menuPane }
            onMenuSwitch={ this.onMenuSwitch }
          />
          <div className={ this.state.menuPaneInvisible ? 'page-layout root-menu-pinned':'page-layout'}>
            {this.props.children && React.cloneElement(this.props.children, {
              setActiveMenu: this.setActiveMenu,
              muiTheme: rootTheme,
            })}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};

export default App;