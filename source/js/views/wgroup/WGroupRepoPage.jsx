import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ActDescription from 'material-ui/svg-icons/action/description';
import ActSearch from 'material-ui/svg-icons/action/search';
import CommClearAll from 'material-ui/svg-icons/communication/clear-all';
import CtntLowPriority from 'material-ui/svg-icons/content/low-priority';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';

import TreeList from '../component/TreeList';

import { Link } from 'react-router';

import NavFirstPage from 'material-ui/svg-icons/navigation/first-page';
import NavLastPage from 'material-ui/svg-icons/navigation/last-page';
import IconButton from 'material-ui/IconButton';

import PageHeaderBar from '../component/PageHeaderBar';
import Chip from '../mui-ext/Chip';
import WGroupRepoInfo from './WGroupRepoInfo';
import WGroupRepoList from './WGroupRepoList';

function getStyles(muiTheme) {
  const { baseTheme:{palette, spacing} } = muiTheme;

  return {
    chipItem: {
      marginBottom: '1rem', 
      marginRight:'1rem',
    },
    pageHeader: {
      backgroundColor: palette.primary1Color,
    },
    switchButton:{
      color: palette.primary2Color,
    },
    topbar: {
      display: 'flex',
      paddingLeft: 5,
      position: 'relative',
      flexBasis: 50,
      flexShrink: 0,
      flexGrow:0
    },
    spacer: { flex: 1 },
    filterSearch: {
      marginLeft: spacing.desktopGutterLess,
      marginRight: spacing.desktopGutterLess,
      width: 250,
    },
    filterType: {
      marginRight: spacing.desktopGutterLess,
      width: 150,
    },
    filterClass: {
      marginRight: spacing.desktopGutterLess,
      width: 150,
    },
    column: {
      padding: '1rem',
      fontSize: 16
    },
    colname: {
      padding: '1rem',
      fontSize: 16
    },
    colauthor: {
      padding: '1rem',
      textAlign:'center',
      width:60,
      fontSize: 16
    },
    colaction: {
      padding: 5,
      width:160,
      fontSize: 16
    },
    colsum: {
      padding: 5,
      fontSize: 16,
      width:160
    },
    iconStyle:{
      color: palette.primary2Color
    },
    rowIconStyle:{
      color: palette.primary2Color,
      verticalAlign:'middle'
    },
    popover:{
      padding:10, 
      width:600, 
      maxWidth:600,
      height:300,
      maxHeight:400
    },
    sumTitle:{
      color: palette.accent3Color,
      display: 'block',
      fontSize: '1.3rem',
      fontWeight: 400,
      marginBottom: '0.5rem',
      textTransform: 'uppercase'
    }
  };
}

var nodes = [
  {
    id:'2',
    title:'2222',
    expanded: true,
    children:[
      {
        id:'21',
        title:'title21',
        expanded: true,
        children:[
          {
            id:'211',
            title:'211title'
          },
          {
            id:'212',
            title:'212title'
          }
        ]
      },
      {
        id:'22',
        title:'title22',
      },
      {
        id:'23',
        title:'title22',
      },
      {
        id:'24',
        title:'title22',
      },
      {
        id:'25',
        title:'title22',
      }
    ]
  },
  {
    id:'3',
    title:'ttile3',
  }
];

