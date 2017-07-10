import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';
import CommClearAll from 'material-ui/svg-icons/communication/clear-all';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import { snackAction, loaderAction } from '../../store/actions/appActions';
import PageHeaderBar from '../component/PageHeaderBar';
import Chip from '../mui-ext/Chip';
import NavFirstPage from 'material-ui/svg-icons/navigation/first-page';
import NavLastPage from 'material-ui/svg-icons/navigation/last-page';

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
      padding: '1rem 2rem 0',
    },
    gridList: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: 0,
      width: '100%',
      padding: '0 1rem 1rem',
      overflowY: 'auto'
    },
    tileItem: {
      boxShadow: paper.zDepthShadows[1],
      width:'18rem', 
      height:'12rem', 
      borderRadius: 6, 
      margin: '0.8rem'
    },
    pageHeader: {
      backgroundColor: palette.primary1Color,
    }
  };
}

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
                { this.state.collapsed ? <NavFirstPage onClick={ this.onCollapseSwitch }/> : <NavLastPage onClick={ this.onCollapseSwitch }/>}
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