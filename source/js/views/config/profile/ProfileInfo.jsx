import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';

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
    iconStyle:{
      color: palette.primary1Color,
      marginTop:0
    },
    iconBtn:{
      width:30, 
      height:30, 
      padding:0, 
      marginRight: '1rem'
    },
    iconAddBtn:{
      width:30, 
      height:30, 
      padding:0, 
      marginRight: '1rem',
      borderRadius:'50%',
      borderWidth:1,
      borderStyle:'dashed',
      borderColor:palette.primary1Color
    },
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

  render() {

    const { muiTheme, collapsed } = this.props;
    const styles = getStyles(muiTheme, collapsed);

    const { openRepoTree, showMoreFilter, selectedRows, rows } = this.state;

    const filterStyle = showMoreFilter ? styles.topbar : Object.assign({}, styles.topbar, {display: 'none'});

    const hasSelected = selectedRows && selectedRows.length > 0;
    const bodyStyle = Object.assign(styles.menuBody, {padding: collapsed ? '2rem 1rem 7.5rem':'2rem 1.5rem 7.5rem'});
    return (
      <div className="menu-body" style={bodyStyle}>
        <div style={{display: 'block', marginBottom:'1rem'}} className="clearfix">
          <div style={ styles.sumInfo }>
            <h4 style={ styles.sumTitle }>Mbrs</h4>
            <span style={ styles.sumText }>200</span>
          </div>
          <div style={styles.sumInfo}>
            <h4 style={ styles.sumTitle }>Grps</h4>
            <span style={styles.sumText}>300</span>
          </div>
          <div style={styles.sumInfo}>
            <h4 style={ styles.sumTitle }>Tpcs</h4>
            <span style={styles.sumText}>12K</span>
          </div>
          <div style={styles.sumInfo}>
            <h4 style={ styles.sumTitle }>Files</h4>
            <span style={styles.sumText}>123K</span>
          </div>
          <div style={styles.sumInfo}>
            <h4 style={ styles.sumTitle }>Ptns</h4>
            <span style={styles.sumText}>12K</span>
          </div>
          <div style={styles.sumInfo}>
            <h4 style={ styles.sumTitle }>Exps</h4>
            <span style={styles.sumText}>23</span>
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
        <div style={{display: collapsed? 'none':'', flex: '1'}}>
          <h3 style={{
            paddingTop: 10, 
            color:'rgb(158, 158, 158)',
            textRendering: 'optimizeLegibility',
            fontSize: '1.5rem',
            fontWeight: 400,
            lineHeight: '3rem',
            textTransform: 'uppercase'}}>Attendees</h3>
          <div style={ { paddingTop: '0.5rem', paddingBottom: 10 } }>
            <IconButton style={styles.iconBtn}>
              <Avatar src='assets/img/uxceo-128.jpg' size={ 30 } style={ { marginRight: 5 } } />
            </IconButton>
            <IconButton style={styles.iconBtn}>
              <Avatar src='assets/img/ok-128.jpg' size={ 30 } style={ { marginRight: 5 } } />
            </IconButton>
            <IconButton style={styles.iconBtn}>
              <Avatar src='assets/img/kolage-128.jpg' size={ 30 } style={ { marginRight: 5 } } />
            </IconButton>
            <IconButton style={styles.iconBtn}>
              <Avatar src='assets/img/jsa-128.jpg' size={ 30 } style={ { marginRight: 5 } } />
            </IconButton>
            <IconButton style={styles.iconBtn}>
              <Avatar src='assets/img/kerem-128.jpg' size={ 30 } style={ { marginRight: 5 } } />
            </IconButton>
            <IconButton 
              style={styles.iconAddBtn} 
              iconStyle={styles.iconStyle}>
              <ContentAdd/>
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileInfo;