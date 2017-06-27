import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { snackAction, loaderAction } from '../store/actions/appActions';
import PageHeaderBar from './component/PageHeaderBar';

import NavFirstPage from 'material-ui/svg-icons/navigation/first-page';
import NavLastPage from 'material-ui/svg-icons/navigation/last-page';

class DevPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {collapsed: false};
  }

  onCollapseSwitch = () =>{
    this.setState({ collapsed: !this.state.collapsed });
  }
  render() {

    return (
      <div className="page-wrapper">
        <header className="page-header-wrapper">
          <PageHeaderBar/>
        </header>
        <div className="page-content-wrapper">
          <div className="page-right-menu">
            <div className={ this.state.collapsed ? "right-menu collapsed":"right-menu " }>
              <div className="menu-body">
              </div>
              <div className="menu-footer">
                { this.state.collapsed ? <NavFirstPage onClick={ this.onCollapseSwitch }/> : <NavLastPage onClick={ this.onCollapseSwitch }/>}
              </div>
            </div>
          </div>
          <div className="page-content">
            <div className="content-body">
              xxqqq
            </div>
            <footer className="content-footer">
              xx
            </footer>
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
)(DevPage);
