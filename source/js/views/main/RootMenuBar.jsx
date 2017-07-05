import React from 'react';
import PropTypes from 'prop-types';

import ActionHomeMenu from 'material-ui/svg-icons/action/home';

import './RootMenuBar.scss';

class RootMenuBar extends React.Component {

  constructor(props) {
    super(props);
  }

  setActiveMenu = (menuName) => {
    console.log(menuName);
  }

  render() {

    let { menuPane, menuPaneInvisible, onMenuSwitch } = this.props;

    return (
      <aside className="root-menu-container">
        <section className="root-menu">
         <nav className="menu-bar">
          <div className="menu-bar-inner ">
            <ul className="menu-opts ">
              <li className="menu-opts__header-spacer">
                <svg className="logo-icon" viewBox="0 0 18 25">
                    <rect x="15" y="5" width="2" height="10"></rect>
                    <rect x="10" y="5" width="2" height="20"></rect>
                    <rect x="5" y="5" width="2" height="20"></rect>
                    <rect width="2" height="15"></rect>
                  </svg>
              </li>
              <li className="menu-opt opt-all">
                <div className="menu-opt__container active">
                  <div className="menu-opt__badge-wrapper">
                    <span className="menu-opt__badge paulse-animation has-mentions">
                    </span>
                  </div>
                  <button className="menu-opt__button">
                    <ActionHomeMenu/>
                  </button>
                </div>
              </li>
              <li className="menu-opt opt-search">
                <div className="menu-opt__container">
                  <button className="menu-opt__button">
                    <ActionHomeMenu/>
                  </button>
                </div>
              </li>
              <li className="menu-opt opt-query">
                <div className="menu-opt__container">
                  <button className="menu-opt__button">
                    <ActionHomeMenu/>
                  </button>
                </div>
              </li>
              <li className="menu-opt-collection">
                <ul className="menu-opt-collection-list">
                </ul>
              </li>

              <li className="menu-opt opt-plus">
                <div className="menu-opt__container">
                  <button className="menu-opt__button">
                    <ActionHomeMenu/>
                  </button>
                </div>
              </li>
              <li className="menu-opt opt-pinner">
                <div className="menu-opt__container">
                  <button className="menu-opt__button" onClick={ onMenuSwitch }>
                    <ActionHomeMenu/>
                  </button>
                </div>
              </li>
            </ul>
          </div>
         </nav>
         <div >
          <div className={ menuPaneInvisible ? 'menu-panel active':'menu-panel'}>
            <div className="header-brand">
              <img className="header-brand-logo" src="//cdn03.gitter.im/_s/708c5ff/images/svg/gitter-logos/logo-white-lettering.svg"/>
            </div>
            <header className="panel-header">
              <div>
                <div className="panel-header__container active">
                  <h2 className="panel-header__title">All Conversations</h2>
                </div>
              </div>
            </header>
          </div>
         </div>
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