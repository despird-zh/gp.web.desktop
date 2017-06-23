import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
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
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {List, ListItem} from 'material-ui/List';
import Chip from 'material-ui/Chip';

import AuthConnect from '../component/AuthConnect';

function getStyles(muiTheme) {
  const { baseTheme:{ palette } } = muiTheme;
  console.log(palette)
  return {
    root: {
      display: 'flex',
      position: 'relative',
      marginTop: 10,
    },
    title:{
      textDecoration: 'none',
      color: palette.textColor,
    },
    leftPanel: {
      flex: 1,
      paddingRight: 10,
    },
    rightPanel: {
      paddingLeft: 10,
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 300,
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
    timeStamp: {
      color: palette.accent3Color,
      marginRight: 10,
      float: 'right',
      fontSize: 12
    },
    post: {
      borderBottomColor: palette.borderColor,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
    },
    answer:{
      paddingTop: 10,
      borderBottomColor: palette.borderColor,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
    },
    sumTitle:{
      color: palette.accent3Color,
      display: 'block',
      fontSize: 12
    },
    comments: {
      position: 'relative'
    }, 
    comment: {
      display: 'flex', 
      padding: 10,
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

class WGroupTopicPage extends React.Component {

  constructor(props) {
    super(props);
    this.styles = getStyles(props.muiTheme);
  }

  componentWillMount() {
    if (this.props.setCurrentPage) { this.props.setCurrentPage('topic'); }
  }

  componentDidMount() {
    const styles = this.styles;
    const buttons = [
      <IconButton key="bookmark" iconStyle={ styles.iconBtn } onTouchTap={ this.test }>
        <ActBookmark />
      </IconButton>,
      <IconButton key="track" iconStyle={ styles.iconBtn } onTouchTap={ this.test }>
        <ActTrackChng />
      </IconButton>,
      <IconButton key="visibility" iconStyle={ styles.iconBtn } onTouchTap={ this.test }>
        <ActVisibility />
      </IconButton>,
      <IconButton key="flag" iconStyle={ styles.iconBtn } onTouchTap={ this.test }>
        <ContentFlag />
      </IconButton>,
      <IconButton key="share" iconStyle={ styles.iconBtn } onTouchTap={ this.test }>
        <SocialShare />
      </IconButton>
      ];
    const title = <a href='dhh' style={ this.styles.title }>Java regex to extract text sequences across multiple lines</a>;
    if (this.props.setCurrentPage) {
      this.props.setCurrentPage('topic', { title, buttons });
    }
  }

  test() {
    console.log('asdf');
  }
  render() {
    const styles = this.styles;

    return (
      <div style={ styles.root }>
        <div style={ styles.leftPanel }>
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
                <div>
                  <p>Hey guys!</p>

                  <p>If you use vanilla redux in your app and ever got tired writing structures like</p>

                  <p>I understand there are things like React's Immutability Helpers and <code>immutable-js</code>, but if you don't want to have additional data abstraction layer and just want simple helpers with, basically, no special API, <code>update-js</code> might serve you well.</p>

                  <p>Any comments and feedback are very welcome.</p>

                  <p>Thanks and happy coding!</p>
                </div>
                
                <div style={ styles.comments }>
                  <div style={{ position:'absolute', right: 10, top:-45, width:40}}>
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
          <div style={{ padding:'0 5px', display:'flex' }}>
            <h4 style={{ flex:1, paddingTop: 10, paddingBottom:10 }} >Answer (8) </h4>
            <div>
              <IconButton tooltip="Sort By Activity" style={ styles.answerSortBtn } iconStyle={ styles.answerSortBtnIcon }>
                <EditBubbleChrt/>
              </IconButton>
              <IconButton tooltip="Sort By votes" disabled={true} style={ styles.answerSortBtn } iconStyle={ styles.answerSortBtnIcon }>
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
                <IconButton iconStyle={ styles.iconBtn }><ActDone/></IconButton>
              </div>
              <div style={{ flex: 1 }}>
                <div>
                  <a href="/sf" style={ styles.account }>
                    <span style={{ fontWeight: 600}}>akuzko</span> Artme Kuzko
                  </a> 
                  <span style={ styles.timeStamp }>6days</span>
                </div>
                <div>
                  <p>Hey guys!</p>

                  <p>If you use vanilla redux in your app and ever got tired writing structures like</p>

                  <p>I understand there are things like React's Immutability Helpers and <code>immutable-js</code>, but if you don't want to have additional data abstraction layer and just want simple helpers with, basically, no special API, <code>update-js</code> might serve you well.</p>

                  <p>Any comments and feedback are very welcome.</p>

                  <p>Thanks and happy coding!</p>
                </div>
                
                <div style={ styles.comments }>
                  <div style={{ position:'absolute', right: 10, top:-45, width:90}}>
                    <IconButton style={ styles.answerSortBtn } iconStyle={ styles.answerSortBtnIcon }>
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
                <div>
                  <p>Hey guys!</p>

                  <p>If you use vanilla redux in your app and ever got tired writing structures like</p>

                  <p>I understand there are things like React's Immutability Helpers and <code>immutable-js</code>, but if you don't want to have additional data abstraction layer and just want simple helpers with, basically, no special API, <code>update-js</code> might serve you well.</p>

                  <p>Any comments and feedback are very welcome.</p>

                  <p>Thanks and happy coding!</p>
                </div>
                
                <div style={ styles.comments }>
                  <div style={{ position:'absolute', right: 10, top:-45, width:40}}>
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
        <div style={ styles.rightPanel }>
          <div style={{display: 'flex'}}>

            <div style={{flex:1, textAlign:'center'}}>
              <h4 style={ styles.sumTitle }>views</h4>
              <span style={ { marginRight: 5, verticalAligh:'middle'}}>12K</span>
            </div>
            <div style={{flex:1, textAlign:'center'}}>
              <h4 style={ styles.sumTitle }>replies</h4>
              <span style={ { marginRight: 5, verticalAligh:'middle'}}>12K</span>
            </div>
            <div style={{flex:1, textAlign:'center'}}>
              <h4 style={ styles.sumTitle }>users</h4>
              <span style={ { marginRight: 5, verticalAligh:'middle'}}>12</span>
            </div>
            <div style={{flex:1, textAlign:'center'}}>
              <h4 style={ styles.sumTitle }>comments</h4>
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
              <h4 style={ styles.sumTitle }>active</h4>
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
            <h4 style={{paddingTop: 10}}>Hotest topics</h4>
            <ul style={{display:'block', paddingLeft: 0, marginTop:10}}>
              <li style={{listStyleType:'none', display:'flex', marginLeft:0, marginBottom: 0}}>
                <div style={{display: 'inline-block', flexBasis:32, width: 32, marginRight: 5, marginTop:5}}>
                  <Avatar src={ `assets/img/kerem-128.jpg` } size={ 30 } /> 
                </div>
                <a href='/f' style={{display:'inline-block', textDecoration: 'none', flex:1, whiteSpace:'normal'}}>fine and expected until the data source is modified in someway (rows are removed, for example)</a>
              </li>
              <li style={{listStyleType:'none', display:'flex', marginLeft:0, marginBottom: 10}}>
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
  }
}

WGroupTopicPage.propTypes = {
  setCurrentPage: PropTypes.func,
  muiTheme: PropTypes.object,
};

const NewComponent = AuthConnect(
  WGroupTopicPage,
  (state) => ({
    wgrouplist: state.wgroup.get('wgrouplist'),
  }),
  { });

export default NewComponent;
