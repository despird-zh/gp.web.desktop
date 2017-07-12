import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionHomeMenu from 'material-ui/svg-icons/action/home';
import NavFirstPage from 'material-ui/svg-icons/navigation/first-page';
import NavLastPage from 'material-ui/svg-icons/navigation/last-page';
import IconButton from 'material-ui/IconButton';

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
    switchButton:{
      color: baseTheme.palette.primary2Color,
    }
  };
}

class RootMenuBar extends React.Component {

  constructor(props) {
    super(props);
  }

  setActiveMenu = (menuName) => {
    console.log(menuName);
  }

  render() {

    let { menuPane, menuPaneVisible, onMenuSwitch, muiTheme } = this.props;
    let styles = getStyles(muiTheme);

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
              <li className="menu-opt opt-all">
                <FloatingActionButton mini={true}>
                  <ActionHomeMenu />
                </FloatingActionButton>
              </li>
              <li className="menu-opt opt-search">
                <FloatingActionButton mini={true} >
                  <ActionHomeMenu />
                </FloatingActionButton>
              </li>
              <li className="menu-opt opt-query">
                <FloatingActionButton mini={true} secondary={true}>
                  <ContentAdd />
                </FloatingActionButton>
              </li>
              <li className="menu-opt opt-plus">
                <FloatingActionButton mini={true}>
                  <ContentAdd />
                </FloatingActionButton>
              </li>
              <li className="menu-opt-collection">
                <ul className="menu-opt-collection-list">
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
            { menuPane }
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

export default RootMenuBar;
