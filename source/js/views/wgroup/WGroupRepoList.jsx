import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import CheckboxOutline from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import CheckboxChecked from 'material-ui/svg-icons/toggle/check-box';
import IndeterminateCheckbox from 'material-ui/svg-icons/toggle/indeterminate-check-box';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Avatar from 'material-ui/Avatar';

function getStyles(muiTheme) {
  const { baseTheme:{palette, spacing} } = muiTheme;
  const styles = {
    iconStyle:{
      color: palette.primary2Color
    },
    rowStyle:{
      paddingLeft:0, 
      display:'flex', 
      borderBottom: '1px solid rgb(224, 224, 224)'
    },
    colCheck: {
      flexShrink:0, 
      flexGrow:0, 
      padding: '0.5rem'
    },
    colName: {
      flexShrink:1, 
      flexGrow:1,
      flexBasis: '0%',
      width:300,
      display: 'flex', 
      verticalAlign:'middle',
      fontSize: 16
    },
    colAuthor: {
      padding: '1.5rem 1rem',
      textAlign:'center',
      width:60,
      flexShrink:0, 
      flexGrow:0, 
      fontSize: 16
    },
    colAction: {
      padding: 5,
      width:160,
      flexShrink:0, 
      flexGrow:0, 
      fontSize: 16
    },
    colSum: {
      padding: 5,
      fontSize: 16,
      flexShrink:0, 
      flexGrow:0, 
      width:160
    }, 
    rowIconStyle:{
      color: palette.primary2Color,
      verticalAlign:'middle'
    },
  };

  const headerCol = {
      color: palette.accent3Color,
      padding: '1.8rem 0.5rem'
    };

  styles.colNameHeader = Object.assign({}, styles.colName, headerCol);
  styles.colActionHeader = Object.assign({}, styles.colAction, headerCol);
  styles.colSumHeader = Object.assign({}, styles.colSum, headerCol);
  styles.colAuthorHeader = Object.assign({}, styles.colAuthor, headerCol);

  return styles;
}

function getFakeData(cnt){
  let data = [];
  for(let i = cnt; i<10 + cnt; i++){
      data.push({
        id: `id-${i}`,
        name: '随时随地，简单便捷，给您移动办公最佳体验',
        descr: '伊拉克苏马里亚电视台网站当天报道，“伊斯兰国”媒体发布简短声明，称巴格达迪已经死亡，这一组织将产生新的最高头目。声明没有给出巴格达迪死亡细节',
        summary: '3 folders, 12 files 1.3G' 
      });
    }
  return data;
}

class WGroupRepoList extends Component {

  constructor(props){
    super(props);
    let data = getFakeData(0);
    this.state = {
      rowData : data,
      hasMore: true,
      isLoading: false,
      selectData: [],
    };
    this.styles = getStyles(props.muiTheme);
  }

  setLoadIndicator = (el) => {
    this.loadIndicator = el;
  }

  handleLoadMore = () => {
    let currIdx = this.state.rowData.length;
    let data = getFakeData(currIdx);
    let rowData = this.state.rowData.concat(data); 
    this.setState({rowData, isLoading: false});
  }

  onHandleUpdate = (values) => {
    const { isLoading, hasMore } = this.state;
    const { scrollTop, scrollHeight, clientHeight } = values;
    const bottomScrollTop = scrollHeight - clientHeight;
    if(scrollTop > bottomScrollTop - 40 && !isLoading && hasMore){
      this.setState({isLoading: true});
      this.handleLoadMore();
    }
  }

  onRowSelect = ( rowId ) => {
    const { rowData, selectData } = this.state;
    const rowIndex = rowData.findIndex((data) => rowId == data.id );
    const rowSelectIndex = selectData.findIndex((data) => data == rowId );
    rowData[rowIndex].select = !rowData[rowIndex].select;

    if( rowSelectIndex >= 0 ){
      selectData.splice(rowSelectIndex,1);
    }else{
      selectData.push(rowId);
    }

    this.setState({ rowData, selectData });
  }

