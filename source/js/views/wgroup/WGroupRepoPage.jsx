import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';
import ActDescription from 'material-ui/svg-icons/action/description';
import ActSearch from 'material-ui/svg-icons/action/search';
import CtntClear from 'material-ui/svg-icons/content/clear';
import CommClearAll from 'material-ui/svg-icons/communication/clear-all';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FileFolderOpen from 'material-ui/svg-icons/file/folder-open';
import NaviExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NaviExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import CtntLowPriority from 'material-ui/svg-icons/content/low-priority';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import {
  Table,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TableBody from '../mui-ext/TableBody';
import TableHeader from '../mui-ext/TableHeader';
import TreeList from '../component/TreeList';

import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import NavFirstPage from 'material-ui/svg-icons/navigation/first-page';
import NavLastPage from 'material-ui/svg-icons/navigation/last-page';
import IconButton from 'material-ui/IconButton';

import Breadcrumb from '../component/Breadcrumb';
import { snackAction, loaderAction } from '../../store/actions/appActions';
import PageHeaderBar from '../component/PageHeaderBar';

function getStyles(muiTheme) {
  const { baseTheme } = muiTheme;

  return {
    pageHeader: {
      backgroundColor: baseTheme.palette.primary1Color,
    },
    switchButton:{
      color: baseTheme.palette.primary2Color,
    },
    topbar: {
      display: 'flex',
      paddingLeft: 5,
      position: 'relative',
    },
    spacer: { flex: 1 },
    filterSearch: {
      marginLeft: baseTheme.spacing.desktopGutterLess,
      marginRight: baseTheme.spacing.desktopGutterLess,
      width: 250,
    },
    filterType: {
      marginRight: baseTheme.spacing.desktopGutterLess,
      width: 150,
    },
    filterClass: {
      marginRight: baseTheme.spacing.desktopGutterLess,
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
      color: baseTheme.palette.primary2Color
    },
    rowIconStyle:{
      color: baseTheme.palette.primary2Color,
      verticalAlign:'middle'
    },
    popover:{
      padding:10, 
      width:600, 
      maxWidth:600,
      height:300,
      maxHeight:400
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

const links = [
{
  id: '1',
  label: 'link2天涯处理工作如何',
},
{
  id: '2',
  label: 'link2天涯处理工作如何',
},
{
  id: '21',
  label: 'link2天涯处理工作如何',
},
{
  id: '22',
  label: 'link2天涯处理工作如何',
},
{
  id: '23',
  label: 'link2天涯处理工作如何',
},
{
  id: '24',
  label: 'link2天涯处理工作如何',
},
{
  id: '3',
  label: 'link2天涯处理工作如何',
},
{
  id: '31',
  label: 'link2天涯处理工作如何',
},
{
  id: '32',
  label: 'link2天涯处理工作如何',
},
{
  id: '33',
  label: 'link2天涯处理工作如何',
},
{
  id: '4',
  label: 'link2天涯处理工作如何',
}
]
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

  onTest = () => {
    this.props.resetRootMenu({menuPaneVisible:true, menuPane: (<RootMenuContent test1={this.onTest1}/>) });
  }

  onTest1 = () => {
    console.log('12------3')
  }

  componentDidMount () {
     window.addEventListener('scroll', this.handleScroll);
     this.props.resetRootMenu({menuPaneVisible:true, menuPane: (<RootMenuContent test1={this.onTest1}/>) });
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

    const hRowEls = !hasSelected ? (<TableRow  style={{height: 64}}>
                <TableHeaderColumn style={Object.assign({},styles.colname,{fontSize:12})}>Name</TableHeaderColumn>
                <TableHeaderColumn style={Object.assign({},styles.colauthor,{fontSize:12})}>Author</TableHeaderColumn>
                <TableHeaderColumn style={Object.assign({},styles.colsum,{fontSize:12})}>Summary</TableHeaderColumn>
                <TableHeaderColumn style={Object.assign({},styles.colaction,{fontSize:12})}>Actions</TableHeaderColumn>
              </TableRow>) :
               (<TableRow  style={{height: 64}}>
                <TableHeaderColumn style={styles.column} colSpan={4}>
                  <RaisedButton label='Clear' style={ { margin: 4 } } onTouchTap={ this.handleClear } />
                </TableHeaderColumn>
                </TableRow>);

    const rowEls = rows.map((row, index) => {

      let filterRows = selectedRows.filter( i => (i === index) );

      return (
        <TableRow key={`tr-${row.id}`} selected={ filterRows && filterRows.length > 0} selectable={true}>
          <TableRowColumn style={styles.colname}>
          <div style={{display: 'flex', verticalAlign:'middle'}}>
            <div style={{flex: '0 0 30px', verticalAlign:'middle' }}>
              <span style={{display:'inline-block', height:'100%', verticalAlign:'middle'}}/>
              <FileFolder style={styles.rowIconStyle}/>
            </div>
            <div style={{ flex:1 , overflow: 'hidden'}}>
              <a style={{ textDecoration: 'none', display: 'block',overflow: 'hidden',
                whiteSpace: 'nowrap', cursor: 'pointer',
                color:'rgb(0, 151, 167)',
                textOverflow: 'ellipsis', paddingBottom:'0.5rem'}} 
                onClick={this.handleRepoLink}>
               <span> {row.name}what is the best choice.</span>
              </a>
              <span style={{display: 'block',overflow: 'hidden',
                whiteSpace: 'nowrap',
                color:'rgb(158, 158, 158)',
                fontSize: '1.4rem',
                fontWeight: 300,
                textOverflow: 'ellipsis'}}>
                {row.name} what is the best choice.
              </span>
            </div>
          </div>
          </TableRowColumn>
          <TableRowColumn style={styles.colauthor}>
            <Avatar src="assets/img/kerem-128.jpg" size={30} style={{ verticalAlign:'middle'}} />
          </TableRowColumn>
          <TableRowColumn style={styles.colsum}> 3 folders, 12 files 1.3G</TableRowColumn>
          <TableRowColumn style={styles.colaction}>{row.label}</TableRowColumn>
        </TableRow>
      );
    });

    return (
      <div className="page-wrapper">
        <header className="page-header-wrapper" style={this.styles.pageHeader}>
          <PageHeaderBar muiTheme={ muiTheme }/>
        </header>
        <div className="page-content-wrapper">
          <div className="page-right-menu">
            <div className={ this.state.collapsed ? "right-menu collapsed":"right-menu " }>
              <div className="menu-body">
              ddddddddddd
              </div>
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
 
            <Table multiSelectable={true}
              onRowSelection={this.handleRowSelection}>
              <TableHeader enableSelectAll={true}>
                {hRowEls}
              </TableHeader>
              <TableBody deselectOnClickaway={false} preScanRows={true}>
                {rowEls}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

const RootMenuContent = ({ test1 }) => {
  
  return (<div>
    <RaisedButton label="Test" primary={true} onTouchTap={test1}/>
  </div>);
};

export default connect(
  (state) => ({}),
  (dispatch) => (
    bindActionCreators({
      snackAction,
      loaderAction,
    }, dispatch)
  )
)(WGroupRepoPage);
