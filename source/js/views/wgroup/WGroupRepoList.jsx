import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import CheckboxOutline from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import CheckboxChecked from 'material-ui/svg-icons/toggle/check-box';
import IndeterminateCheckbox from 'material-ui/svg-icons/toggle/indeterminate-check-box';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Avatar from 'material-ui/Avatar';

class WGroupRepoList extends Component {

  constructor(props){
    super(props);
    this.state = {
      rowCount : 20,
      hasMore: true,
      isLoading: false
    };
  }

  setLoadIndicator = (el) => {
    this.loadIndicator = el;
  }

  handleLoadMore = () => {
    
    this.setState({rowCount: this.state.rowCount + 10, isLoading: false});
  }

  onHandleUpdate = (values) => {

    const { scrollTop, scrollHeight, clientHeight } = values;
    const bottomScrollTop = scrollHeight - clientHeight;
    //const shadowBottomOpacity = 1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
    if(scrollTop > bottomScrollTop - 40 && !this.state.isLoading){
      this.setState({isLoading: true});
      this.handleLoadMore();
    }
    //css(shadowTop, { opacity: shadowTopOpacity });
    //css(shadowBottom, { opacity: shadowBottomOpacity });
  }

  render(){
    const styles = this.props.styles;

    let rows = [];
    for(let i = 0; i<this.state.rowCount; i++){
      
      let row = (<RepoListRow key={`row-${i}`} rowIndex={i} styles={styles}/>);
      rows.push(row);
    }
    return(
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
        <Scrollbars style={{ height: 'calc( 100% - 6.4rem)' }}
          // This will activate auto hide
          autoHide
          // Hide delay in ms
          autoHideTimeout={1000}
          // Duration for hide animation in ms.
          autoHideDuration={200}
          onUpdate={this.onHandleUpdate}>
          <ul style={{marginLeft:0, padding:0}}>
            {rows}
            { this.state.hasMore ? <li ref={this.setLoadIndicator} style={{paddingLeft:0, height:40, display:'block', borderBottom: '1px solid rgb(224, 224, 224)'}}>
              loading...
            </li>: null}
          </ul>
         </Scrollbars>
      </div>
    );
  };
}

const RepoListRow = ({ rowIndex, styles}) => {
  return (
    <li style={{paddingLeft:0, display:'flex', borderBottom: '1px solid rgb(224, 224, 224)'}}>
          <div style={{flexShrink:0, flexGrow:0, padding: '0.5rem'}}>
            <IconButton >{ rowIndex%2 == 0? <CheckboxOutline/>:<CheckboxChecked/>}</IconButton>
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
                textOverflow: 'ellipsis', paddingBottom:'0.5rem'}} >
                <span> {rowIndex} - what is the best choice.</span>
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
  );
};

export default WGroupRepoList;