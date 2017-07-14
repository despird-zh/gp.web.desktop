import React from 'react';
import PropTypes from 'prop-types';


function getStyles(muiTheme) {
  const { baseTheme } = muiTheme;
  console.log(baseTheme);
  return {
    root: {
      display: 'flex',
      position: 'relative',
      marginTop: 10,
    }
    
  };
}

class WGroupDemoPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { profileExpand: false };
    this.styles = getStyles(props.muiTheme);
  }

  componentWillMount() {
    if (this.props.setCurrentPage) { this.props.setCurrentPage('demo'); }
    console.log(WorkgroupApis);
  }


  render() {
    const styles = this.styles;

    return (
      <div style={ styles.root }>
        
      </div>
    );
  }
}

WGroupDemoPage.propTypes = {
  setCurrentPage: PropTypes.func,
  muiTheme: PropTypes.object,
};

const NewComponent = AuthConnect(
  WGroupDemoPage,
  (state) => ({
    wgrouplist: state.wgroup.get('wgrouplist'),
  }),
  { saveWGroups });

  <div style={{flex:1, overflow:'hidden'}}>
              <div style={{display:'flex',borderBottom: '1px solid rgb(224, 224, 224)'}}>
                <div style={{flexShrink:0, flexGrow:0, padding: '0.5rem'}}>
                  <IconButton ><IndeterminateCheckbox/></IconButton>
                </div>
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
                <div style={{flexShrink:0, flexGrow:0, padding: '0.5rem'}}>
                  <IconButton ><CheckboxOutline/></IconButton>
                </div>
                <div style={{flex:1,display: 'flex', verticalAlign:'middle'}}>
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
                      textOverflow: 'ellipsis', paddingBottom:'0.5rem'}} 
                      onClick={this.handleRepoLink}>
                      <span> what is the best choice.</span>
                    </a>
                    <span style={{display: 'block',
                      overflow: 'hidden',
                      padding: '0.3rem 0 0.5rem',
                      whiteSpace: 'nowrap',
                      color:'rgb(158, 158, 158)',
                      fontSize: '1.4rem',
                      fontWeight: 300,
                      textOverflow: 'ellipsis'}}>
                      伊拉克苏马里亚电视台网站当天报道，“伊斯兰国”媒体发布简短声明，称巴格达迪已经死亡，这一组织将产生新的最高头目。声明没有给出巴格达迪死亡细节
                    </span>
                  </div>
                </div>
                <div style={{padding:'1.2rem', width:60}}>
                  <Avatar src="assets/img/kerem-128.jpg" size={30} style={{ verticalAlign:'middle'}} />
                </div>
                <div style={styles.colsum}> 3 folders, 12 files 1.3G</div>
                <div style={styles.colaction}>xxxxx</div>
                </li>
                <li style={{paddingLeft:0, display:'flex', borderBottom: '1px solid rgb(224, 224, 224)'}}>
                <div style={{flexShrink:0, flexGrow:0, padding: '0.5rem'}}>
                  <IconButton ><CheckboxChecked/></IconButton>
                </div>
                <div style={{flex:1,display: 'flex', verticalAlign:'middle'}}>
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
                      textOverflow: 'ellipsis', paddingBottom:'0.5rem'}} 
                      onClick={this.handleRepoLink}>
                      <span> what is the best choice.</span>
                    </a>
                    <span style={{display: 'block',
                      overflow: 'hidden',
                      padding: '0.3rem 0 0.5rem',
                      whiteSpace: 'nowrap',
                      color:'rgb(158, 158, 158)',
                      fontSize: '1.4rem',
                      fontWeight: 300,
                      textOverflow: 'ellipsis'}}>
                      伊拉克苏马里亚电视台网站当天报道，“伊斯兰国”媒体发布简短声明，称巴格达迪已经死亡，这一组织将产生新的最高头目。声明没有给出巴格达迪死亡细节
                    </span>
                  </div>
                </div>
                <div style={{padding:'1.2rem', width:60}}>
                  <Avatar src="assets/img/kerem-128.jpg" size={30} style={{ verticalAlign:'middle'}} />
                </div>
                <div style={styles.colsum}> 3 folders, 12 files 1.3G</div>
                <div style={styles.colaction}>xxxxx</div>
                </li>
              </ul>
            </div>