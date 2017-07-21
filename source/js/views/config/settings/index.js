import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom'; 
import CommClearAll from 'material-ui/svg-icons/communication/clear-all';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ContentSave from 'material-ui/svg-icons/content/save';
import ContentSort from 'material-ui/svg-icons/content/sort';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import NavFirstPage from 'material-ui/svg-icons/navigation/first-page';
import NavLastPage from 'material-ui/svg-icons/navigation/last-page';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionHomeMenu from 'material-ui/svg-icons/action/home';
import CommCallMade from 'material-ui/svg-icons/communication/call-made';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { snackOnlyAction, loaderAction } from '../../../store/actions/appActions';
import PageHeaderBar from '../../component/PageHeaderBar';
import AuthConnect from '../../component/AuthConnect';
import { settingsSave, ConfigApis } from '../../../store/actions/configActions';
import SysSettingList from './SysSettingList';
import SysSettingInfo from './SysSettingInfo';
import PageJumpers from '../PageJumpers';
import QuickFilter from '../QuickFilter';
import Chip from '../../mui-ext/Chip';

function getStyles(muiTheme) {
  const { baseTheme:{palette} } = muiTheme;

  const styles = {
    
    pageHeader: {
      backgroundColor: palette.primary1Color,
    },
    switchButton:{
      color: palette.primary2Color,
    },
    topBar:{
      padding: 0,
      position: 'relative'
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
    },
    jumpLink:{
      textRendering: 'optimizeLegibility',
      boxSizing: 'border-box',
      maxWidth: '90%',
      overflow: 'hidden',
      fontWeight: 400,
      fontSize: '1.5rem',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      textTransform: 'uppercase',
      padding: '0 0 0 1.5rem',
      lineHeight: '4rem',
      color: '#a2a3a3'
    },
    spanMiddlePre:{
      height: '100%',
      display: 'inline-block',  
      verticalAlign: 'middle'
    },
    spanMiddle:{
      display: 'inline-block',  
      verticalAlign: 'middle'
    }
  };

  styles.sortButton = Object.assign({}, styles.iconBtn, {position:'absolute', right:15, marginTop:5});

  return styles;
}

class SysSettingsPage extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {collapsed: true,
      setting: null,
    };
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

    this.props.resetRootMenu({
      menuPaneVisible:true, 
      menuPane: (<RootMenuContent test1={this.onTest1} styles={this.styles} muiTheme={this.props.muiTheme}/>) ,
      menuActive: 'sys-settings',
      menuItems 
    });
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

  handleSettingSave = () => {
    const setting = this.refs['setting_edit'].state;
    const {rpcInvoke} = this.props;
   
    rpcInvoke(ConfigApis.SysOptSave, setting, (response)=>{
      return snackOnlyAction({shown: true, snackTip: response.meta.message });
    }, true, true);
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
    this.setState({ collapsed: false,setting: rowData });
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
          <div className={ this.state.collapsed ? "hidden" : "page-right-menu"} >
            <div className={ "right-menu " }>
              <div style={{height:'4.8rem', flexShrink:0, flexGrow:0, margin:'1.5rem 0 0', display:'flex'}}>
                <h3 style={styles.menuHeader}>Edit Setting</h3>
                <IconButton style={styles.iconBtn} iconStyle={styles.iconStyle} onTouchTap={ this.handleSettingSave }>
                  <ContentSave />
                </IconButton>
              </div>
              <SysSettingInfo ref={'setting_edit'} muiTheme={ muiTheme } setting={ this.state.setting }/>
              <div className="menu-footer">
                <IconButton onTouchTap={ this.onCollapseSwitch } iconStyle={styles.switchButton}>
                  {this.state.collapsed ? <NavFirstPage /> : <NavLastPage/>}
                </IconButton>
              </div>
            </div>
          </div>
          <div className="page-content"  style={{ padding:'1.5rem' }}>
            <div style={ styles.topBar }>
              <TextField hintText="Setting Filter"/>
              <IconButton style={styles.iconBtn} iconStyle={ styles.iconStyle } onTouchTap={this.handleSettingsQuery}>
                <ActionSearch/>
              </IconButton>
              <IconButton style={styles.iconBtn} iconStyle={ styles.iconStyle } onTouchTap={this.handleSettingsClear}>
                <CommClearAll />
              </IconButton>
              <IconButton style={ styles.sortButton } iconStyle={ styles.iconStyle } onTouchTap={this.handleSettingsClear}>
                <ContentSort />
              </IconButton>
            </div>
            <SysSettingList muiTheme={ muiTheme } onRowEdit={ this.handleRowEdit } settings={settings}/>
          </div>
        </div>
      </div>
    );
  }
}

const RootMenuContent = ({ test1, styles, muiTheme }) => {
  
  return (<div style={{display:'relative'}}>
    <header className="panel-header"> 
      <div className="panel-header__container active">
        <h3 className="panel-header__title">Quick Filter</h3>
        <IconButton style={styles.iconBtn} iconStyle={styles.iconStyle}>
          <CommClearAll />
        </IconButton>
      </div>
    </header>
    <QuickFilter muiTheme={muiTheme}/>
    <PageJumpers buttonLabel={'Other Config'}>
      <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help &amp; feedback" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Sign out" />
    </PageJumpers>
  </div>);
};

const NewComponent = AuthConnect(
  SysSettingsPage,
  (state) => ({
    settings: state.config.get('settings'),
  }),
  {settingsSave});

export default NewComponent;