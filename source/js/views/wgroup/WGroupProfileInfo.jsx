import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import CommSwapCall from 'material-ui/svg-icons/communication/swap-calls';
import CommContacts from 'material-ui/svg-icons/communication/contacts';
import HWKeyBoardDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import HWKeyBoardUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import Divider from 'material-ui/Divider';
import { Tabs, Tab } from 'material-ui/Tabs';
import Subheader from 'material-ui/Subheader';
import { grey400, darkBlack } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const iconButtonElement = (
  <IconButton
    touch={ true }
  >
    <MoreVertIcon color={ grey400 } />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={ iconButtonElement }>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

function getStyles(muiTheme) {
  const { baseTheme } = muiTheme;

  return {
    descr: {
      lineHeight: 1.3,
      marginBottom: '1rem',
      color: baseTheme.palette.secondaryTextColor,
    },
    smallIcon: {
      width: 20,
      height: 20,
      color: baseTheme.palette.secondaryTextColor,
    },
  };
}

class WGroupProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profileExpand: false };
    this.styles = getStyles(props.muiTheme);
  }

  onProfileExpand = () => {
    this.setState({ profileExpand: !this.state.profileExpand });
  }


  render() {
    const expandContent = this.state.profileExpand ?
      (<div style={ { marginTop: 5 } }>
        <Divider />
        <div style={ { paddingTop: 10, paddingBottom: 10 } }>
          <Avatar src='assets/img/uxceo-128.jpg' size={ 25 } style={ { marginLeft: 5, marginRight: 5 } } />
          <Avatar src='assets/img/uxceo-128.jpg' size={ 25 } style={ { marginLeft: 5, marginRight: 5 } } />
          <Avatar src='assets/img/uxceo-128.jpg' size={ 25 } style={ { marginLeft: 5, marginRight: 5 } } />
          <Avatar src='assets/img/uxceo-128.jpg' size={ 25 } style={ { marginLeft: 5, marginRight: 5 } } />
          <Avatar src='assets/img/uxceo-128.jpg' size={ 25 } style={ { marginLeft: 5, marginRight: 5 } } />
          <Avatar src='assets/img/uxceo-128.jpg' size={ 25 } style={ { marginLeft: 5, marginRight: 5 } } />
          <Avatar src='assets/img/uxceo-128.jpg' size={ 25 } style={ { marginLeft: 5, marginRight: 5 } } />
          <Avatar src='assets/img/uxceo-128.jpg' size={ 25 } style={ { marginLeft: 5, marginRight: 5 } } />
          <Avatar src='assets/img/uxceo-128.jpg' size={ 25 } style={ { marginLeft: 5, marginRight: 5 } } />
        </div>
        <Divider />
        <div style={ { paddingTop: 10 } }>
          <FloatingActionButton mini={true}>
            <HWKeyBoardUp />
          </FloatingActionButton>
        </div>
      </div>) : null;

    const styles = this.styles;

    return (
      <div style={ this.props.style }>
        <div style={ { display: 'flex' } }>
          <Avatar src='assets/img/uxceo-128.jpg' size={ 60 } style={ { marginTop: 5, marginLeft: 5, marginRight: 5, borderRadius: 5 } } />
          <div style={ { flex: 1, marginLeft: '1rem', marginTop: '0.5rem' } }>
            <h4>ExissEvilGrp</h4>
            <p style={ styles.descr }>are used for general functions and reduce the amount of layering on the screen</p>
          </div>
        </div>
        <div style={ { padding: 10 } }>
          <div style={ { display: 'flex'} }>
            <a style={ { flexGrow: 1, textDecoration: 'none' } }>
              <h3 style={ { textAlign: 'center' } }>14</h3>
              <span style={ { display: 'block', textAlign: 'center' } }>
                <CommSwapCall style={ styles.smallIcon } />
              </span>
            </a>
            <a style={ { flexGrow: 1, textDecoration: 'none' } }>
              <h4 style={ { textAlign: 'center' } }>123K</h4>
              <span style={ { display: 'block', textAlign: 'center' } }><ActionAssignment style={ styles.smallIcon } /></span>
            </a>
            <a style={ { flexGrow: 1, textDecoration: 'none' } }>
              <h4 style={ { textAlign: 'center' } }>123</h4>
              <span style={ { display: 'block', textAlign: 'center' } }><CommContacts style={ styles.smallIcon } /></span>
            </a>
            <div style={ { flexGrow: 0, flexBasis: 40 } }>
              <IconButton onTouchTap={ this.onProfileExpand }>
                { this.state.profileExpand ? <HWKeyBoardUp /> : <HWKeyBoardDown />}
              </IconButton>
            </div>
          </div>
          { expandContent }
        </div>
        <Tabs style={ { marginTop: 10} } tabItemContainerStyle={{backgroundColor:'#e0e0e0'}}>
          <Tab icon={ <ActionFlightTakeoff /> }>
            <List style={ { marginTop: 0 } }>
              <Subheader style={ { lineHeight: '38px' } }>Top 5 Hotest</Subheader>
              <ListItem
                leftAvatar={ <Avatar size={ 30 } src='assets/img/ok-128.jpg' /> }
                rightIconButton={ rightIconMenu }
                primaryText='Brendan Lim'
                innerDivStyle={ { padding: '10px 40px 10px 60px' } }
                secondaryText={
                  <p>
                    <span style={ { color: darkBlack } }>Brunch this weekend?</span><br />
                      I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                    </p>
                  }
                secondaryTextLines={ 2 }
              />
              <Divider />
              <ListItem
                leftAvatar={ <Avatar size={ 30 } src='assets/img/kolage-128.jpg' /> }
                rightIconButton={ rightIconMenu }
                primaryText='me, Scott, Jennifer'
                innerDivStyle={ { padding: '10px 40px 10px 60px' } }
                secondaryText={
                  <p>
                    <span style={ { color: darkBlack } }>Summer BBQ</span><br />
                      Wish I could come, but I&apos;m out of town this weekend.
                    </p>
                  }
                secondaryTextLines={ 2 }
              />
              <Divider />
              <ListItem
                leftAvatar={ <Avatar size={ 30 } src='assets/img/uxceo-128.jpg' /> }
                rightIconButton={ rightIconMenu }
                primaryText='Grace Ng'
                innerDivStyle={ { padding: '10px 40px 10px 60px' } }
                secondaryText={
                  <p>
                    <span style={ { color: darkBlack } }>Oui oui</span><br />
                      Do you have any Paris recs? Have you ever been?
                    </p>
                  }
                secondaryTextLines={ 2 }
              />
              <Divider />
              <ListItem
                leftAvatar={ <Avatar size={ 30 } src='assets/img/kerem-128.jpg' /> }
                rightIconButton={ rightIconMenu }
                primaryText='Kerem Suer'
                innerDivStyle={ { padding: '10px 40px 10px 60px' } }
                secondaryText={
                  <p>
                    <span style={ { color: darkBlack } }>Birthday gift</span><br />
                      Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                    </p>
                  }
                secondaryTextLines={ 2 }
              />
              <Divider />
              <ListItem
                leftAvatar={ <Avatar size={ 30 } src='assets/img/raquelromanp-128.jpg' /> }
                rightIconButton={ rightIconMenu }
                primaryText='Raquel Parrado'
                innerDivStyle={ { padding: '10px 40px 10px 60px' } }
                secondaryText={
                  <p>
                    <span style={ { color: darkBlack } }>Recipe to try</span><br />
                      We should eat this: grated squash. Corn and tomatillo tacos.
                    </p>
                  }
                secondaryTextLines={ 2 }
              />
            </List>
          </Tab>
          <Tab icon={ <ActionFlightTakeoff /> }>
            <List style={ { marginTop: 0 } }>
              <Subheader style={ { lineHeight: '38px' } }>Top 5 Hotest</Subheader>
              <ListItem
                leftAvatar={ <Avatar size={ 30 } src='assets/img/ok-128.jpg' /> }
                rightIconButton={ rightIconMenu }
                primaryText='Brendan Lim'
                innerDivStyle={ { padding: '10px 40px 10px 60px' } }
                secondaryText={
                  <p>
                    <span style={ { color: darkBlack } }>Brunch this weekend?</span><br />
                      I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                    </p>
                  }
                secondaryTextLines={ 2 }
              />
              <Divider />
              <ListItem
                leftAvatar={ <Avatar size={ 30 } src='assets/img/kolage-128.jpg' /> }
                rightIconButton={ rightIconMenu }
                primaryText='me, Scott, Jennifer'
                innerDivStyle={ { padding: '10px 40px 10px 60px' } }
                secondaryText={
                  <p>
                    <span style={ { color: darkBlack } }>Summer BBQ</span><br />
                      Wish I could come, but I&apos;m out of town this weekend.
                    </p>
                  }
                secondaryTextLines={ 2 }
              />
              <Divider />
              <ListItem
                leftAvatar={ <Avatar size={ 30 } src='assets/img/uxceo-128.jpg' /> }
                rightIconButton={ rightIconMenu }
                primaryText='Grace Ng'
                innerDivStyle={ { padding: '10px 40px 10px 60px' } }
                secondaryText={
                  <p>
                    <span style={ { color: darkBlack } }>Oui oui</span><br />
                      Do you have any Paris recs? Have you ever been?
                    </p>
                  }
                secondaryTextLines={ 2 }
              />
              <Divider />
              <ListItem
                leftAvatar={ <Avatar size={ 30 } src='assets/img/kerem-128.jpg' /> }
                rightIconButton={ rightIconMenu }
                primaryText='Kerem Suer'
                innerDivStyle={ { padding: '10px 40px 10px 60px' } }
                secondaryText={
                  <p>
                    <span style={ { color: darkBlack } }>Birthday gift</span><br />
                      Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                    </p>
                  }
                secondaryTextLines={ 2 }
              />
              <Divider />
              <ListItem
                leftAvatar={ <Avatar size={ 30 } src='assets/img/raquelromanp-128.jpg' /> }
                rightIconButton={ rightIconMenu }
                primaryText='Raquel Parrado'
                innerDivStyle={ { padding: '10px 40px 10px 60px' } }
                secondaryText={
                  <p>
                    <span style={ { color: darkBlack } }>Recipe to try</span><br />
                      We should eat this: grated squash. Corn and tomatillo tacos.
                    </p>
                  }
                secondaryTextLines={ 2 }
              />
            </List>
          </Tab>
          <Tab icon={ <ActionFlightTakeoff /> } />
        </Tabs>
      </div>
    );
  }
}

WGroupProfileInfo.propTypes = {
  muiTheme: PropTypes.object,
  style: PropTypes.object,
};

export default WGroupProfileInfo;