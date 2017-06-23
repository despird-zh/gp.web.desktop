import React from 'react';
import PropTypes from 'prop-types';

class RootMenuBar extends React.Component {

  render() {
    return (
      <div style={ this.props.style } className='content'>
        1dp
      </div>
    );
  }
}


RootMenuBar.propTypes = {
  style: PropTypes.object,
  muiTheme: PropTypes.object,
};

export default RootMenuBar;
