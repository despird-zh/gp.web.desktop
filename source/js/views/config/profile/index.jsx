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
    this.props.resetRootMenu({
      menuPaneVisible:true, 
      menuPane: (<RootMenuContent muiTheme={ this.props.muiTheme } styles={this.styles}/>) ,
      menuActive: 'config',
      menuItems 
    });
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
    const gutter = muiTheme.spacing.desktopGutter;
    const input = {
      marginRight: gutter,
    };
    const styles = this.styles;
    return (
      <div className="page-wrapper">
        <header className="page-header-wrapper" style={this.styles.pageHeader}>
          <PageHeaderBar muiTheme={ muiTheme }/>
        </header>
        <div className="page-content-wrapper">
          <div className="page-right-menu">
            <div className={ this.state.collapsed ? "right-menu collapsed":"right-menu " }>
              <ProfileInfo muiTheme ={muiTheme} collapsed={this.state.collapsed}/>
              <div className="menu-footer">
                <IconButton onTouchTap={ this.onCollapseSwitch } iconStyle={this.styles.switchButton}>
                  {this.state.collapsed ? <NavFirstPage /> : <NavLastPage/>}
                </IconButton>
              </div>
            </div>
          </div>
          <div className="page-content" style={{padding:'1.5rem'}}>
            <div style={ styles.topBar }>
          <Chip
            style={ { margin: 6 } }
          >
            2017-3-4 12:12:12 Modified By bego
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
          <div style={ styles.container }>
            <TextField
              style={ input }
              floatingLabelText='Entity code'
              eventKey='entity-code'
              onHandleChange={ this.handleFieldChange }
              value={ '' }
            />
            <TextField
              style={ input }
              hintText='Hint Text'
              floatingLabelText='Node code'
              eventKey='node-code'
              onHandleChange={ this.handleFieldChange }
              value={ '' }
            />
          </div>
          <div style={ styles.container }>
            <TextField
              style={ input }
              hintText='Hint Text'
              floatingLabelText='Short Name'
              eventKey='short-name'
              onHandleChange={ this.handleFieldChange }
              value={ '' }
            />
            <TextField
              style={ Object.assign({}, input, { width: 100 }) }
              hintText='Hint Text'
              floatingLabelText='Abbreviation'
              eventKey='abbr'
              onHandleChange={ this.handleFieldChange }
              value={ '' }
            />
          </div>
          <div style={ styles.container }>
            <TextField
              style={ Object.assign({}, input, { width: 512 + gutter }) }
              hintText='Hint Text'
              floatingLabelText='Entity Name'
              eventKey='name'
              onHandleChange={ this.handleFieldChange }
              value={ '' }
            />
          </div>
          <div style={ styles.container }>
            <TextField
              style={ input }
              hintText='Hint Text'
              floatingLabelText='Administrator'
              eventKey='admin'
              onHandleChange={ this.handleFieldChange }
              value={ '' }
            />
          </div>
          <div style={ styles.container }>
            <TextField
              style={ Object.assign({}, input, { width: 512 + gutter }) }
              hintText='Hint Text'
              floatingLabelText='Service URL'
              eventKey='service-url'
              onHandleChange={ this.handleFieldChange }
              value={ '' }
            />
          </div>
          <div style={ styles.container }>
            <TextField
              style={ Object.assign({}, input, { width: 512 + gutter }) }
              hintText='Hint Text'
              floatingLabelText='Binary URL'
              eventKey='binary-url'
              onHandleChange={ this.handleFieldChange }
              value={ '' }
            />
          </div>
          <div style={ styles.container }>
            <TextField
              style={ Object.assign({}, input, { width: 512 + gutter }) }
              hintText='Hint Text'
              value={ '' }
              eventKey='description'
              onHandleChange={ this.handleFieldChange }
              floatingLabelText='Description'
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

export default connect(
  (state) => ({}),
  (dispatch) => (
    bindActionCreators({
      snackOnlyAction,
      loaderAction,
    }, dispatch)
  )
)(ProfilePage);
