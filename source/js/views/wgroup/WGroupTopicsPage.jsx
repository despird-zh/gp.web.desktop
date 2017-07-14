import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';
import CommClearAll from 'material-ui/svg-icons/communication/clear-all';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import { grey400, darkBlack } from 'material-ui/styles/colors';
import AVStop from 'material-ui/svg-icons/av/stop';
import NavFirstPage from 'material-ui/svg-icons/navigation/first-page';
import NavLastPage from 'material-ui/svg-icons/navigation/last-page';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ActionSearch from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';

import { snackAction, loaderAction } from '../../store/actions/appActions';
import PageHeaderBar from '../component/PageHeaderBar';
import Chip from '../mui-ext/Chip';
import WGroupTopicsList from './WGroupTopicsList';

function getStyles(muiTheme) {
  const { baseTheme:{ palette },paper  } = muiTheme;

  return {
    chipItem: {
      marginBottom: '1rem', 
      marginRight:'1rem',
    },

    iconBtn: {
      color: palette.primary2Color,
    },
    topBar:{
      padding: '0  0',
    },

    tileItem: {
      boxShadow: paper.zDepthShadows[1],
      width:'18rem', 
      height:'12rem', 
      borderRadius: 6, 
      margin: '0.8rem'
    },
    iconStyle:{
      color: palette.primary2Color
    },
    pageHeader: {
      backgroundColor: palette.primary1Color,
    }
  };
}

const users = ['jsa-128.jpg', 'kerem-128.jpg', 'kolage-128.jpg', 'ok-128.jpg', 'uxceo-128.jpg'];

class WGroupTopicsPage extends Component {

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
    this.props.resetRootMenu({
      menuPaneVisible:true, 
      menuPane: (<RootMenuContent test1={this.onTest1} styles={this.styles}/>) 
    });
  }

  render() {
    let { muiTheme } = this.props;
    const styles = this.styles;

    return (
      
      <div className="page-wrapper">
        <header className="page-header-wrapper" style={this.styles.pageHeader}>
          <PageHeaderBar muiTheme={ muiTheme }/>
        </header>
        <div className="page-content-wrapper">
          <div className="page-content" style={{ padding:'1.5rem' }}>
            <div style={ styles.topBar }>
              <TextField hintText="Hint Text"/>
              <IconButton iconStyle={ styles.iconStyle }>
                <ActionSearch/>
              </IconButton>
              <IconButton iconStyle={ styles.iconStyle }>
                <CommClearAll />
              </IconButton>
            </div>
            <WGroupTopicsList muiTheme = {muiTheme} />
          </div>
        </div>
      </div>
    );
  }
}

const RootMenuContent = ({ test1, styles }) => {
  
  const handleDelete = () => {};

  return (
  <div>
    <header className="panel-header"> 
      <div className="panel-header__container active">
        <h2 className="panel-header__title">Tag Filter</h2>
        <IconButton >
          <CommClearAll />
        </IconButton>
      </div>
    </header>
    <div style={{padding:'0 15px 15px'}}>
      <div style={{display: 'flex',flexWrap: 'wrap'}}>
        <Chip
          key={1}
          onRequestDelete={handleDelete}
          style={styles.chipItem}>
          Test Tag
        </Chip>
        <Chip
          key={2}
          onRequestDelete={handleDelete}
          style={styles.chipItem}>
          Test Tag
        </Chip>
      </div>
      <Divider style={{marginBottom:10}}/>
      <div style={{display: 'flex',flexWrap: 'wrap'}}>
        <Chip
          key={1}
          onRequestAdd={handleDelete}
          style={styles.chipItem}>
          Test Tag
        </Chip>
        <Chip
          key={2}
          onRequestAdd={handleDelete}
          style={styles.chipItem}>
          Test Tag
        </Chip>
        <Chip
          key={3}
          onRequestAdd={handleDelete}
          style={styles.chipItem}>
          Test Tag
        </Chip>
        <Chip
          key={4}
          onRequestAdd={handleDelete}
          style={styles.chipItem}>
          Test Tag
        </Chip>
      </div>
    </div>
  </div>
  );
};

export default connect(
  (state) => ({}),
  (dispatch) => (
    bindActionCreators({
      snackAction,
      loaderAction,
    }, dispatch)
  )
)(WGroupTopicsPage);