import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import ActionHomeMenu from 'material-ui/svg-icons/action/home';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionExtension from 'material-ui/svg-icons/action/extension';
import NavFirstPage from 'material-ui/svg-icons/navigation/first-page';
import NavLastPage from 'material-ui/svg-icons/navigation/last-page';
import HardwareSecurity from 'material-ui/svg-icons/hardware/security';
import IconButton from 'material-ui/IconButton';
import { withRouter } from 'react-router'
import './RootMenuBar.scss';

function getStyles(muiTheme) {

  const { baseTheme } = muiTheme;

  return {
    menuOptHeader: {
      backgroundColor: baseTheme.palette.primary1Color,
    },
    menuPaneHeader:{
      backgroundColor: baseTheme.palette.primary1Color,
    },
    menuPaneContainer:{
      height: 'calc(100% - 6.5rem)'
    },
    switchButton:{
      color: baseTheme.palette.primary2Color,
    }
  };
}

class RootMenuBar extends React.Component {

  constructor(props) {
    super(props);
  }

  renderMenuItems(menuItems){
    const renderedItems = [];

    if(!menuItems) return null;
    React.Children.forEach(menuItems, (child, index) => {
      renderedItems.push(
        <li key={`menu-li-${index}`} className="menu-opt__item">
          {child}
        </li>
      );
    });

    return renderedItems;
  }

  handleMenuJumpWGroupList = () => {
    const { history } = this.props;
    history.push('/wgroup-list');
  }

  handleMenuJumpMain = () => {
    const { history } = this.props;
    history.push('/main');
  }

  handleMenuJumpConfig = () => {
    const { history } = this.props;
    history.push('/sys-settings');
  }

  handleMenuJumpSecurity = () => {
    const { history } = this.props;
    history.push('/users');
  }

  render() {

    let { menuPane, menuPaneVisible, onMenuSwitch, muiTheme, menuItems, menuActive } = this.props;
    let styles = getStyles(muiTheme);

    const newMenuItems = this.renderMenuItems(menuItems);
    return (
      <aside className="root-menu-container">
        <section className="root-menu">
         <nav className="menu-bar">
          <div className="menu-bar-inner ">
            <ul className="menu-opts ">
              <li className="menu-opts__header-spacer" style={styles.menuOptHeader}>
                <svg className="logo-icon" viewBox="0 0 18 25">
                    <rect x="15" y="5" width="2" height="10"></rect>
                    <rect x="10" y="5" width="2" height="20"></rect>
                    <rect x="5" y="5" width="2" height="20"></rect>
                    <rect width="2" height="15"></rect>
                  </svg>
              </li>
              <li className="menu-opt opt-global">
                <FloatingActionButton mini={true} 
                  secondary={ menuActive === 'main'}
                  onTouchTap={ this.handleMenuJumpMain }>
                  <ActionHomeMenu />
                </FloatingActionButton>
              </li>
              <li className="menu-opt opt-wgroup">
                <FloatingActionButton mini={true} 
                  secondary={ menuActive === 'wgroup-list'}
                  onTouchTap={ this.handleMenuJumpWGroupList }>
                  <ActionExtension />
                </FloatingActionButton>
              </li>
              <li className="menu-opt opt-wspace">
                <FloatingActionButton mini={true} 
                  secondary={ menuActive === 'workspace'}>
                  <MapsPersonPin />
                </FloatingActionButton>
              </li>
              <li className="menu-opt-collection">
                <ul className="menu-opt__list">
                  <li className="menu-opt__item">
                    <FloatingActionButton mini={true}
                      secondary={ menuActive === 'config'}
                      onTouchTap={ this.handleMenuJumpConfig }>
                      <ActionSettings />
                    </FloatingActionButton>
                  </li>
                  <li className="menu-opt__item">
                    <FloatingActionButton mini={true}
                      secondary={ menuActive === 'security'}
                      onTouchTap={ this.handleMenuJumpSecurity }>
                      <HardwareSecurity />
                    </FloatingActionButton>
                  </li>
                  {newMenuItems}
                </ul>
              </li>
            { (menuPane) ?
              <li className="menu-opt opt-pinner">
                <IconButton onTouchTap={ onMenuSwitch } iconStyle={styles.switchButton}>
                  {menuPaneVisible ? <NavFirstPage /> : <NavLastPage/>}
                </IconButton>
              </li> : null
            }
            </ul>
          </div>
         </nav>
         { (menuPane) ?
          <div className={ menuPaneVisible ? 'menu-panel active':'menu-panel'}>
            <div className="header-brand" style={styles.menuPaneHeader}>
              <img className="header-brand-logo" src="//cdn03.gitter.im/_s/708c5ff/images/svg/gitter-logos/logo-white-lettering.svg"/>
            </div>
            <div style={styles.menuPaneContainer}>
            { menuPane }
            </div>
          </div> : null
         }
        </section>
      </aside>
    );
  }
}

RootMenuBar.propTypes = {
  style: PropTypes.object,
  muiTheme: PropTypes.object,
};

export default withRouter(RootMenuBar);
