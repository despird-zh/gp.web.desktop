import React, { Component, PropTypes } from 'react';

function getStyles(muiTheme){
  const {baseTheme:{palette}} = muiTheme;
  return {
    wrapper:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24
    },
    tipInfo: {
      color: palette.primary1Color
    }
  }
}

const LoadingPage = ({ muiTheme }) => {
  const styles = getStyles(muiTheme);
  return (<div className="page-wrapper" style={ styles.wrapper }>
    <span style={styles.tipInfo}><i className="fa fa-spinner fa-spin"></i> The page is loading...</span>
  </div>)
}

export default LoadingPage;