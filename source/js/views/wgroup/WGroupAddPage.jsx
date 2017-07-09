import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavFirstPage from 'material-ui/svg-icons/navigation/first-page';
import NavLastPage from 'material-ui/svg-icons/navigation/last-page';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';


import { snackAction, loaderAction } from '../../store/actions/appActions';
import PageHeaderBar from '../component/PageHeaderBar';
import WGroupBaseInfo from './WGroupBaseInfo';


function getStyles(muiTheme) {
  const { baseTheme } = muiTheme;

  return {
    pageHeader: {
      backgroundColor: baseTheme.palette.primary1Color,
    }
  };
}

class DevPage extends Component {

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
    this.props.resetRootMenu({menuPaneVisible:true, menuPane: null });
  }

  render() {
    let { muiTheme } = this.props;

    return (
      <div className="page-wrapper">
        <header className="page-header-wrapper" style={this.styles.pageHeader}>
          <PageHeaderBar muiTheme={ muiTheme }/>
        </header>
        <div className="page-content-wrapper">
          <div className="page-content" style={{overflowY:'auto', padding:'0 1.5rem 1.5rem'}}>
            <WGroupBaseInfo muiTheme={ muiTheme } errtips={{}}/>
          </div>
        </div>
      </div>
    );
  }
}

const RootMenuContent = ({ test1 }) => {
  
  return (<div>
    <RaisedButton label="Test" primary={true} onTouchTap={test1}/>
  </div>);
};

export default connect(
  (state) => ({}),
  (dispatch) => (
    bindActionCreators({
      snackAction,
      loaderAction,
    }, dispatch)
  )
)(DevPage);