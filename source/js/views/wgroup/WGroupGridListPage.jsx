import React from 'react';
import PropTypes from 'prop-types';

import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/IconButton';
import ActViewList from 'material-ui/svg-icons/action/view-list';
import ActViewModule from 'material-ui/svg-icons/action/view-module';

import AuthConnect from '../component/AuthConnect';

function getStyles(muiTheme) {
  const { baseTheme:{ palette } } = muiTheme;

  return {
    root: {
      display: 'flex',
      position: 'relative',
      marginTop: 10,
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    iconBtn: {
      color: palette.primary2Color,
    },
    gridList: {
      width: '100%',
      overflowY: 'auto',
    },
  };
}

const tilesData = [
  {
    img: 'assets/img/flower-demo.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'assets/img/flower-demo.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: 'assets/img/flower-demo.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'assets/img/flower-demo.jpg',
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: 'assets/img/flower-demo.jpg',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'assets/img/flower-demo.jpg',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: 'assets/img/flower-demo.jpg',
    title: 'Vegetables',
    author: 'Maryland',
  },
  {
    img: 'assets/img/flower-demo.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
];

class WGroupGridListPage extends React.Component {

  constructor(props) {
    super(props);
    console.log(props)
    this.state = { profileExpand: false };
    this.styles = getStyles(props.muiTheme);
  }

  componentWillMount() {
    if (this.props.setCurrentPage) { this.props.setCurrentPage('gridlist'); }
  }

  componentDidMount() {
    const styles = this.styles;
    const buttons = [
      <IconButton key="bookmark" iconStyle={ styles.iconBtn } onTouchTap={ this.test }>
        <ActViewList />
      </IconButton>,
      <IconButton key="track" iconStyle={ styles.iconBtn } onTouchTap={ this.test }>
        <ActViewModule />
      </IconButton>
      ];
    if (this.props.setCurrentPage) {
      this.props.setCurrentPage('gridlist', { buttons });
    }
  }

  test = () => {
    console.log('-==-')
  }

  render() {
    const styles = this.styles;

    return (
      <div style={ styles.root }>
        <GridList
          cellHeight={140}
          style={styles.gridList}
          cols={5}
          padding={15}
        >
          <Subheader>December</Subheader>
          {tilesData.map((tile) => (
            <GridTile
              key={tile.author}
              title={tile.title}
              subtitle={<span>by <b>{tile.author}</b></span>}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            >
              <img src={tile.img} />
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

WGroupGridListPage.propTypes = {
  setCurrentPage: PropTypes.func,
  muiTheme: PropTypes.object,
};

const NewComponent = AuthConnect(
  WGroupGridListPage,
  (state) => ({
    wgrouplist: state.wgroup.get('wgrouplist'),
  }),
  { });

export default NewComponent;