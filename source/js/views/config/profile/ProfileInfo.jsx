import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import { Scrollbars } from 'react-custom-scrollbars';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

import Chip from '../../mui-ext/Chip';

function getStyles(muiTheme, collapsed) {
  const { baseTheme:{palette, spacing} } = muiTheme;

  return {
    sumTitle:{
      color: palette.accent3Color,
      display: 'block',
      fontSize: '1.3rem',
      fontWeight: 400,
      textTransform: 'uppercase'
    },
    sumInfo:{
      float:'left', 
      minWidth:(collapsed)? '5rem':'25%', 
      textAlign:'center',
      paddingBottom:5
    },
    sumText:{
      display:'block',
      verticalAligh:'middle'
    },
    rowHeader:{
      paddingTop: 10, 
      color:'rgb(158, 158, 158)',
      textRendering: 'optimizeLegibility',
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: '3rem',
      textTransform: 'uppercase'},
    menuBody:{
      display: 'flex',
      flexDirection: 'column'
    }
  };
}

class ProfileInfo extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  createRows (){
    const rows =[];
    for(let i = 0; i<20; i++)
    {
      rows.push(
        <li style={{height:40, paddingRight:10, display:'flex', marginLeft:0, marginBottom: '1rem'}} key={'tem'+i}>
          <div style={{display: 'block', flexBasis:32, width: 32, marginRight: 5, marginTop:5}}>
            <Avatar src={ `assets/img/kerem-128.jpg` } size={ 30 } /> 
          </div>
          <div style={{display: 'block'}}>
            <a href='/f' style={{display:'inline-block', textDecoration: 'none', flex:1, whiteSpace:'normal'}}>
              index:{i} fine and expected until the data source is modified in someway (rows are removed, for example)
            </a>
          </div>
        </li>
      );
    }

    return rows;
  }
  render() {
    let { muiTheme, collapsed, summary } = this.props;
    const styles = getStyles(muiTheme, collapsed);
    const rows = this.createRows();
    summary = (summary === undefined || summary === null) ? {}: summary;
    const bodyStyle = Object.assign(styles.menuBody, {padding: collapsed ? '2rem 1rem 7.5rem':'2rem 1.5rem 7.5rem'});
    return (
      <div className="menu-body" style={bodyStyle}>
        <div style={{display: 'block', marginBottom:'1rem'}} className="clearfix">
          <div style={ styles.sumInfo }>
            <h4 style={ styles.sumTitle }>Mbrs</h4>
            <span style={ styles.sumText }>{summary.members}</span>
          </div>
          <div style={styles.sumInfo}>
            <h4 style={ styles.sumTitle }>Grps</h4>
            <span style={styles.sumText}>{summary.groups}</span>
          </div>
          <div style={styles.sumInfo}>
            <h4 style={ styles.sumTitle }>Tpcs</h4>
            <span style={styles.sumText}>{summary.topics}</span>
          </div>
          <div style={styles.sumInfo}>
            <h4 style={ styles.sumTitle }>Files</h4>
            <span style={styles.sumText}>{summary.files}</span>
          </div>
          <div style={styles.sumInfo}>
            <h4 style={ styles.sumTitle }>Ptns</h4>
            <span style={styles.sumText}>{summary.points}</span>
          </div>
          <div style={styles.sumInfo}>
            <h4 style={ styles.sumTitle }>Exps</h4>
            <span style={styles.sumText}>{summary.experts}</span>
          </div>
        </div>
        <Divider style={{display: collapsed? 'none':''}}/>
        <div style={{padding:'10px 0',display: collapsed? 'none':''}}>
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
        <Divider style={{display: collapsed? 'none':''}}/>
        <div style={{display: collapsed? 'none':'', flex: '1', position:'relative'}}>
          <h3 style={styles.rowHeader}>Attendees</h3>
          <Scrollbars style={{ height: 'calc( 100% - 2.5rem)'}}
          autoHide={true}
          autoHideTimeout={1000}
          autoHideDuration={200}>
          <ul style={{margin:0, padding:0}}>
            {rows}
          </ul>
         </Scrollbars>
        </div>
      </div>
    );
  }
}

export default ProfileInfo;