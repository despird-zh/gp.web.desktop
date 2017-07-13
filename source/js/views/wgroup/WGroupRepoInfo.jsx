import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Chip from '../mui-ext/Chip';

function getStyles(muiTheme) {
  const { baseTheme:{palette, spacing} } = muiTheme;

  return {
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

class WGroupRepoInfo extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {};
    this.styles = getStyles(props.muiTheme);
  }

  render() {
    const { muiTheme } = this.props;
    const styles = this.styles;

    const { openRepoTree, showMoreFilter, selectedRows, rows } = this.state;

    const filterStyle = showMoreFilter ? styles.topbar : Object.assign({}, styles.topbar, {display: 'none'});

    const hasSelected = selectedRows && selectedRows.length > 0;

    return (
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
    );
  }
}

export default WGroupRepoInfo;