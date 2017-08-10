import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';
import CommClearAll from 'material-ui/svg-icons/communication/clear-all';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import NavFirstPage from 'material-ui/svg-icons/navigation/first-page';
import NavLastPage from 'material-ui/svg-icons/navigation/last-page';
import NavRefresh from 'material-ui/svg-icons/navigation/refresh';
import IconButton from 'material-ui/IconButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionHomeMenu from 'material-ui/svg-icons/action/home';
import MenuItem from 'material-ui/MenuItem';

import { snackOnlyAction, loaderAction } from '../../../store/actions/appActions';
import AuthConnect from '../../component/AuthConnect';
import { profileSave, profileSumSave, ConfigApis } from '../../../store/actions/configActions';
import PageHeaderBar from '../../component/PageHeaderBar';
import Chip from '../../mui-ext/Chip';
import ProfileInfo from './ProfileInfo';
import PageJumpers from '../PageJumpers';
import QuickFilter from '../QuickFilter';

function getStyles(muiTheme) {
  const { baseTheme:{palette} } = muiTheme;

  return {
    topBar: {
      display: 'flex',
      position: 'relative',
    },
    iconBtn: {
      width:40, 
      height:40,
      padding:5,
      marginTop:2,
    },
    rowContainer:{
      display: 'flex'
    },
    iconStyle:{
      color: palette.primary2Color
    },
    spacer: { flex: 1 },
    pageHeader: {
      backgroundColor: palette.primary1Color,
    },
    switchButton:{
      color: palette.primary2Color,
    }
  };
}

class ProfilePage extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      collapsed: false,
      errtips:{},
    };
    this.styles = getStyles(props.muiTheme);
  }

  onCollapseSwitch = () =>{
    this.setState({ collapsed: !this.state.collapsed });
  }

  componentWillMount() {
    const {rpcInvoke} = this.props;
    rpcInvoke(ConfigApis.EntProfileQuery, {},profileSave);
    rpcInvoke(ConfigApis.EntProfileSum, {},profileSumSave);
  }

  componentDidMount(){
    const menuItems = this.createMenuItems();
    this.props.resetRootMenu({
      menuPaneVisible:true, 
      menuPane: (<RootMenuContent muiTheme={ this.props.muiTheme } styles={this.styles}/>) ,
      menuActive: 'config',
      menuItems 
    });
  }

  createMenuItems(){
    return [
      <FloatingActionButton key={'item-1'} mini={true}>
        <ActionHomeMenu />
      </FloatingActionButton>
      ,
      <FloatingActionButton key={'item-2'} mini={true}>
        <ContentAdd />
      </FloatingActionButton>
    ];
  }

  handleFieldChange = (event) => {
    //console.log(event.target.name + ' / ' + event.target.value)
    let { profileSave } = this.props;
    let data = {};
    data[event.target.name] = event.target.value;
    profileSave(data);
  }

  handleSave = () => {
    const { rpcInvoke, profile } = this.props;
    let data = (profile === null)? {} : profile.toJS();
    delete data.summary;
    rpcInvoke(ConfigApis.EntProfileSave, data, (json)=>{
      let errtips = (json === null) ? {} : json;
      this.setState({
        errtips
      });
    });
  }

  render() {
    let { muiTheme, profile } = this.props;
    const gutter = muiTheme.spacing.desktopGutter;
    const input = {
      marginRight: gutter,
    };
    const styles = this.styles;
    profile = ( profile === null )?{} : profile.toJS();
    const { errtips } = this.state;
    return (
      <div className="page-wrapper">
        <header className="page-header-wrapper" style={this.styles.pageHeader}>
          <PageHeaderBar muiTheme={ muiTheme }/>
        </header>
        <div className="page-content-wrapper">
          <div className="page-right-menu">
            <div className={ this.state.collapsed ? "right-menu collapsed":"right-menu " }>
              <ProfileInfo muiTheme ={muiTheme} collapsed={this.state.collapsed} summary={profile.summary}/>
              <div className="menu-footer">
                <IconButton onTouchTap={ this.onCollapseSwitch } iconStyle={this.styles.switchButton}>
                  {this.state.collapsed ? <NavFirstPage /> : <NavLastPage/>}
                </IconButton>
              </div>
            </div>
          </div>
          <div className="page-content" style={{padding:'1.5rem'}}>
            <div style={ styles.topBar }>
          <Chip style={ { margin: 6 } } >
            {profile.last_modified} Modified By {profile.modifier}
          </Chip>
          <div style={ styles.spacer } />
          <div>
            <IconButton style={styles.iconBtn} iconStyle={ styles.iconStyle } onTouchTap={this.handleRefresh}>
              <NavRefresh/>
            </IconButton>
            <IconButton style={styles.iconBtn} iconStyle={ styles.iconStyle } onTouchTap={this.handleSave}>
              <ContentSave/>
            </IconButton>
          </div>
        </div>
        <div>
          <div style={ styles.rowContainer }>
            <TextField
              style={ input }
              floatingLabelText='Entity code'
              floatingLabelFixed={true}
              name='entity_code'
              onChange={ this.handleFieldChange }
              value={ profile.entity_code }
              errorText={ errtips.entity_code }
            />
            <TextField
              style={ input }
              hintText='Hint Text'
              floatingLabelText='Node code'
              floatingLabelFixed={true}
              name='node_code'
              onChange={ this.handleFieldChange }
              value={ profile.node_code }
              errorText={ errtips.node_code }
            />
          </div>
          <div style={ styles.rowContainer }>
            <TextField
              style={ input }
              hintText='Hint Text'
              floatingLabelText='Short Name'
              floatingLabelFixed={true}
              name='short_name'
              onChange={ this.handleFieldChange }
              value={ profile.short_name }
              errorText={ errtips.short_name }
            />
            <TextField
              style={ Object.assign({}, input, { width: 100 }) }
              hintText='Hint Text'
              floatingLabelText='Abbreviation'
              floatingLabelFixed={true}
              name='abbr'
              onChange={ this.handleFieldChange }
              value={ profile.abbr }
              errorText={ errtips.abbr }
            />
          </div>
          <div style={ styles.rowContainer }>
            <TextField
              style={ Object.assign({}, input, { width: 512 + gutter }) }
              hintText='Hint Text'
              floatingLabelText='Entity Name'
              floatingLabelFixed={true}
              name='entity_name'
              onChange={ this.handleFieldChange }
              value={ profile.entity_name }
              errorText={ errtips.entity_name }
            />
          </div>
          <div style={ styles.rowContainer }>
            <TextField
              style={ Object.assign({}, input, { width: 512 + gutter }) }
              hintText='Hint Text'
              floatingLabelText='Source Name'
              floatingLabelFixed={true}
              name='source_name'
              onChange={ this.handleFieldChange }
              value={ profile.source_name }
              errorText={ errtips.source_name }
            />
          </div>
          <div style={ styles.rowContainer }>
            <TextField
              style={ input }
              hintText='Hint Text'
              floatingLabelText='Administrator'
              floatingLabelFixed={true}
              name='admin'
              onChange={ this.handleFieldChange }
              value={ profile.admin }
               errorText={ errtips.admin }
            />
          </div>
          <div style={ styles.rowContainer }>
            <TextField
              style={ Object.assign({}, input, { width: 512 + gutter }) }
              hintText='Hint Text'
              floatingLabelText='Service URL'
              floatingLabelFixed={true}
              name='service_url'
              onChange={ this.handleFieldChange }
              value={ profile.service_url }
              errorText={ errtips.service_url }
            />
          </div>
          <div style={ styles.rowContainer }>
            <TextField
              style={ Object.assign({}, input, { width: 512 + gutter }) }
              hintText='Hint Text'
              floatingLabelText='Binary URL'
              floatingLabelFixed={true}
              name='binary_url'
              onChange={ this.handleFieldChange }
              value={ profile.binary_url }
              errorText={ errtips.binary_url }
            />
          </div>
          <div style={ styles.rowContainer }>
            <TextField
              style={ Object.assign({}, input, { width: 512 + gutter }) }
              hintText='Hint Text'
              value={ profile.description }
              name='description'
              onChange={ this.handleFieldChange }
              floatingLabelText='Description'
              floatingLabelFixed={true}
              errorText={ errtips.description }
            />
          </div>
        </div>
      </div>
    </div>
  </div>
    );
  }
}

const RootMenuContent = ({ styles , muiTheme}) => {
  
  return (<div>
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
        <MenuItem primaryText="Profile"/>
        <MenuItem primaryText="Help &amp; feedback" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Sign out" />
    </PageJumpers>
  </div>);
};

const NewComponent = AuthConnect(
  ProfilePage,
  (state) => ({
    profile: state.config.getIn(['profile']),
  }),
  {profileSave});

export default NewComponent;
