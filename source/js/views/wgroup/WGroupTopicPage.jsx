import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Avatar from 'material-ui/Avatar';
import CommClearAll from 'material-ui/svg-icons/communication/clear-all';
import ActGavel from 'material-ui/svg-icons/action/gavel';
import ActDone from 'material-ui/svg-icons/action/done';
import NviArrowDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import NviArrowUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import ActThumbsUpDown from 'material-ui/svg-icons/action/thumbs-up-down';
import ActBookmark from 'material-ui/svg-icons/action/bookmark';
import ActTrackChng from 'material-ui/svg-icons/action/track-changes';
import ActVisibility from 'material-ui/svg-icons/action/visibility';
import ContentFlag from 'material-ui/svg-icons/content/flag';
import SocialShare from 'material-ui/svg-icons/social/share';
import TglStar from 'material-ui/svg-icons/toggle/star';
import TglStarBorder from 'material-ui/svg-icons/toggle/star-border';
import ImageLens from 'material-ui/svg-icons/image/lens';
import AVStop from 'material-ui/svg-icons/av/stop';
import EditBubbleChrt from 'material-ui/svg-icons/editor/bubble-chart';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavFirstPage from 'material-ui/svg-icons/navigation/first-page';
import NavLastPage from 'material-ui/svg-icons/navigation/last-page';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';

import { snackAction, loaderAction } from '../../store/actions/appActions';
import PageHeaderBar from '../component/PageHeaderBar';

function getStyles(muiTheme) {
  const { baseTheme:{ palette } } = muiTheme;

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
    title:{
      textDecoration: 'none',
      color: palette.textColor,
    },
    iconBtn: {
      color: palette.primary2Color,
    },
    thumbInfo: {
      color: palette.secondaryTextColor,
      textAlign: 'center',
      fontWeight: 600,
    },
    answerSortBtn:{padding:12, width:44, height:44},
    answerSortBtnIcon:{ width:20, height:20 ,color: palette.primary2Color},
    answerSortBtnIcon16:{ width:16, height:16 ,color: palette.primary2Color},
    timeStamp: {
      color: palette.accent3Color,
      marginRight: '1rem',
      float: 'right',
      fontSize: '1.2rem'
    },
    post: {
      borderBottomColor: palette.borderColor,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      paddingTop: '1rem'
    },
    answer:{
      paddingTop: '1rem',
      borderBottomColor: palette.borderColor,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
    },
    sumTitle:{
      color: palette.accent3Color,
      display: 'block',
      fontSize: '1.3rem',
      fontWeight: 400,
      marginBottom: '0.5rem',
      textTransform: 'uppercase'
    },
    comments: {
      position: 'relative'
    }, 
    comment: {
      display: 'flex', 
      padding: '1rem 0',
      borderTopColor: palette.borderColor,
      borderTopWidth: 1,
      borderTopStyle: 'solid',
    },
    account: {
      textDecoration: 'none' ,
      marginRight: 5
    }
  };
}