  onAllSelect = () => {
    const { rowData, selectData } = this.state;
    let newRowData = [];
    let newSelectData = [];

    if(rowData.length === selectData.length && selectData.length > 0){
      newRowData = rowData.map((data) => { 
        data.select = false;
        return data;
      });
    }else{
      newRowData = rowData.map((data) => { 
        data.select = true ;
        newSelectData.push(data.id);
        return data;
      });
    }

    this.setState({ rowData: newRowData, selectData: newSelectData});
  }

  render(){

    const { rowData, selectData } = this.state;
    const styles = this.styles;
    const headerNameStyle = Object.assign({}, styles.colName, {});

    let rows = rowData.map((data)=>{
      return (<RepoListRow key={`row-${data.id}`} rowData={data} onRowSelect = {this.onRowSelect} styles={ styles }/>);
    });
    
    let selectAllIcon = <CheckboxOutline/>;
    //console.log(`rowlen: ${rowData.length} / sellen: ${selectData.length}`);
    if( rowData.length !== selectData.length && selectData.length > 0 ){
      selectAllIcon = <IndeterminateCheckbox/>;
    }else if(rowData.length === selectData.length && selectData.length > 0){
      console.log(selectData.length);
      selectAllIcon = <CheckboxChecked/>;
    }
    
    return (
      <div style={{flex:1, overflow:'hidden'}}>
        <div style={{display:'flex',borderBottom: '1px solid rgb(224, 224, 224)'}}>
          <div style={ styles.colCheck }>
            <IconButton iconStyle={ styles.iconStyle } onTouchTap={ this.onAllSelect }>
              { selectAllIcon }
            </IconButton>
          </div>
          <div style={ styles.colNameHeader }>
            Entry Name
          </div>
          <div style={ styles.colAuthorHeader }>
            Author
          </div>
          <div style={ styles.colSumHeader }> Summary</div>
          <div style={ styles.colActionHeader }>Action</div>
        </div>
        <Scrollbars style={{ height: 'calc( 100% - 5.8rem)' }}
          // This will activate auto hide
          autoHide
          // Hide delay in ms
          autoHideTimeout={1000}
          // Duration for hide animation in ms.
          autoHideDuration={200}
          onUpdate={this.onHandleUpdate}>
          <ul style={{marginLeft:0, padding:0}}>
            { rows }
            { this.state.hasMore ? <li ref={this.setLoadIndicator} style={{paddingLeft:0, height:40, display:'block', borderBottom: '1px solid rgb(224, 224, 224)'}}>
              loading...
            </li>: null}
          </ul>
         </Scrollbars>
      </div>
    );
  };
}

const RepoListRow = ({ rowData, styles, onRowSelect}) => {
  const handleRowSelect = () => {
    onRowSelect(rowData.id);
  };
  return (
    <li style={ styles.rowStyle }>
      <div style={ styles.colCheck }>
        <IconButton iconStyle={ styles.iconStyle } onTouchTap={handleRowSelect} >{ rowData.select ? <CheckboxChecked/>:<CheckboxOutline/>}</IconButton>
      </div>
      <div style={ styles.colName }>
        <div style={{flex: '0 0 35px', verticalAlign:'middle' }}>
          <span style={{display:'inline-block', height:'100%', verticalAlign:'middle'}}/>
          <FileFolder style={styles.rowIconStyle}/>
        </div>
        <div style={{ flex:1, width:300 , overflow: 'hidden'}}>
          <a style={{ textDecoration: 'none', 
            display: 'block',
            padding: '0.5rem 0 0.2rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap', cursor: 'pointer',
            color:'rgb(0, 151, 167)',
            textOverflow: 'ellipsis', paddingBottom:'0.5rem'}} >
            <span> {rowData.name} - {rowData.id}</span>
          </a>
          <span style={{display: 'block',
            overflow: 'hidden',
            padding: '0.3rem 0 0.5rem',
            whiteSpace: 'nowrap',
            color:'rgb(158, 158, 158)',
            fontSize: '1.4rem',
            fontWeight: 300,
            textOverflow: 'ellipsis'}}>
            { rowData.descr }
          </span>
        </div>
      </div>
      <div style={ styles.colAuthor }>
        <Avatar src="assets/img/kerem-128.jpg" size={30} style={{ verticalAlign:'middle'}} />
      </div>
      <div style={styles.colSum}>{ rowData.summary }</div>
      <div style={styles.colAction}>xxxxx</div>
    </li>
  );
};

export default WGroupRepoList;