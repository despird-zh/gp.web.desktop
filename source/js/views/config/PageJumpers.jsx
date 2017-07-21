import React, { PureComponent, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover/Popover';
import {Menu, MenuItem} from 'material-ui/Menu';

class PageJumpers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorOrigin: {
        horizontal: 'left',
        vertical: 'bottom',
      },
      targetOrigin: {
        horizontal: 'left',
        vertical: 'top',
      },
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render(){
    const {buttonLabel, children} = this.props;
    return (<div style={{position:'absolute', bottom:0, height: '6.5rem',width:'26.5rem', padding:'1.5rem'}}>
      <RaisedButton label={buttonLabel} fullWidth={true} onTouchTap={this.handleTouchTap} />
      <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={this.state.anchorOrigin}
        targetOrigin={this.state.targetOrigin}
        onRequestClose={this.handleRequestClose}>
        <Menu desktop={true}>
          { children }
        </Menu>
      </Popover>
    </div>);
  }
}

export default PageJumpers;