class WGroupTopicPage extends Component {

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
    this.props.resetRootMenu({menuPaneVisible:true, menuPane: (<RootMenuContent test1={this.onTest1} styles={this.styles}/>) });
  }

  render() {
    const { muiTheme } = this.props;
    const styles = this.styles;
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
            </div>
          </div>
          <div className="page-content" style={{overflowY:'auto', padding:'1.5rem'}}>
          <div style={ styles.post }>
            <div style={{ display: 'flex' }}>
              <div style={{ flexBasis: 60, display: 'flex', flexDirection:'column', paddingLeft: 10, paddingRight:10}}>
                <Avatar src="assets/img/kerem-128.jpg" size={40} style={{ marginLeft:5}} />
                <IconButton iconStyle={ styles.iconBtn }><NviArrowUp/></IconButton>
                <div style={ styles.thumbInfo }>
                  1023
                </div>
                <IconButton iconStyle={ styles.iconBtn }><NviArrowDown/></IconButton>
                <IconButton iconStyle={ styles.iconBtn }><TglStarBorder/></IconButton>
              </div>
              <div style={{ flex: 1 }}>
                <div>
                  <a href="/sf" style={ styles.account }>
                    <span style={{ fontWeight: 600}}>akuzko</span> Artme Kuzko
                  </a> 
                  <span style={ { display: 'inline-block', height: 18} }>
                    <AVStop style={ { width: 16, height: 16, color: 'red', float: 'left', marginTop: 4, marginRight: 3 } } />
                     Develop
                  </span>
                  <span style={ styles.timeStamp }>6days</span>
                </div>
                <div className="post-content">
                  <p>Hey guys!</p>
                  <p>If you use vanilla redux in your app and ever got tired writing structures like</p>
                  <p>I understand there are things like React's Immutability Helpers and <code>immutable-js</code>, but if you don't want to have additional data abstraction layer and just want simple helpers with, basically, no special API, <code>update-js</code> might serve you well.</p>
                  <p>Any comments and feedback are very welcome.</p>
                  <p>Thanks and happy coding!</p>
                </div>
                <div style={ styles.comments }>
                  <div style={{ position:'absolute', right: 0, top:-45, width:40}}>
                    <IconButton style={ styles.answerSortBtn } iconStyle={ styles.answerSortBtnIcon }>
                      <ContentAdd/>
                    </IconButton>
                  </div>
                  <div style={ styles.comment }>
                    <div style={{ flexBasis: 50, height: 30}}>
                      <Avatar src="assets/img/kerem-128.jpg" size={30} style={{ marginLeft: 5 }} />
                    </div>
                    <div style={{ flex:1,verticalAligh: 'top', fontSize: 14, lineHeight: 1.4 }}>
                     <span >Does it mean you need to get multiple matches of the 
                     non-whitespace chunks that have some horizontal whitespaces on the 
                     subsequent lines after <code>Main :</code>?</span>
                     <a href="sf" style={ styles.account }>auset</a><span style={ styles.timeStamp }>Dec 20 16 at 23:58</span>
                    </div>
                  </div>
                  <div style={ styles.comment }>
                    <div style={{ flexBasis: 50, height: 30}}>
                      <Avatar src="assets/img/kerem-128.jpg" size={30} style={{ marginLeft: 5 }} />
                    </div>
                    <div style={{ flex:1, verticalAligh: 'top', textAlign: 'left', fontSize: 14, lineHeight: 1.4 }}>
                     <span >Does it mean you need to get multiple matches ?</span>
                     <a href="sf" style={ styles.account }>auset</a><span style={ styles.timeStamp }>Dec 20 16 at 23:58</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ padding:'0 0.5rem', position:'relative' }}>
            <h4 style={{ padding: '1rem 0 0.5rem', lineHeight: '2.5rem' }} >Answer (8) </h4>
            <div style={{ position:'absolute', right:0, top:'0' }}>
              <IconButton tooltip="Sort By Activity" style={ styles.answerSortBtn } iconStyle={ styles.answerSortBtnIcon }>
                <EditBubbleChrt/>
              </IconButton>
              <IconButton tooltip="Sort By votes" style={ styles.answerSortBtn } iconStyle={ styles.answerSortBtnIcon16 }>
                <ActThumbsUpDown/>
              </IconButton>
            </div>
          </div>
          <div style={ styles.answer }>
            <div style={{ display: 'flex' }}>
              <div style={{ flexBasis: 60, display: 'flex', flexDirection:'column', paddingLeft: 10, paddingRight:10}}>
                <Avatar src="assets/img/kerem-128.jpg" size={40} style={{ marginLeft:5}}  />
                <IconButton iconStyle={ styles.iconBtn }><NviArrowUp/></IconButton>
                <div style={ styles.thumbInfo }>
                  23
                </div>
                <IconButton iconStyle={ styles.iconBtn }><NviArrowDown/></IconButton>
                <IconButton style={{width:32, height:32, padding:5}} iconStyle={{ color:'blue' }}><ActDone/></IconButton>
              </div>
              <div style={{ flex: 1 }}>
                <div>
                  <a href="/sf" style={ styles.account }>
                    <span style={{ fontWeight: 600}}>akuzko</span> Artme Kuzko
                  </a> 
                  <span style={ styles.timeStamp }>6days</span>
                </div>
                <div className="answer-content">
                  <p>Hey guys!</p>
                  <p>If you use vanilla redux in your app and ever got tired writing structures like</p>
                  <p>I understand there are things like React's Immutability Helpers and <code>immutable-js</code>, but if you don't want to have additional data abstraction layer and just want simple helpers with, basically, no special API, <code>update-js</code> might serve you well.</p>
                  <p>Any comments and feedback are very welcome.</p>
                  <p>Thanks and happy coding!</p>
                </div>
                <div style={ styles.comments }>
                  <div style={{ position:'absolute', right: 0, top:-45, width:90}}>
                    <IconButton style={ styles.answerSortBtn } iconStyle={ styles.answerSortBtnIcon16 }>
                      <ActGavel/>
                    </IconButton>
                    <IconButton style={ styles.answerSortBtn } iconStyle={ styles.answerSortBtnIcon }>
                      <ContentAdd/>
                    </IconButton>
                  </div>
                  <div style={ styles.comment }>
                    <div style={{ flexBasis: 50, height: 30}}>
                      <Avatar src="assets/img/kerem-128.jpg" size={30} style={{ marginLeft: 5 }} />
                    </div>
                    <div style={{ flex:1,verticalAligh: 'top', fontSize: 14, lineHeight: 1.4 }}>
                     <span >Does it mean you need to get multiple matches of the 
                     non-whitespace chunks that have some horizontal whitespaces on the 
                     subsequent lines after <code>Main :</code>?</span>
                     <a href="sf" style={ styles.account }>auset</a><span style={ styles.timeStamp }>Dec 20 16 at 23:58</span>
                    </div>
                  </div>
                  <div style={ styles.comment }>
                    <div style={{ flexBasis: 50, height: 30}}>
                      <Avatar src="assets/img/kerem-128.jpg" size={30} style={{ marginLeft: 5 }} />
                    </div>
                    <div style={{ flex:1, verticalAligh: 'top', textAlign: 'left', fontSize: 14, lineHeight: 1.4 }}>
                     <span >Does it mean you need to get multiple matches ?</span>
                     <a href="sf" style={ styles.account }>auset</a><span style={ styles.timeStamp }>Dec 20 16 at 23:58</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={ styles.answer }>
            <div style={{ display: 'flex' }}>
              <div style={{ flexBasis: 60, display: 'flex', flexDirection:'column', paddingLeft: 10, paddingRight:10}}>
                <Avatar src="assets/img/kerem-128.jpg" size={40} style={{ marginLeft:5}}  />
                <IconButton iconStyle={ styles.iconBtn }><NviArrowUp/></IconButton>
                <div style={ styles.thumbInfo }>
                  13
                </div>
                <IconButton iconStyle={ styles.iconBtn }><NviArrowDown/></IconButton>
              </div>
              <div style={{ flex: 1 }}>
                <div>
                  <a href="/sf" style={ styles.account }>
                    <span style={{ fontWeight: 600}}>akuzko</span> Artme Kuzko
                  </a> 
                  <span style={ styles.timeStamp }>6days</span>
                </div>
                <div className="post-content">
                  <p>Hey guys!</p>
                  <p>If you use vanilla redux in your app and ever got tired writing structures like</p>
                  <p>I understand there are things like React's Immutability Helpers and <code>immutable-js</code>, but if you don't want to have additional data abstraction layer and just want simple helpers with, basically, no special API, <code>update-js</code> might serve you well.</p>
                  <p>Any comments and feedback are very welcome.</p>
                  <p>Thanks and happy coding!</p>
                </div>
                
                <div style={ styles.comments }>
                  <div style={{ position:'absolute', right: 0, top:-45, width:40}}>
                    <IconButton style={ styles.answerSortBtn } iconStyle={ styles.answerSortBtnIcon }>
                      <ContentAdd/>
                    </IconButton>
                  </div>
                  <div style={ styles.comment }>
                    <div style={{ flexBasis: 50, height: 30}}>
                      <Avatar src="assets/img/kerem-128.jpg" size={30} style={{ marginLeft: 5 }} />
                    </div>
                    <div style={{ flex:1,verticalAligh: 'top', fontSize: 14, lineHeight: 1.4 }}>
                     <span >Does it mean you need to get multiple matches of the 
                     non-whitespace chunks that have some horizontal whitespaces on the 
                     subsequent lines after <code>Main :</code>?</span>
                     <a href="sf" style={ styles.account }>auset</a><span style={ styles.timeStamp }>Dec 20 16 at 23:58</span>
                    </div>
                  </div>
                  <div style={ styles.comment }>
                    <div style={{ flexBasis: 50, height: 30}}>
                      <Avatar src="assets/img/kerem-128.jpg" size={30} style={{ marginLeft: 5 }} />
                    </div>
                    <div style={{ flex:1, verticalAligh: 'top', textAlign: 'left', fontSize: 14, lineHeight: 1.4 }}>
                     <span >Does it mean you need to get multiple matches ?</span>
                     <a href="sf" style={ styles.account }>auset</a><span style={ styles.timeStamp }>Dec 20 16 at 23:58</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

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
)(WGroupTopicPage);
