import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';

import AuthConnect from '../component/AuthConnect';
import HtmlEditor from '../component/TextEditor/HtmlEditor';
import WGroupProfileLite from './WGroupProfileLite';
import PageStyle from './WGroupBulletinPage.scss';

function getStyles(muiTheme) {
  const { baseTheme } = muiTheme;
  console.log(baseTheme.palette)
  return {
    root: {
      display: 'flex',
      position: 'relative',
      marginTop: 10,
    },
    leftPanel: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      paddingRight: 10,
      
    },
    rightPanel: {
      paddingLeft: 10,
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 300,
    },
    chatList: {
      width:'100%',
      listStyle: 'none',
      background: 'none',
      margin: 0,
      padding: 0,
    },
    chatRow: {
      padding: 0,
      margin:0,
      overflow: 'hidden',
      display: 'flex',
      fontWeight: 500,
    },
    chatMsg: {
      flex:1,
      display: 'block',
      position: 'relative',
      paddingBottom: 5,
    },
    chatOther: {
      display: 'block',
      float: 'right',
      padding: 10,
      marginRight: 15,
      minWidth: 100,
      borderTop: 'thick solid rgba(0, 0, 0, 0.05)',
      borderTopWidth: 1,
      position: 'relative',
      fontSize: 14,
      borderRadius: 3,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
    },
    chatSelf: {
      display: 'block',
      float: 'left',
      padding: 10,
      marginLeft: 15,
      minWidth: 100,
      borderTop: 'thick solid rgba(0, 0, 0, 0.05)',
      borderTopWidth: 1,
      position: 'relative',
      fontSize: 14,
      borderRadius: 3,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
    },
    chatSide: {
      padding: 10,
      flexBasis: 60,
      flexShrink: 0,
      flexGrow: 0,
    }
  };
}

class WGroupBulletinPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { profileExpand: false };
    this.styles = getStyles(props.muiTheme);
  }

  componentWillMount() {
    if (this.props.setCurrentPage) { this.props.setCurrentPage('bulletin'); }
  }


  render() {
    const styles = this.styles;

    return (
      <div style={ Object.assign(this.props.style, styles.root) }>
        <div style={styles.leftPanel}>
          <div  className={'chat'} style={{flex: 1,backgroundColor: '#e4e4e4'}}>
          <ul style={ styles.chatList }>
            <li style={ styles.chatRow } className={'other'}>
              <div style={ styles.chatSide }>
              </div>
              <div style={ styles.chatMsg } >
                <div  className={'message-bar clearfix'}>
                  <time>13:23</time>
                </div>
                <div style={ styles.chatOther } className={'message'}>
                  <p>
                    Itaque quod et dolore accusantium. Labore aut similique ab voluptas rerum quia. Reprehenderit voluptas doloribus ut nam tenetur ipsam.
                  </p>
                </div>
              </div>
              <div style={ styles.chatSide }>
                <Avatar src="assets/img/kerem-128.jpg" size={40} />
              </div>
            </li>
            <li style={ styles.chatRow } className={'other'}>
              <div style={ styles.chatSide }>
              </div>
              <div style={ styles.chatMsg } className={'clearfix'}>
                <div className={'message-bar clearfix'}>
                  <time>13:23</time>
                </div>
                <div style={ styles.chatOther } className={'message'}>
                  <p>
                    Itaque quod et dolore accusantium.
                  </p>
                </div>
              </div>
              <div style={ styles.chatSide }>
                <Avatar src="assets/img/kerem-128.jpg" size={40}/>
              </div>
            </li>
            <li style={ styles.chatRow } className={'you'}>
              <div style={ styles.chatSide }>
              <Avatar src="assets/img/kerem-128.jpg" size={40} />
              </div>
              <div style={ styles.chatMsg } className={'clearfix'}>
                <div  className={'message-bar clearfix'}>
                  <time style={{float: 'none'}}>13:23</time>
                </div>
                <div style={ styles.chatSelf } className={'message'}>
                  <p>
                    Itaque quod et dolore accusantium.
                  </p>
                </div>
              </div>
              <div style={ styles.chatSide }>
              </div>
            </li>
            <li style={ styles.chatRow } className={'you'}>
              <div style={ styles.chatSide }>
              <Avatar src="assets/img/kerem-128.jpg" size={40} />
              </div>
              <div style={ styles.chatMsg } className={'clearfix'}>
                <div  className={'message-bar clearfix'}>
                  <time style={{float: 'none'}}>13:23</time>
                </div>
                <div style={ styles.chatSelf } className={'message'}>
                  <p>
                   Itaque quod et dolore accusantium. Labore aut similique ab voluptas rerum quia. Reprehenderit voluptas doloribus ut nam tenetur ipsam.
                  </p>
                </div>
              </div>
              <div style={ styles.chatSide }>
              </div>
            </li>
          </ul>
          </div>
          <div style={{flexBasis:200, flexGrow:0 , flexShrink:0}}>
            <HtmlEditor>
            </HtmlEditor>
          </div>
        </div>
        <WGroupProfileLite muiTheme={ this.props.muiTheme } style={ styles.rightPanel } />
      </div>
    );
  }
}

WGroupBulletinPage.propTypes = {
  setCurrentPage: PropTypes.func,
  muiTheme: PropTypes.object,
};

const NewComponent = AuthConnect(
  WGroupBulletinPage,
  (state) => ({
    wgrouplist: state.wgroup.get('wgrouplist'),
  }),
  {  });

export default NewComponent;