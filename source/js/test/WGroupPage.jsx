import React from 'react';
import PropTypes from 'prop-types';

import ActDeviceHub from 'material-ui/svg-icons/hardware/device-hub';
import ActCaseHub from 'material-ui/svg-icons/hardware/cast';
import ActCastCntHub from 'material-ui/svg-icons/hardware/cast-connected';
import ComunChat from 'material-ui/svg-icons/communication/chat';

import muiThemeable from 'material-ui/styles/muiThemeable';

import PageHeader from '../component/PageHeader';

const allPages = {
  gridlist: {
    path: '/wgroup/gridlist/',
    title: 'Workgroups',
    icon: <ActCastCntHub />,
    description: 'The work groups',
    visible: true,
    disabled: false,
  },
  topic: {
    path: '/wgroup/topic/',
    title: 'Topic',
    icon: <ActCastCntHub />,
    description: 'Review the information of System',
    visible: true,
    disabled: false,
  },
  bulletin: {
    path: '/wgroup/bulletin/',
    title: 'Bulletin',
    icon: <ComunChat />,
    description: 'Review the message of group',
    visible: true,
    disabled: false,
  },
  repo: {
    path: '/wgroup/repo/',
    title: 'Repository',
    icon: <ActCaseHub />,
    description: 'The content of workgroup repository ',
    visible: true,
    disabled: false,
  },
  topics: {
    path: '/wgroup/topics',
    title: 'Topics',
    icon: <ActDeviceHub />,
    description: 'Browse all the topics',
    visible: true,
    disabled: false,
  },
};

class WGroupPage extends React.Component {

  setVisible = (currentPage, pages) => {
    if (currentPage !== 'demo1') {
      //pages.demo1.visible = false; // eslint-disable-line
    }
  }

  render() {
    return (
      <PageHeader
        pages={ allPages }
        router={ this.props.router }
        muiTheme={ this.props.muiTheme }
        setVisible={ this.setVisible }
      >
        { this.props.children }
      </PageHeader>
    );
  }
}

WGroupPage.propTypes = {
  muiTheme: PropTypes.object,
  router: PropTypes.object,
  children: PropTypes.object,
};

export default muiThemeable()(WGroupPage);
