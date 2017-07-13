import React from 'react';
import PropTypes from 'prop-types';
import HWKeyArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import CtntLowPriority from 'material-ui/svg-icons/content/low-priority';
import Tooltip from 'material-ui/internal/Tooltip';
import Popover from 'material-ui/Popover';

const getStyles = function(muiTheme){
  const {baseTheme} = muiTheme;
  return {
    container:{
      padding:'12px 0',
      marginBottom: 0,
      marginTop:0,
      listStyle: 'none'
    },
    item: {
      display: 'inline-block',
      fontSize: 16,
      lineHeight: 1.4,
      textAlign: 'left',
      position: 'relative'
    },
    itemLink: {
      textDecoration: 'none',
      display: 'inline-block',
      verticalAlign: 'middle',
      color: baseTheme.palette.primary2Color,
      cursor: 'pointer',
      overflow: 'hidden',
      whiteSpace:'nowrap',
      textOverflow: 'ellipsis',
      fontSize: 14,
      maxWidth: 80
    },
    itemDeactive: {
      color: baseTheme.palette.accent1Color,
      cursor: 'default',
    },
    arrowStyle: {
      color: baseTheme.palette.primary2Color,
      fill: baseTheme.palette.primary2Color,
      verticalAlign: 'middle',
      width: 18,
      height: 18
    },
    popover:{
      width:200
    }
  }
}

const MAX_PER_LINE = 7;

class Breadcrumb extends React.Component {

  constructor(props) {
    super(props);
    this.styles = getStyles(props.muiTheme);
    this.state = {
      showMoreItems: false
    }
  }

  setShowMoreLink = (el) => {
    this.showMoreLinkEL = el;
  }

  handleMoreItemClose = () => {
    this.setState({ showMoreItems: false });
  }

  handleMoreItemClick = () => {
    this.setState({ showMoreItems: true });
  }

  handleJumpClick = (item) => {
    this.setState({ showMoreItems: false });
    if(this.props.onJumpClick)
      this.props.onJumpClick(item);
  }

  render(){
    let styles = this.styles;
    let containerStyle = Object.assign(styles.container, this.props.style);
    let { items } = this.props;
    let dropdownItems = [];

    let linkItems = items.filter((item, index) => {

      if(items.length > MAX_PER_LINE && index < (items.length - MAX_PER_LINE)){
        dropdownItems.push(item);
        return false;
      }else{
        return true;
      }
    });

    let linkELs = linkItems.map((item, index) => {

      let linkStyle = (index === linkItems.length -1 ) ? 
        Object.assign({}, styles.itemLink, styles.itemDeactive) :
        styles.itemLink;

      return (
        <BreadcrumbItem key={`bitem-${item.id}`} itemData={ item } 
          hasPreIcon={ index !== 0 }
          itemStyle={ styles.item } 
          linkStyle={ linkStyle } 
          iconStyle={ styles.arrowStyle }
          hasTooltip={ true }
          callback={ (index === linkItems.length-1) ? null : this.handleJumpClick }/>
      );
    });

    let dropdownELs = dropdownItems.length > 0 ? dropdownItems.map((item, index) => {
      return (
        <BreadcrumbItem key={`bitem-${item.id}`} itemData={ item } 
          hasPreIcon={ false }
          itemStyle={ Object.assign({}, styles.item, {display: 'list-item', paddingTop:5}) } 
          linkStyle={ Object.assign({}, styles.itemLink, {maxWidth: 180})} 
          iconStyle={ styles.arrowStyle }
          hasTooltip={ false }
          callback={ this.handleJumpClick }/>
      );
    }) : null;

    return (
      <ol style={ containerStyle }>
        { (dropdownELs) && <li style={styles.item}>
          <a ref={ this.setShowMoreLink } 
              style={Object.assign({}, styles.itemLink, {marginRight: 10})} 
              onTouchTap={this.handleMoreItemClick}>
            <CtntLowPriority style={Object.assign({},styles.arrowStyle,{width: 24, height:24})}/>
          </a>
          <Popover
              open={this.state.showMoreItems}
              anchorEl={this.showMoreLinkEL}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleMoreItemClose}
              style={styles.popover}>
            <ul style={{listStyle: 'none', paddingLeft: 15, marginTop: 5, marginBottom: 10}}>
              {dropdownELs}
            </ul>
          </Popover>
        </li>}
        { linkELs }
      </ol>
    );
  }
}

class BreadcrumbItem extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false,
    }
  }

  handleClick = ()=>{
    if(this.props.callback){
      this.props.callback(this.props.itemData);
    }
  }

  render(){

    let {itemData, itemStyle, linkStyle, iconStyle, hasPreIcon, hasTooltip, callback } = this.props;

    return (
      <li key={ `litem-${itemData.id}`} style={itemStyle}
      >
        { (hasPreIcon) && <HWKeyArrowRight style={iconStyle}/> }
        <a style={linkStyle} 
        onClick={ this.handleClick }
        onMouseEnter={()=>{this.setState({showTooltip: true})}}
        onMouseLeave={()=>{this.setState({showTooltip: false})}}
        >{ itemData.label }</a>
        { (hasTooltip) && <Tooltip show={ this.state.showTooltip }
           label={itemData.label}
           style={{fontSize: 12}}
           horizontalPosition="right"
           verticalPosition="top"
           touch={true}/>}
      </li>
    );
  }
}

export default Breadcrumb;