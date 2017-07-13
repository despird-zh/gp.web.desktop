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
import ContentAdd from 'material-ui/svg-icons/content/add';
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
import Chip from '../mui-ext/Chip';

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
              <div className="menu-body" style={{padding: '2rem 1.5rem 1.5rem'}}>
                <div style={{display: 'flex', marginBottom:'1rem'}}>
                  <div style={{flex:1, textAlign:'center'}}>
                    <h4 style={ styles.sumTitle }>views</h4>
                    <span style={ { marginRight: 5, verticalAligh:'middle'}}>12K</span>
                  </div>
                  <div style={{flex:1, textAlign:'center'}}>
                    <h4 style={ styles.sumTitle }>replies</h4>
                    <span style={ { marginRight: 5, verticalAligh:'middle'}}>12K</span>
                  </div>
                  <div style={{flex:1, textAlign:'center'}}>
                    <h4 style={ styles.sumTitle }>joins</h4>
                    <span style={ { marginRight: 5, verticalAligh:'middle'}}>12</span>
                  </div>
                  <div style={{flex:1, textAlign:'center'}}>
                    <h4 style={ styles.sumTitle }>评论</h4>
                    <span style={ { marginRight: 5, verticalAligh:'middle'}}>123</span>
                  </div>
                </div>
                <div style={{ display:'block' ,paddingBottom:10}} className="clearfix">
                  <div style={{float:'left', minWidth:'25%', textAlign:'center'}}>
                    <h4 style={ styles.sumTitle }>创建</h4>
                    <div style={{ display:'block'}}>
                      <a href='' >
                        <Avatar src={ `assets/img/kerem-128.jpg` } size={ 20 } style={ { marginRight: 5,verticalAlign:'middle'} } /> 
                      </a>
                      <span style={ { marginRight: 5, display:'inline-block', verticalAligh:'middle'}}>17天</span>
                    </div>
                  </div>
                  <div style={{float:'left', minWidth:'25%', textAlign:'center'}}>
                    <h4 style={ styles.sumTitle }>活动</h4>
                    <div style={{ display:'block'}}>
                      <a href='' >
                        <Avatar src={ `assets/img/kerem-128.jpg` } size={ 20 } style={ { marginRight: 5,verticalAlign:'middle'} } /> 
                      </a>
                      <span style={ { marginRight: 5, display:'inline-block', verticalAligh:'middle'}}>7H</span>
                    </div>
                  </div>
                </div>
                <Divider />
                <div style={{padding:'10px 0'}}>
                  <Chip style={{margin:4, display: 'inline-block', fontSize: 12}}>
                    技术
                  </Chip>
                  <Chip style={{margin:4, display: 'inline-block'}}>
                    机械
                  </Chip>
                  <Chip style={{margin:4, display: 'inline-block'}}>
                    加工
                  </Chip>
                </div>
                <Divider />
                <div>
                  <h3 style={{
                    paddingTop: 10, 
                    color:'rgb(158, 158, 158)',
                    textRendering: 'optimizeLegibility',
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    lineHeight: '3rem',
                    textTransform: 'uppercase'}}>Attendees</h3>
                  <div style={ { paddingTop: '0.5rem', paddingBottom: 10 } }>
                    <IconButton style={{width:30, height:30, padding:0, marginRight: '1rem'}}>
                      <Avatar src='assets/img/uxceo-128.jpg' size={ 30 } style={ { marginRight: 5 } } />
                    </IconButton>
                    <IconButton style={{width:30, height:30, padding:0, marginRight: '1rem'}}>
                      <Avatar src='assets/img/ok-128.jpg' size={ 30 } style={ { marginRight: 5 } } />
                    </IconButton>
                    <IconButton style={{width:30, height:30, padding:0, marginRight: '1rem'}}>
                      <Avatar src='assets/img/kolage-128.jpg' size={ 30 } style={ { marginRight: 5 } } />
                    </IconButton>
                    <IconButton style={{width:30, height:30, padding:0, marginRight: '1rem'}}>
                      <Avatar src='assets/img/jsa-128.jpg' size={ 30 } style={ { marginRight: 5 } } />
                    </IconButton>
                    <IconButton style={{width:30, height:30, padding:0, marginRight: '1rem'}}>
                      <Avatar src='assets/img/kerem-128.jpg' size={ 30 } style={ { marginRight: 5 } } />
                    </IconButton>
                    <IconButton 
                      style={{width:30, height:30, padding:0, borderRadius:'50%',border:'1px dashed #a3a3a3'}} 
                      iconStyle={{ marginTop:0}}>
                      <ContentAdd/>
                    </IconButton>
                  </div>
                </div>
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
  
            <Table multiSelectable={true} wrapperStyle={{flex:1, overflow:'hidden'}}
              bodyStyle={{overflowY:'scroll', height:'30rem'}}
              headerStyle={{paddingRight:15}}
              fixedHeader={true}
              onRowSelection={this.handleRowSelection}>
              <TableHeader enableSelectAll={true}>
                {hRowEls}
              </TableHeader>
              <TableBody deselectOnClickaway={false} preScanRows={true} >
                {rowEls}
              </TableBody>
            </Table>
            <div style={{flex:1, overflow:'hidden'}}>
              <div style={{display:'flex',borderBottom: '1px solid rgb(224, 224, 224)'}}>
                <IconButton style={{flexShrink:0, flexGrow:0}}><ActSearch/></IconButton>
                <div style={{flex:1, display: 'flex', verticalAlign:'middle'}}>
                  xxxxx
                </div>
                <div style={styles.colauthor}>
                  xxxx
                </div>
                <div style={styles.colsum}> summ</div>
                <div style={styles.colaction}>xxx</div>
              </div>
              <ul style={{marginLeft:0, padding:0}}>
                <li style={{paddingLeft:0, display:'flex', borderBottom: '1px solid rgb(224, 224, 224)'}}>
                <IconButton style={{flexShrink:0, flexGrow:0}}><ActSearch/></IconButton>
                <div style={{flex:1,display: 'flex', verticalAlign:'middle'}}>
                  <div style={{flex: '0 0 30px', verticalAlign:'middle' }}>
                    <span style={{display:'inline-block', height:'100%', verticalAlign:'middle'}}/>
                    <FileFolder style={styles.rowIconStyle}/>
                  </div>
                  <div style={{ flex:1, width:300 , overflow: 'hidden'}}>
                    <a style={{ textDecoration: 'none', display: 'block',overflow: 'hidden',
                      whiteSpace: 'nowrap', cursor: 'pointer',
                      color:'rgb(0, 151, 167)',
                      textOverflow: 'ellipsis', paddingBottom:'0.5rem'}} 
                      onClick={this.handleRepoLink}>
                    <span> what is the best choice.</span>
                    </a>
                    <span style={{display: 'block',overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      color:'rgb(158, 158, 158)',
                      fontSize: '1.4rem',
                      fontWeight: 300,
                      textOverflow: 'ellipsis'}}>
                      伊拉克苏马里亚电视台网站当天报道，“伊斯兰国”媒体发布简短声明，称巴格达迪已经死亡，这一组织将产生新的最高头目。声明没有给出巴格达迪死亡细节
                    </span>
                  </div>
                </div>
                <div style={styles.colauthor}>
                  <Avatar src="assets/img/kerem-128.jpg" size={30} style={{ verticalAlign:'middle'}} />
                </div>
                <div style={styles.colsum}> 3 folders, 12 files 1.3G</div>
                <div style={styles.colaction}>xxxxx</div>
                </li>
              </ul>
            </div>
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

export default connect(
  (state) => ({}),
  (dispatch) => (
    bindActionCreators({
      snackAction,
      loaderAction,
    }, dispatch)
  )
)(WGroupRepoPage);
