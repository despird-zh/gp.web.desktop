import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { snackAction, loaderAction } from '../store/actions/appActions';
import PageHeaderBar from './component/PageHeaderBar';

import NavFirstPage from 'material-ui/svg-icons/navigation/first-page';
import NavLastPage from 'material-ui/svg-icons/navigation/last-page';
import IconButton from 'material-ui/IconButton';
function getStyles(muiTheme) {
  const { baseTheme } = muiTheme;

  return {
    pageHeader: {
      backgroundColor: baseTheme.palette.primary1Color,
    },
    switchButton:{
      color: baseTheme.palette.primary2Color,
    }
  };
}

class DevPage extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {collapsed: false};
    this.styles = getStyles(props.muiTheme);
  }

  onCollapseSwitch = () =>{
    this.setState({ collapsed: !this.state.collapsed });
  }

  onTest = () => {
    this.props.resetRootMenu({menuPaneVisible:true, menuPane: (<RootMenuContent test1={this.onTest1}/>) });
  }

  onTest1 = () => {
    console.log('12------3')
  }


  componentDidMount(){
    //this.props.resetRootMenu({menuPaneVisible:true, menuPane: null });
    this.props.resetRootMenu({menuPaneVisible:true, menuPane: (<RootMenuContent test1={this.onTest1}/>) });
    //this.props.resetRootMenu({menuPaneVisible:false, menuPane: (<RootMenuContent test1={this.onTest1}/>) });
  }

  render() {
    let { muiTheme } = this.props;

    return (
      <div className="page-wrapper">
        <header className="page-header-wrapper" style={this.styles.pageHeader}>
          <PageHeaderBar muiTheme={ muiTheme }/>
        </header>
        <div className="page-content-wrapper">
          <div className="page-right-menu">
            <div className={ this.state.collapsed ? "right-menu collapsed":"right-menu " }>
              <div className="menu-body">
              </div>
              <div className="menu-footer">
                <IconButton onTouchTap={ this.onCollapseSwitch } iconStyle={this.styles.switchButton}>
                  {this.state.collapsed ? <NavFirstPage /> : <NavLastPage/>}
                </IconButton>
              </div>
            </div>
          </div>
          <div className="page-content">
            <div className="content-body">
              <RaisedButton label="Primary" primary={true} onTouchTap={this.onTest}/>
            </div>
            <footer className="content-footer">
              xx
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

const RootMenuContent = ({ test1 }) => {
  
  return (<div>
    <RaisedButton label="Test" primary={true} onTouchTap={test1}/>
  </div>);
};

export default connect(
  (state) => ({}),
  (dispatch) => (
    bindActionCreators({
      snackAction,
      loaderAction,
    }, dispatch)
  )
)(DevPage);
