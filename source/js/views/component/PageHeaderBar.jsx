import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IconButton from 'material-ui/IconButton';
/** icons */
import ActionHomeMenu from 'material-ui/svg-icons/action/home';
import ActionOpenBrowser from 'material-ui/svg-icons/action/open-in-browser';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionTrackChgs from 'material-ui/svg-icons/action/track-changes';
import ActionLaunch from 'material-ui/svg-icons/action/launch';
import HardwareSecurity from 'material-ui/svg-icons/hardware/security';
import HardwareDvcHub from 'material-ui/svg-icons/hardware/device-hub';
import DeviceWidgets from 'material-ui/svg-icons/device/widgets';

import { hashHistory } from 'react-router';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { openSignin, signoff } from '../../store/actions/authActions';


class HeaderBar extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {

    return (
      <div className="page-header">
        <div className="page-header-group avatar-group">
          <label className="avatar-label">
            <img height="48" width="48" src="https://avatars-01.gitter.im/group/iv/3/57542c12c43b8c601976fa66?s=48"/>
          </label>
        </div>
        <div className="page-header-group info-group">
          <div className="info-sub-heading">
            <h1 className="info-heading">
              <a href="https://github.com/gitterHQ/gitter" target="_blank">gitterHQ/gitter</a>
            </h1>
          </div>
          <div className="info-sub-topic">
            <div className="topic-wrapper">
              <p className="info-topic">
                Gitter Support - please visist <a href="#">http:xxs.com</a> this is a demo title. ok! 
              </p>
            </div>
          </div>
        </div>
        <div className="page-header-group actions-group">
          <a className="header-action">
            <i className="fa fa-globe" ></i>
          </a>
          <button className="header-action">
            <i className="fa fa-star-o" ></i>
          </button>
          <button className="header-action">
            <i className="fa fa-cog" ></i>
          </button>
          <div className="header-profile">
            <img src="https://avatars-02.gitter.im/gh/uv/3/despird-zh" className="profile-avatar"/>
          </div>
        </div>
      </div>
    );
  }
}

HeaderBar.propTypes = {
  muiTheme: PropTypes.object,
  signoff: PropTypes.func,
  authenticated: PropTypes.bool,
};

export default connect(
  (state) => ({
    authenticated: state.auth.get('authenticated'),
    account: state.auth.get('account'),
  }),
  (dispatch) => (
    bindActionCreators({
      openSignin, signoff,
    }, dispatch)
  )
)(muiThemeable()(HeaderBar));