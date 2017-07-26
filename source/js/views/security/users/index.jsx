import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
import { saveUsers, SecurityApis } from '../../../store/actions/securityActions';
import UserList from './UserList';
import UserInfo from './UserInfo';
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

class NodesPage extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {collapsed: false};
    this.styles = getStyles(props.muiTheme);
  }

  onCollapseSwitch = () =>{
    this.setState({ collapsed: !this.state.collapsed });
  }

  onTest = () => {
    this.props.resetRootMenu({menuPaneVisible:true, 
      menuPane: (<RootMenuContent test1={this.onTest1}/>),
      menuActive: 'config' });
  }

  onTest1 = () => {
    console.log('12------3')
  }

  componentDidMount(){

    this.props.resetRootMenu({
      menuPaneVisible:true, 
      menuPane: (<RootMenuContent test1={this.onTest1}/>) ,
      menuActive: 'security' 
    });
  }

  handleEntitiesClear = () => {

    const {saveUsers} = this.props;
    saveUsers({users: []});
  };

  handleEntitiesQuery = () => {
    const {rpcInvoke} = this.props;

    rpcInvoke(SecurityApis.UsersQuery, {state:'ALL', type:'ALL'}, (json)=>{
      return saveUsers({users: json})
    }, false);
  }

  render() {
    const { muiTheme, users } = this.props;
    const styles = this.styles;

    return (
      <div className="page-wrapper">
        <header className="page-header-wrapper" style={this.styles.pageHeader}>
          <PageHeaderBar muiTheme={ muiTheme }/>
        </header>
        <div className="page-content-wrapper">
          <div className={ "page-right-menu"} >
            <div className={ this.state.collapsed ? "right-menu collapsed":"right-menu " }>
              <div style={{height:'4.8rem', flexShrink:0, flexGrow:0, margin:'1.5rem 0 0', display:'flex'}}>
                <h3 style={styles.menuHeader}>Edit Setting</h3>
                <IconButton style={styles.iconBtn} iconStyle={styles.iconStyle} onTouchTap={ this.handleSettingSave }>
                  <ContentSave />
                </IconButton>
              </div>
              <UserInfo ref={'setting_edit'} muiTheme={ muiTheme } setting={ this.state.setting }/>
              <div className="menu-footer">
                <IconButton onTouchTap={ this.onCollapseSwitch } iconStyle={styles.switchButton}>
                  {this.state.collapsed ? <NavFirstPage /> : <NavLastPage/>}
                </IconButton>
              </div>
            </div>
          </div>
          <div className="page-content"  style={{ padding:'1.5rem' }}>
            <div style={ styles.topBar }>
              <TextField hintText="User Filter"/>
              <IconButton style={styles.iconBtn} iconStyle={ styles.iconStyle } onTouchTap={this.handleEntitiesQuery}>
                <ActionSearch/>
              </IconButton>
              <IconButton style={styles.iconBtn} iconStyle={ styles.iconStyle } onTouchTap={this.handleEntitiesClear}>
                <CommClearAll />
              </IconButton>
              <IconButton style={ styles.sortButton } iconStyle={ styles.iconStyle } onTouchTap={this.handleEntitiesClear}>
                <ContentSort />
              </IconButton>
            </div>
            <UserList muiTheme={ muiTheme } onRowEdit={ this.handleRowEdit } users={users}/>
          </div>
        </div>
      </div>
    );
  }
}

const RootMenuContent = ({ test1 }) => {
  
  return (<div style={{padding:10}}>
    <RaisedButton label="Test" primary={true} onTouchTap={test1}/>
  </div>);
};

const NewComponent = AuthConnect(
  NodesPage,
  (state) => ({
    users: state.security.getIn(['userlist','users']),
  }),
  {saveUsers});

export default NewComponent;
