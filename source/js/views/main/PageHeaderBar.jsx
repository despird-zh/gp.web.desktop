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

function getStyles(muiTheme) {
  const {
    appBar,
    button: {
      iconButtonSize,
    },
    zIndex,

  } = muiTheme;

  const styles = {
    
  };

  return styles;
}

class HeaderBar extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.styles = getStyles(this.props.muiTheme);
  }

  render() {

    return (

      <div style={ this.styles.root } className='content'>

      </div>
    );
  }
}

HeaderBar.propTypes = {
  openSignin: PropTypes.func,
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
