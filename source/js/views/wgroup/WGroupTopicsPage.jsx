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
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import { snackAction, loaderAction } from '../../store/actions/appActions';
import PageHeaderBar from '../component/PageHeaderBar';
import Chip from '../mui-ext/Chip';

function getStyles(muiTheme) {
  const { baseTheme:{ palette },paper  } = muiTheme;

  return {
    chipItem: {
      marginBottom: '1rem', 
      marginRight:'1rem',
    },
    column: {
      padding: 5,
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
    const numCol = Object.assign({}, styles.column, { width: 60, textAlign: 'center' });
    const cateCol = Object.assign({}, styles.column, { width: 100 });
    const userCol = Object.assign({}, styles.column, { width: 160, verticalAlign: 'middle' });

    const usersEl = users.map((item, index) => {
      return (
        <a key={index} href='' style={ { display: 'block', float: 'left', height: 25 } }><Avatar src={ `assets/img/${ item }` } size={ 25 } style={ { marginRight: 5 } } /></a>
      );
    });

    return (
      <div className="page-wrapper">
        <header className="page-header-wrapper" style={this.styles.pageHeader}>
          <PageHeaderBar muiTheme={ muiTheme }/>
        </header>
        <div className="page-content-wrapper">
          <div className="page-content">
            <div style={ styles.topBar }>
              <TextField
                  hintText="Hint Text"
                />
              <IconButton>
                <ActionSearch/>
              </IconButton>
              <IconButton>
                <CommClearAll />
              </IconButton>
            </div>
            <Table wrapperStyle={{ padding:'0 1.5rem' }}>
              <TableHeader
                adjustForCheckbox={ false }
                enableSelectAll={ false }
                displaySelectAll={ false }
                style={ { borderBottomWidth: 1 } }
              >
                <TableRow>
                  <TableHeaderColumn style={ styles.column }>Topic</TableHeaderColumn>
                  <TableHeaderColumn style={ cateCol }>Category</TableHeaderColumn>
                  <TableHeaderColumn style={ userCol }>Users</TableHeaderColumn>
                  <TableHeaderColumn style={ numCol }>Rep.</TableHeaderColumn>
                  <TableHeaderColumn style={ numCol }>Vw.</TableHeaderColumn>
                  <TableHeaderColumn style={ numCol }>Act.</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={ false }>
                <TableRow>
                  <TableRowColumn style={ styles.column }>
                    <span style={ { fontSize: 14, fontWeight: 600 } }>
                      <a href='/slsl' style={ styles.topicTitle }>如何构建一个出色的应用特别是SPA?</a>
                    </span>
                    <div style={ { fontSize: 14, color: '#919191', wordBreak: 'break-all', wordWrap: 'break-word', lineHeight: 1.4, whiteSpace: 'normal', paddingRight: 5 } }>
                      <span>在 HTML 4.01 中，不赞成使用 td 元素的 nowrap 属性；在 XHTML 1.0 Strict DTD 中，不支持 td 元素的 nowrap 属性。
                        <a href='/t/welcome-to-the-react-discussion-forum/11'>read more...</a>
                      </span>
                    </div>
                  </TableRowColumn>
                  <TableRowColumn style={ cateCol }>
                    <span style={ { display: 'block', height: 18, verticalAlign: 'middle' } }>
                      <AVStop style={ { width: 16, height: 16, color: 'red', float: 'left', marginTop: 3, marginRight: 5 } } />
                    Develop
                    </span>
                  </TableRowColumn>
                  <TableRowColumn style={ userCol }>
                    {usersEl}
                  </TableRowColumn>
                  <TableRowColumn style={ numCol }>34</TableRowColumn>
                  <TableRowColumn style={ numCol }>3K</TableRowColumn>
                  <TableRowColumn style={ numCol }>45</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn style={ styles.column }>
                    <span style={ { fontSize: 14, fontWeight: 600 } }>
                      <a href='/lklk' style={ styles.topicTitle }>Any good library in React for building DockSpawn style windows on an SPA?</a>
                    </span>
                  </TableRowColumn>
                  <TableRowColumn style={ cateCol }>
                    <span style={ { display: 'block', height: 18, verticalAlign: 'middle' } }>
                      <AVStop style={ { width: 18, height: 18, color: 'yellow', float: 'left', marginTop: 3, marginRight: 5 } } />
                    Develop
                    </span>
                  </TableRowColumn>
                  <TableRowColumn style={ userCol }>
                    {usersEl}
                  </TableRowColumn>
                  <TableRowColumn style={ numCol }>34</TableRowColumn>
                  <TableRowColumn style={ numCol }>3.2K</TableRowColumn>
                  <TableRowColumn style={ numCol }>4</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
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