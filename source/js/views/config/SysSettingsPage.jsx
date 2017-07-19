import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import CommClearAll from 'material-ui/svg-icons/communication/clear-all';
import NavFirstPage from 'material-ui/svg-icons/navigation/first-page';
import NavLastPage from 'material-ui/svg-icons/navigation/last-page';
import IconButton from 'material-ui/IconButton';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionHomeMenu from 'material-ui/svg-icons/action/home';

import { snackAction, loaderAction } from '../../store/actions/appActions';
import PageHeaderBar from '../component/PageHeaderBar';

function getStyles(muiTheme) {
  const { baseTheme:{palette} } = muiTheme;

  return {
    pageHeader: {
      backgroundColor: palette.primary1Color,
    },
    switchButton:{
      color: palette.primary2Color,
    },    
    iconBtn: {
      width:40, 
      height:40,
      padding:5,
    },
    iconStyle:{
      color: palette.primary2Color
    },
  };
}

class SysSettingsPage extends Component {

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
    const menuItems = this.createMenuItems();
    //this.props.resetRootMenu({menuPaneVisible:true, menuPane: null });
    this.props.resetRootMenu({
      menuPaneVisible:true, 
      menuPane: (<RootMenuContent test1={this.onTest1} styles={this.styles}/>) ,
      menuActive: 'sys-settings',
      menuItems 
    });
    //this.props.resetRootMenu({menuPaneVisible:false, menuPane: (<RootMenuContent test1={this.onTest1}/>) });
  }

  onTest2 = () => {
    console.log('this is test2')
  }
  onTest3 = () => {
    console.log('this is test3')
  }

  createMenuItems(){
    return [
      <FloatingActionButton key={'item-1'} mini={true} onTouchTap={this.onTest2}>
        <ActionHomeMenu />
      </FloatingActionButton>
      ,
      <FloatingActionButton key={'item-2'} mini={true} onTouchTap={this.onTest3}>
        <ContentAdd />
      </FloatingActionButton>
    ];
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
            <div className="content-body" style={{padding:10}}>
              <RaisedButton label="Primary" primary={true} onTouchTap={this.onTest}/>
            </div>
            <footer className="content-footer" style={{padding:10}}>
              xx
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

const RootMenuContent = ({ test1, styles }) => {
  
  return (<div>
    <header className="panel-header"> 
      <div className="panel-header__container active">
        <h2 className="panel-header__title">Quick Filter</h2>
        <IconButton style={styles.iconBtn} iconStyle={styles.iconStyle}>
          <CommClearAll />
        </IconButton>
      </div>
    </header>
    <div style={{padding:'0 15px 15px'}}>
      xxxxxxxx
    </div>
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
)(SysSettingsPage);
