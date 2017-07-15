import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import AVStop from 'material-ui/svg-icons/av/stop';

function getStyles(muiTheme) {
  const { baseTheme:{ palette } } = muiTheme;
  const styles = {
    rowStyle:{
      paddingLeft:0, 
      display:'flex', 
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: palette.borderColor,
    },
    colTitle: {
      padding: '0.5rem',
      flexShrink:1, 
      flexGrow:1, 
      width: 100,
    },
    colCate: {
      flexShrink:0, 
      flexGrow:0, 
      width: 100,
      padding: '0.5rem',
      fontSize: 16
    },
    colUser:{
      flexShrink:0, 
      flexGrow:0, 
      width: 160,
      padding:  '0.5rem',
      verticalAlign: 'middle'
    },
    colNum:{
      flexShrink:0, 
      flexGrow:0, 
      padding: '0.5rem',
      width: 60, 
      textAlign: 'center' 
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
      padding: '1.5rem 1rem',
      fontSize: 14
    };

  styles.colTitleHeader = Object.assign({}, styles.colTitle, headerCol);
  styles.colCateHeader = Object.assign({}, styles.colCate, headerCol);
  styles.colUserHeader = Object.assign({}, styles.colUser, headerCol);
  styles.colNumHeader = Object.assign({}, styles.colNum, headerCol);

  return styles;
}

function getFakeData(cnt){
  let data = [];
  for(let i = cnt; i<10 + cnt; i++){
      data.push({
        id: `id-${i}`,
        title: '随时随地，简单便捷，给您移动办公最佳体验,随时随地，简单便捷，给您移动办公最佳体验,随时随地，简单便捷，给您移动办公最佳体验,随时随地，简单便捷，给您移动办公最佳体验.',
        descr: (i !== 0) ? null:'伊拉克苏马里亚电视台网站当天报道，“伊斯兰国”媒体发布简短声明，称巴格达迪已经死亡，这一组织将产生新的最高头目。声明没有给出巴格达迪死亡细节',
        category: 'Develop',
        replies: 34,
        views: 23,
        activities: 21 
      });
    }
  return data;
}

class WGroupTopicsList extends Component {

  constructor(props){
    super(props);
    let data = getFakeData(0);
    this.state = {
      rowData : data,
      hasMore: true,
      isLoading: false,
    };
    this.styles = getStyles(props.muiTheme);
  }

  handleLoadMore = () => {

    let currIdx = this.state.rowData.length;
    let data = getFakeData(currIdx);
    if(currIdx >= 70) {
      this.setState({hasMore: false, isLoading: false});
      return;
    }

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

  render() {
    const { rowData } = this.state;
    const styles = this.styles;

    let rows = rowData.map((data)=>{
      return (<TopicsListRow key={`row-${data.id}`} rowData={data} styles={ styles }/>);
    });

    return (
      <div style={{flex:1, overflow:'hidden'}}>
        <div style={{display:'flex',borderBottom: '1px solid rgb(224, 224, 224)'}}>
          <div style={ styles.colTitleHeader }>
            Topic
          </div>
          <div style={ styles.colCateHeader }>
            Category
          </div>
          <div style={ styles.colUserHeader }>
            Users
          </div>
          <div style={ styles.colNumHeader}>
            Rep.
          </div>
          <div style={ styles.colNumHeader }>
            Vw.
          </div>
          <div style={ styles.colNumHeader }>
            Act.
          </div>
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
  }
}

const users = ['jsa-128.jpg', 'kerem-128.jpg', 'kolage-128.jpg', 'ok-128.jpg', 'uxceo-128.jpg'];

const TopicsListRow = ({ rowData, styles }) => {
  const usersEl = users.map((item, index) => {
      return (
        <a key={index} href='' style={ { display: 'block', float: 'left', height: 25 } }><Avatar src={ `assets/img/${ item }` } size={ 25 } style={ { marginRight: 5 } } /></a>
      );
    });

  return (
    <li style={ styles.rowStyle }>
      <div style={ styles.colTitle }>
        <a style={{ textDecoration: 'none', 
            display: 'block',
            padding: (rowData.descr) ? '0.5rem 0 0' : '0.9rem 0',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            color:'rgb(0, 151, 167)',
            textOverflow: 'ellipsis'}} >
            <span>{rowData.id} - {rowData.title}</span>
          </a>
        { (rowData.descr) ? 
        <div style={ { fontSize: 14, fontWeight: 300, color: '#919191', padding:'0 0 0.5rem',wordBreak: 'break-all', wordWrap: 'break-word', lineHeight: 1.4, whiteSpace: 'normal', paddingRight: 5 } }>
          <span>{rowData.descr}</span>
        </div> : null}
      </div>
      <div style={ styles.colCate }>
        <span style={ styles.spanMiddlePre } ></span>
        <span style={ styles.spanMiddle }>
          <AVStop style={ { width: 16, height: 16, color: 'red', display: 'inline-block', verticalAlign:'middle', marginTop: -2, marginRight: 5 } } />
          { rowData.category }
        </span>
      </div>
      <div style={ styles.colUser }>
        <span style={ styles.spanMiddlePre } ></span>
        <span style={ styles.spanMiddle }>
          { usersEl }
        </span>
      </div>
      <div style={styles.colNum}>
        <span style={ styles.spanMiddlePre } ></span>
        <span style={ styles.spanMiddle }>
          { rowData.replies }
        </span>
      </div>
      <div style={styles.colNum}>
        <span style={ styles.spanMiddlePre } ></span>
        <span style={ styles.spanMiddle }>
          { rowData.views }
        </span>
      </div>
      <div style={styles.colNum}>
        <span style={ styles.spanMiddlePre } ></span>
        <span style={ styles.spanMiddle }>
          { rowData.activities }
        </span>
      </div>
    </li>
  );
};

export default WGroupTopicsList;