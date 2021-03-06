import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import CheckboxOutline from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import CheckboxChecked from 'material-ui/svg-icons/toggle/check-box';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import ToggleStarBorder from 'material-ui/svg-icons/toggle/star-border';
import IndeterminateCheckbox from 'material-ui/svg-icons/toggle/indeterminate-check-box';
import FileFolder from 'material-ui/svg-icons/file/folder';
import AVFiberRecord from 'material-ui/svg-icons/av/fiber-manual-record';
import Avatar from 'material-ui/Avatar';

function getStyles(muiTheme) {
  const { baseTheme:{palette, spacing} } = muiTheme;
  const styles = {
    iconBtn: {
      width:40, 
      height:40,
      padding:5,
    },
    iconStyle:{
      color: palette.primary2Color
    },
    rowStyle:{
      paddingLeft:0, 
      display:'flex', 
      position: 'relative',
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
      paddingRight: 5,
      fontSize: 16
    },
    colAuthor: {
      padding: 5,
      width:60,
      flexShrink:0, 
      flexGrow:0, 
      fontSize: 16
    },
    colAction: {
      padding: 5,
      width:90,
      flexShrink:0, 
      flexGrow:0, 
      fontSize: 16
    },
    colSum: {
      padding: 5,
      fontSize: 16,
      flexShrink:0, 
      flexGrow:0, 
      width:100
    }, 
    rowIconStyle:{
      color: palette.primary2Color,
      verticalAlign:'middle'
    },
    smallIconStyle:{
      color: palette.primary2Color,
      width:18,
      height:18
    },
    spanMiddlePre:{
      height: '100%',
      display: 'inline-block',  
      verticalAlign: 'middle'
    },
    spanMiddle:{
      display: 'inline-block',  
      verticalAlign: 'middle'
    }
  };

  const headerCol = {
      color: palette.accent3Color,
      padding: '1.5rem 0.5rem',
      fontSize: 14
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
        name: '随时随地，简单便捷，给您移动办公最佳体验随时随地，简单便捷，给您移动办公最佳体验随时随地，简单便捷，给您移动办公最佳体验',
        descr: (i!==0)? null:'伊拉克苏马里亚电视台网站当天报道，“伊斯兰国”媒体发布简短声明，称巴格达迪已经死亡，这一组织将产生新的最高头目。声明没有给出巴格达迪死亡细节',
        summary: '1.3G' 
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

    let rows = rowData.map((data)=>{
      return (<RepoListRow key={`row-${data.id}`} rowData={data} onRowSelect = {this.onRowSelect} styles={ styles }/>);
    });
    
    let selectAllIcon = <CheckboxOutline/>;
    //console.log(`rowlen: ${rowData.length} / sellen: ${selectData.length}`);
    if( rowData.length !== selectData.length && selectData.length > 0 ){
      selectAllIcon = <IndeterminateCheckbox/>;
    }else if(rowData.length === selectData.length && selectData.length > 0){
      selectAllIcon = <CheckboxChecked/>;
    }
    
    return (
      <div style={{flex:1, overflow:'hidden'}}>
        <div style={{display:'flex',borderBottom: '1px solid rgb(224, 224, 224)'}}>
          <div style={ styles.colCheck }>
            <IconButton 
              style={styles.iconBtn} 
              iconStyle={ styles.iconStyle } 
              onTouchTap={ this.onAllSelect }>
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
          <div style={ styles.colActionHeader }>Classification</div>
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
      <AVFiberRecord style={{
        position:'absolute', 
        top:2, 
        left:2,
        width:14,
        height:14,
        color:'red'}}/>
      <div style={ styles.colCheck }>
        <IconButton iconStyle={ styles.iconStyle } onTouchTap={handleRowSelect} 
        style={styles.iconBtn} >
          { rowData.select ? <CheckboxChecked/>:<CheckboxOutline/>}
        </IconButton>
      </div>
      <div style={ styles.colName }>
        <a style={{ textDecoration: 'none', 
            display: 'block',
            padding: (rowData.descr) ? '0.5rem 0 0' : '1.4rem 0 ',
            overflow: 'hidden',
            whiteSpace: 'nowrap', 
            cursor: 'pointer',
            color:'rgb(0, 151, 167)',
            textOverflow: 'ellipsis'}} >
            <FileFolder style={styles.rowIconStyle}/> <span>  {rowData.id} - {rowData.name}</span>
        </a>
        { (rowData.descr) ? 
        <div style={ { fontSize: 14, fontWeight: 300, color: '#919191', padding:'0 0 0.5rem',wordBreak: 'break-all', wordWrap: 'break-word', lineHeight: 1.4, whiteSpace: 'normal', paddingRight: 5 } }>
          <span>{rowData.descr}</span>
        </div> : null}
      </div>
      <div style={ styles.colAuthor }>
        <span style={ styles.spanMiddlePre } ></span>
        <span style={ styles.spanMiddle }>
          <Avatar src="assets/img/kerem-128.jpg" size={25} style={{ verticalAlign:'middle'}} />
        </span>
      </div>
      <div style={styles.colSum}>
        <span style={ styles.spanMiddlePre } ></span>
        <span style={ styles.spanMiddle }>
          { rowData.summary }
        </span>
      </div>
      <div style={styles.colAction}>
        <span style={ styles.spanMiddlePre } ></span>
        <span style={ styles.spanMiddle }>
          <ToggleStar style={styles.smallIconStyle}/>
          <ToggleStar style={styles.smallIconStyle}/>
          <ToggleStarBorder style={styles.smallIconStyle}/>
          <ToggleStarBorder style={styles.smallIconStyle}/>
        </span>
      </div>
    </li>
  );
};

export default WGroupRepoList;