class WGroupRepoPage extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {collapsed: false,
    profileExpand: false, 
      openRepoTree: false,
      showMoreFilter: false,
      selectedRows:[],
      rows: [{
        id: '1',
        name: '长亮供应链金融系统解决方案',
        label: 'label'
      },{
        id: '2',
        name: '长亮供应链金融系统解决方案.pdf',
        label: 'label'
      },{
        id: '3',
        name: '长亮供应链金融系统解决方案.pdf',
        label: 'label'
      },{
        id: '4',
        name: '长亮供应链金融系统解决方案.pdf',
        label: 'label'
      },{
        id: '6',
        name: '长亮供应链金融系统解决方案.pdf',
        label: 'label'
      },{
        id: '5',
        name: '长亮供应链金融系统解决方案.pdf',
        label: 'label'
      },
      ]
    };
    this.styles = getStyles(props.muiTheme);
  }

  onCollapseSwitch = () =>{
    this.setState({ collapsed: !this.state.collapsed });
  }

  componentDidMount () {
     window.addEventListener('scroll', this.handleScroll);
     this.props.resetRootMenu({menuPaneVisible:true, menuPane: (<RootMenuContent test1={this.onTest1} styles={this.styles}/>) });
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  nodeIcon = (node) => {
    if(!node.children){
      return <ActDescription/>;
    }
  }

  handleRepoTreeTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      openRepoTree: true,
      openRepoTreeAnchorEl: event.currentTarget,
    });
  };
  
  handleRepoTreeRequestClose = () => {
    this.setState({
      openRepoTree: false,
    });
  };

  handleScroll = (e) => {
    if(this.state.openRepoTree){
      this.setState({ openRepoTree: false });
    }
  }

  handleShowMoreFilter = () => {
    this.setState({ showMoreFilter: !this.state.showMoreFilter });
  }

  handleJumpLink = (linkItem) => {
    console.log(linkItem)
  }

  handleRowSelection = (selrows) => {

    let _selectedRows = [];
    if( (typeof selrows === 'string') && selrows === 'all'){
      _selectedRows = this.state.rows.map((row, index) => { return index });
    }else if( (typeof selrows === 'string') && selrows === 'none'){
      _selectedRows = [];
    }else{
      _selectedRows = selrows;
    }

    this.setState({selectedRows: _selectedRows});

  }

  handleRepoLink = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    console.log('- repo link' + new Date());
  }

  render() {
    const { muiTheme } = this.props;
    const styles = this.styles;

    const { openRepoTree, showMoreFilter, selectedRows, rows } = this.state;

    const filterStyle = showMoreFilter ? styles.topbar : Object.assign({}, styles.topbar, {display: 'none'});

    const hasSelected = selectedRows && selectedRows.length > 0;

    return (
      <div className="page-wrapper">
        <header className="page-header-wrapper" style={this.styles.pageHeader}>
          <PageHeaderBar muiTheme={ muiTheme }/>
        </header>
        <div className="page-content-wrapper">
          <div className="page-right-menu">
            <div className={ this.state.collapsed ? "right-menu collapsed":"right-menu " }>
              <WGroupRepoInfo muiTheme ={muiTheme}/>
              <div className="menu-footer">
                <IconButton onTouchTap={ this.onCollapseSwitch } iconStyle={this.styles.switchButton}>
                  {this.state.collapsed ? <NavFirstPage /> : <NavLastPage/>}
                </IconButton>
              </div>
            </div>
          </div>
          <div className="page-content" style={{ padding:'1.5rem' }}>
            <div style={ styles.topbar }>
              <IconButton onTouchTap={this.handleRepoTreeTouchTap} iconStyle={styles.iconStyle}>
                <CtntLowPriority/>
              </IconButton>
              <Popover
                open={this.state.openRepoTree}
                anchorEl={this.state.openRepoTreeAnchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleRepoTreeRequestClose}
                style={styles.popover}>
                <TreeList nodeIcon={this.nodeIcon} nodes={nodes} muiTheme={this.props.muiTheme}/>
              </Popover>
              <TextField style={styles.filterSearch} hintText="File or folder name"/>
              <SelectField style={styles.filterType} hintText='Format'>
                <MenuItem value={ 'doc' } primaryText='Office Word' />
                <MenuItem value={ 'xls' } primaryText='Office Excel' />
                <MenuItem value={ 'pdf' } primaryText='PDF' />
                <MenuItem value={ 'ALL' } primaryText='All' />
              </SelectField>
              <SelectField style={styles.filterClass} hintText='Classification'>
                <MenuItem value={ 'OPEN' } primaryText='Unclassified' />
                <MenuItem value={ 'CLOSE' } primaryText='Top secret' />
                <MenuItem value={ 'FULL' } primaryText='Secret' />
                <MenuItem value={ 'FULL' } primaryText='Credential' />
                <MenuItem value={ 'ALL' } primaryText='All' />
              </SelectField>

              <div style={{width:96}}>
                <IconButton iconStyle={styles.iconStyle}><ActSearch/></IconButton>
                <IconButton iconStyle={styles.iconStyle}><CommClearAll/></IconButton>
              </div>
            </div>
  
            <WGroupRepoList styles={this.styles} muiTheme={muiTheme}/>
          </div>
        </div>
      </div>
    );
  }
}
//bodyStyle={{overflowY:'scroll', height:'calc(100% - 6.4rem)'}}
const RootMenuContent = ({ test1 ,styles}) => {
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
      <Divider />
      <div>
        <h4 style={{paddingTop: 10}}>Hotest/Latest topics</h4>
        <ul style={{display:'block', paddingLeft: 0, marginTop:10, marginLeft: 0}}>
          <li style={{listStyleType:'none', display:'flex', marginLeft:0, marginBottom: '1rem'}}>
            <div style={{display: 'inline-block', flexBasis:32, width: 32, marginRight: 5, marginTop:5}}>
              <Avatar src={ `assets/img/kerem-128.jpg` } size={ 30 } /> 
            </div>
            <a href='/f' style={{display:'inline-block', textDecoration: 'none', flex:1, whiteSpace:'normal'}}>fine and expected until the data source is modified in someway (rows are removed, for example)</a>
          </li>
          <li style={{listStyleType:'none', display:'flex', marginLeft:0, marginBottom: '1rem'}}>
            <div style={{display: 'inline-block', flexBasis:32, width: 32, marginRight: 5, marginTop:5}}>
              <Avatar src={ `assets/img/kerem-128.jpg` } size={ 30 } /> 
            </div>
            <a href='/f' style={{display:'inline-block', textDecoration: 'none',flex:1, whiteSpace:'normal'}}>fine and expected until the data source is modified in someway (rows are removed, for example)</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  );
};

export default WGroupRepoPage;
