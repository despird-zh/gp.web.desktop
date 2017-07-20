import React, { Component, PropTypes } from 'react';

import CommClearAll from 'material-ui/svg-icons/communication/clear-all';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ContentSave from 'material-ui/svg-icons/content/save';

import TextField from 'material-ui/TextField';
import NavFirstPage from 'material-ui/svg-icons/navigation/first-page';
import NavLastPage from 'material-ui/svg-icons/navigation/last-page';
import IconButton from 'material-ui/IconButton';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionHomeMenu from 'material-ui/svg-icons/action/home';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { snackAction, loaderAction } from '../../store/actions/appActions';
import PageHeaderBar from '../component/PageHeaderBar';
import AuthConnect from '../component/AuthConnect';
import { settingsSave, ConfigApis } from '../../store/actions/configActions';
import SysSettingsList from './SysSettingsList';

function getStyles(muiTheme) {
  const { baseTheme:{palette} } = muiTheme;

  return {
    pageHeader: {
      backgroundColor: palette.primary1Color,
    },
    switchButton:{
      color: palette.primary2Color,
    },
    topBar:{
      padding: 0,
    },  
    iconBtn: {
      width:40, 
      height:40,
      padding:5,
      marginTop:2,
    },
    iconStyle:{
      color: palette.primary2Color
    },
    menuHeader:{
      textRendering: 'optimizeLegibility',
      boxSizing: 'border-box',
      maxWidth: '90%',
      margin: '0 0.5rem 0 0',
      overflow: 'hidden',
      fontWeight: 400,
      fontSize: '1.5rem',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      textTransform: 'uppercase',
      padding: '0 0 0 1.6rem',
      lineHeight: '4.8rem',
      color: '#a2a3a3'
    }
    
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

  handleSettingsQuery = () => {
    const {rpcInvoke} = this.props;

    rpcInvoke(ConfigApis.SysOptsQuery, {}, settingsSave, false);
  }

  handleSettingsClear = () => {

    const {settingsSave} = this.props;
    settingsSave([]);
  };

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

  handleRowEdit = (rowData) => {
    this.setState({ collapsed: false });
    console.log(rowData);
  }

  render() {
    const { muiTheme, settings } = this.props;
    const styles = this.styles;
    return (
      <div className="page-wrapper">
        <header className="page-header-wrapper" style={this.styles.pageHeader}>
          <PageHeaderBar muiTheme={ muiTheme }/>
        </header>
        <div className="page-content-wrapper">
          { this.state.collapsed ? null:(<div className="page-right-menu">
            <div className={ "right-menu " }>
              <div style={{height:'4.8rem', flexShrink:0, flexGrow:0, margin:'1.5rem 0 0', display:'flex'}}>
                <h3 style={styles.menuHeader}>Edit Setting</h3>
                <IconButton style={styles.iconBtn} iconStyle={styles.iconStyle}>
                  <ContentSave />
                </IconButton>
              </div>
              <div className="menu-body" style={{padding:'0 1.5rem 0'}}>
                <TextField
                  disabled={true}
                  fullWidth={true}
                  hintText="Disabled Hint Text"
                  defaultValue="Disabled With Floating Label"
                  floatingLabelText="Floating Label Text"/>
                <SelectField
                  floatingLabelFixed={true}
                  floatingLabelText="Category"
                  value={this.state.value}
                  hintText="Select category of setting"
                  fullWidth={true}
                  onChange={this.handleChange}>
                  <MenuItem value={'CAPACITY'} primaryText="Capacity" />
                  <MenuItem value={'BASIC'} primaryText="Basic" />
                  <MenuItem value={'SECURITY'} primaryText="Security" />
                  <MenuItem value={'NETWORK'} primaryText="Network" />
                </SelectField>
                <TextField
                  fullWidth={true}
                  hintText="the value setting Text"
                  defaultValue="xxx.ss.xx"
                  floatingLabelText="The setting value"
                  floatingLabelFixed={true}/>
                <TextField
                  fullWidth={true}
                  hintText="Disabled Hint Text"
                  defaultValue="Disabled With Floating Label"
                  floatingLabelText="Floating Label Text"
                  floatingLabelFixed={true}/>
              </div>
              <div className="menu-footer">
                <IconButton onTouchTap={ this.onCollapseSwitch } iconStyle={styles.switchButton}>
                  {this.state.collapsed ? <NavFirstPage /> : <NavLastPage/>}
                </IconButton>
              </div>
            </div>
          </div>)}
          <div className="page-content"  style={{ padding:'1.5rem' }}>
            <div style={ styles.topBar }>
              <TextField hintText="Setting Filter"/>
              <IconButton style={styles.iconBtn} iconStyle={ styles.iconStyle } onTouchTap={this.handleSettingsQuery}>
                <ActionSearch/>
              </IconButton>
              <IconButton style={styles.iconBtn} iconStyle={ styles.iconStyle } onTouchTap={this.handleSettingsClear}>
                <CommClearAll />
              </IconButton>
            </div>
            <SysSettingsList muiTheme={ muiTheme } onRowEdit={ this.handleRowEdit } settings={settings}/>
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
        <h3 className="panel-header__title">Quick Filter</h3>
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

const NewComponent = AuthConnect(
  SysSettingsPage,
  (state) => ({
    settings: state.config.get('settings'),
  }),
  {settingsSave});

export default NewComponent;