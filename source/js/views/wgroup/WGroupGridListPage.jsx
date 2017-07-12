import React from 'react';
import PropTypes from 'prop-types';

import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import ActInfoOutLine from 'material-ui/svg-icons/action/info-outline';
import ActViewList from 'material-ui/svg-icons/action/view-list';
import ActViewModule from 'material-ui/svg-icons/action/view-module';
import CommClearAll from 'material-ui/svg-icons/communication/clear-all';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionSearch from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';

import NavFirstPage from 'material-ui/svg-icons/navigation/first-page';
import NavLastPage from 'material-ui/svg-icons/navigation/last-page';

import PageHeaderBar from '../component/PageHeaderBar';
import AuthConnect from '../component/AuthConnect';
import Chip from '../mui-ext/Chip';
import WGroupProfileInfo from './WGroupProfileInfo';

function getStyles(muiTheme) {
  const { baseTheme:{ palette },paper } = muiTheme;
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
    },
    switchButton:{
      color: palette.primary2Color,
    }
  };
}

const tilesData = [
  {
    img: 'assets/img/flower-demo.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'assets/img/flower-demo.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: 'assets/img/flower-demo.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'assets/img/flower-demo.jpg',
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: 'assets/img/flower-demo.jpg',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'assets/img/flower-demo.jpg',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: 'assets/img/flower-demo.jpg',
    title: 'Vegetables',
    author: 'Maryland',
  },
  {
    img: 'assets/img/flower-demo.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
];

class WGroupGridListPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { collapsed: true};
    this.styles = getStyles(props.muiTheme);
  }

  onCollapseSwitch = () =>{
    this.setState({ collapsed: !this.state.collapsed });
  }

  onShowDetail = () => {
    this.setState({ collapsed: false });
  }

  componentDidMount() {
    this.props.resetRootMenu({
      menuPaneVisible:true, 
      menuPane: (<RootMenuContent test1={this.onTest1} styles={this.styles}/>) 
    });
  }

  test = () => {
    console.log('-==-')
  }

  render() {
    const styles = this.styles;
    let { muiTheme } = this.props;

    return (
      <div className="page-wrapper">
        <header className="page-header-wrapper" style={styles.pageHeader}>
          <PageHeaderBar muiTheme={ muiTheme }/>
        </header>
        <div className="page-content-wrapper">
          { this.state.collapsed ? null:(<div className="page-right-menu">
            <div className={ this.state.collapsed ? "right-menu collapsed":"right-menu " }>
              <div className="menu-body">
                <WGroupProfileInfo muiTheme = {muiTheme}/>
              </div>
              <div className="menu-footer">
                <IconButton onTouchTap={ this.onCollapseSwitch } iconStyle={this.styles.switchButton}>
                  {this.state.collapsed ? <NavFirstPage /> : <NavLastPage/>}
                </IconButton>
              </div>
            </div>
          </div>)}
          <div className="page-content">
            <div style={styles.topBar}>
              <TextField
                  hintText="Hint Text"
                />
              <IconButton tooltip="search workgroups" tooltipPosition="bottom-center">
                <ActionSearch/>
              </IconButton>
              <IconButton tooltip="clear all the condition" tooltipPosition="bottom-center">
                <CommClearAll />
              </IconButton>
            </div>
            <div style={styles.gridList}>
              <Subheader>December</Subheader>
              {tilesData.map((tile) => (
                <GridTile
                  key={tile.author}
                  style={ styles.tileItem }
                  title={<a href="#">tile.title</a>}
                  subtitle={<span>by <b>{tile.author}</b></span>}
                  actionIcon={<IconButton onTouchTap={ this.onShowDetail }><ActInfoOutLine color="white" /></IconButton>}>
                  <img src={tile.img} />
                </GridTile>
              ))}
            </div>
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
        <h2 className="panel-header__title">Quick Filter</h2>
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
          Joined
        </Chip>
        <Chip
          key={2}
          onRequestDelete={handleDelete}
          style={styles.chipItem}>
          Top 10(Active)
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

WGroupGridListPage.propTypes = {
  resetRootMenu: PropTypes.func,
  muiTheme: PropTypes.object,
};

const NewComponent = AuthConnect(
  WGroupGridListPage,
  (state) => ({
  }),
  { });

export default NewComponent;