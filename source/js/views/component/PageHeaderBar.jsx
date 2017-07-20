import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IconButton from 'material-ui/IconButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
/** icons */
import ActionHomeMenu from 'material-ui/svg-icons/action/home';
import ActionOpenBrowser from 'material-ui/svg-icons/action/open-in-browser';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionTrackChgs from 'material-ui/svg-icons/action/track-changes';
import ActionLaunch from 'material-ui/svg-icons/action/launch';
import HardwareSecurity from 'material-ui/svg-icons/hardware/security';
import HardwareDvcHub from 'material-ui/svg-icons/hardware/device-hub';
import DeviceWidgets from 'material-ui/svg-icons/device/widgets';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import { persistor } from '../../store';
import { openSignin, signoff } from '../../store/actions/authActions';

function getStyles(muiTheme) {
  const { baseTheme:{palette} } = muiTheme;

  return {
    pageHeader: {
      backgroundColor: palette.primary1Color,
    },
    avatar: {
      margin: 0
    },
    iconBtn: {
      width:35, 
      height:35,
      padding:0,
      marginTop:5,
    }
  };
}

class HeaderBar extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.styles = getStyles(props.muiTheme);
    this.state = {
      avatarPopover: false,
      avatarAnchor: null,
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      avatarPopover: true,
      avatarAnchor: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      avatarPopover: false,
    });
  };

  handleSignoff = () => {
    persistor.purge(['auth','config','app']);
    this.props.signoff({
      principal: this.props.account
    });
  };

  render() {
    const styles = this.styles;

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
          <div className="header-profile" style={{paddingLeft:15, paddingRight:10, paddingTop:10}}>
            <IconButton style={styles.iconBtn} iconStyle={styles.avatar} 
              onTouchTap={this.handleTouchTap}>
              <Avatar
                src="assets/img/uxceo-128.jpg"
                size={35}/>
            </IconButton>
            <Popover
              open={this.state.avatarPopover}
              anchorEl={this.state.avatarAnchor}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
              animation={PopoverAnimationVertical}
            >
              <Menu>
                <MenuItem primaryText="Settings" />
                <MenuItem primaryText="Sign out" onTouchTap={this.handleSignoff}/>
              </Menu>
            </Popover>
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
  account: PropTypes.string
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
)(HeaderBar);