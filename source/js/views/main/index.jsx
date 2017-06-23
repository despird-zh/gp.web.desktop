import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Throttle from 'lodash.throttle';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import { grey200 } from 'material-ui/styles/colors';
import typography from 'material-ui/styles/typography';
import HeaderBar from './HeaderBar';
import FooterBar from './FooterBar';
import SigninDialog from '../component/Signin/SigninDialog';
import AffiliateBars from '../component/AffiliateBars';
import ActionHomeMenu from 'material-ui/svg-icons/action/home';
const rootTheme = getMuiTheme(lightBaseTheme);

const styles = {

  header: {
    background: rootTheme.appBar.color,
  },
  footer: {
    background: grey200,
    height: 44,
    color: typography.textDarkBlack,
  },

};

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends Component {

  constructor(props) {
    super(props);
    this.state = { menuActive : true};
  }

  onMenuSwitch = () => {
    this.setState({ menuActive: !this.state.menuActive});
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ rootTheme }>
        <div className='container'>
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
                      <button className="menu-opt__button" onClick={ this.onMenuSwitch }>
                        <ActionHomeMenu/>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
             </nav>
             <div >
              <div className={ this.state.menuActive ? 'menu-panel active':'menu-panel'}>
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
          <div className={ this.state.menuActive ? 'page-layout root-menu-pinned':'page-layout'}>
            <header className="page-header-wrapper">
              <div className="page-header">
                <div className="page-header-group avatar-group">
                  <label className="avatar-label">
                    <img class="js-chat-header-avatar-image" height="48" width="48" src="https://avatars-01.gitter.im/group/iv/3/57542c12c43b8c601976fa66?s=48"/>
                  </label>
                </div>
                <div className="page-header-group info-group">
                  <div className="info-sub-heading">
                    <h1 className="info-heading">
                      <a href="https://github.com/gitterHQ/gitter" class="chat-header__title" target="_blank">gitterHQ/gitter</a>
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
            </header>
            <div className="page-content-wrapper">
              <div className="page-right-menu">
                <div className="right-menu">
                  <div className="menu-body">
                  </div>
                  <div className="menu-footer">
                  <svg className="toggle-icon" width="30px" height="34px" viewBox="0 0 30 34">
                    <path d="M0,6 l15,0 l15,0"></path>
                    <path d="M0,17 l15,0 l15,0"></path>
                    <path d="M0,28 l15,0 l15,0"></path>
                  </svg>
                  </div>
                </div>
              </div>
              <div className="page-content">
                <div className="content-body">
                  xx
                </div>
                <footer className="content-footer">
xx
                </footer>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};

export default App;
