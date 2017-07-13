import React from 'react';
import PropTypes from 'prop-types';
import EditBubbleChrt from 'material-ui/svg-icons/editor/bubble-chart';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FileFolderOpen from 'material-ui/svg-icons/file/folder-open';

class TreeView extends React.Component {

  constructor(props) {

    super(props);
    this.state= {
      nodes: props.nodes,
    }
  }

  render() {

    let {nodes} = this.state;

    let rootNodes = nodes.map((item) => {
      return <TreeNode key={`tnode-${item.id}`} 
              node= {item} 
              nodeIcon = {this.props.nodeIcon}
              muiTheme={this.props.muiTheme}/>;
    });

    return (
      <ul style={{display:'block', paddingLeft:0, marginTop:0, marginBottom:0, marginLeft:10}}>
        {rootNodes}
      </ul>
    );
  }
};

class TreeNode extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      node: props.node,
      hoverIcon: false,
    }
  }

  handleTouchTap = () => {

    let node = this.state.node;
    node.expanded = !node.expanded;
    this.setState({ node });
    
  }

  handleIconMouseEnter = (e)=>{
    let { node } = this.state;
    if(node.children){
      this.setState({hoverIcon: true})
    }else{
      this.setState({hoverIcon: false})
    }
  }

  handleIconMouseLeave = (e)=>{
    let { node } = this.state;
    if(node.children){
      this.setState({hoverIcon: false})
    }
  }

  render(){
    let { nodeIcon, muiTheme } = this.props;
    let { node, hoverIcon } = this.state;
    let icon = null;
    let childNodes = null;
    let { palette } = muiTheme.baseTheme;

    let iconStyle = {
      verticalAlign: 'middle', 
      color: palette.primary2Color
    };

    const hoverIconStyle = {
      cursor: 'pointer',
      color: hoverIcon ? palette.primary3Color : palette.primary1Color
    };

    if(node.expanded && node.children){

      childNodes = node.children.map((child) => {
        return <TreeNode key={`tnode-${child.id}`} 
              node= {child} 
              nodeIcon = {nodeIcon} 
              muiTheme ={muiTheme}/>;
      });
      icon = <FileFolderOpen style={ Object.assign(iconStyle, hoverIconStyle) }/>;

    }else if(!node.expanded && node.children){

      icon = <FileFolder style={ Object.assign(iconStyle, hoverIconStyle) }/>;

    }else if(nodeIcon){

      icon = nodeIcon(node);
      if(icon){
        icon = React.cloneElement(icon, {
          style: iconStyle
        })
      }

    }

    return (
      <li style={{display:'list-item', listStyleType:'none'}}>
        <div style={{display:'block', textAlign:'left', paddingTop:5, paddingBottom:5}}>
          <div style={{display:'inline-block', marginRight: 5}} 
            onTouchTap={this.handleTouchTap}
            onMouseEnter={this.handleIconMouseEnter}
            onMouseLeave={this.handleIconMouseLeave}
            >
            {icon}
          </div>
          <div style={{display:'inline-block', verticalAlign:'middle', fontSize:16, fontWeight:300}}>
            { node.title }
          </div>
        </div>
        {
          node.expanded && 
          <ul style={{display:'block', paddingLeft: 20, marginLeft:0, marginBottom:0}}>
            {childNodes}
          </ul>
        }
      </li>
    );
  }
};

export default TreeView;
