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

class WGroupAddPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.styles = getStyles(props.muiTheme);
  }

  //<WGroupBaseInfo muiTheme={ muiTheme } errtips={{}}/>
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

export default connect(
  (state) => ({}),
  (dispatch) => (
    bindActionCreators({
      snackAction,
      loaderAction,
    }, dispatch)
  )
)(WGroupAddPage);