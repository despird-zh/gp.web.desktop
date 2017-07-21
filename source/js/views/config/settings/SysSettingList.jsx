import React, { PureComponent } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ImgEdit from 'material-ui/svg-icons/image/edit';

function getStyles(muiTheme) {
  const { baseTheme:{palette, spacing} } = muiTheme;
  const styles = {
    iconBtn: {
      width:40, 
      height:40,
      padding:5,
    },
    iconStyle:{
      color: palette.primary2Color
    },
    rowStyle:{
      paddingLeft:0, 
      display:'flex', 
      position: 'relative',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: palette.borderColor
    },
    colDescr: {
      flexShrink:1, 
      flexGrow:1,
      flexBasis: '0%',
      width:300, 
      paddingRight: 5,
      fontSize: 16
    },
    colGroup: {
      padding: 5,
      width:100,
      flexShrink:0, 
      flexGrow:0, 
      fontSize: 16
    },
    colKey: {
      padding: 5,
      width:190,
      flexShrink:0, 
      flexGrow:0, 
      fontSize: 16
    },
    colValue: {
      padding: 5,
      fontSize: 16,
      flexShrink:1, 
      flexGrow:1, 
      width: 190,
      flexBasis:'0%'
    }, 
    colAction: {
      padding: 5,
      fontSize: 16,
      flexShrink:0, 
      flexGrow:0, 
      width:60
    },
    rowIconStyle:{
      color: palette.primary2Color,
      verticalAlign:'middle'
    },
    smallIconStyle:{
      color: palette.primary2Color,
      width:18,
      height:18
    },
    spanMiddlePre:{
      height: '100%',
      display: 'inline-block',  
      verticalAlign: 'middle'
    },
    spanMiddle:{
      display: 'inline-block',  
      verticalAlign: 'middle'
    }
  };

  const headerCol = {
      color: palette.accent3Color,
      padding: '1.5rem 0.5rem',
      fontSize: 14
    };

  styles.colDescrHeader = Object.assign({}, styles.colDescr, headerCol);
  styles.colGroupHeader = Object.assign({}, styles.colGroup, headerCol);
  styles.colKeyHeader = Object.assign({}, styles.colKey, headerCol);
  styles.colValueHeader = Object.assign({}, styles.colValue, headerCol);
  styles.colActionHeader = Object.assign({}, styles.colAction, headerCol);

  return styles;
}

class SysSettingsList extends PureComponent {

  constructor(props){
    super(props);
    this.styles = getStyles(props.muiTheme);
  }

  render(){
    const { onRowEdit, settings } = this.props;
    const styles = this.styles;

    let rows = settings.map((data)=>{
      return (<RepoListRow key={`row-${data.option_id}`} rowData={data} styles={ styles } onRowEdit={onRowEdit}/>);
    });
    
    return (
      <div style={{flex:1, overflow:'hidden'}}>
        <div style={styles.rowStyle}>
          <div style={ styles.colGroupHeader }>
            Group Name
          </div>
          <div style={ styles.colKeyHeader }>
            Setting Key
          </div>
          <div style={ styles.colValueHeader }>Value</div>
          <div style={ styles.colDescrHeader }>Description</div>
          <div style={ styles.colActionHeader }>Action</div>
        </div>
        <Scrollbars style={{ height: 'calc( 100% - 5.8rem)' }}
          autoHide={true}
          autoHideTimeout={1000}
          autoHideDuration={200}>
          <ul style={{marginLeft:0, padding:0}}>
            { rows }
          </ul>
         </Scrollbars>
      </div>
    );
  };
}

const RepoListRow = ({ rowData, styles, onRowEdit}) => {

  const handleRowEdit = () => {
    onRowEdit(rowData);
  };

  return (
    <li style={ styles.rowStyle }>
      <div style={ styles.colGroup }>
        <span style={ styles.spanMiddlePre } ></span>
        <span style={ styles.spanMiddle }>
          {rowData.group}
        </span>
      </div>
      <div style={ styles.colKey }>
        <span style={ styles.spanMiddlePre } ></span>
        <span style={ styles.spanMiddle }>
          {rowData.option}
        </span>
      </div>
      <div style={styles.colValue}>
        <span style={ styles.spanMiddlePre } ></span>
        <span style={ styles.spanMiddle }>
          { rowData.value }
        </span>
      </div>
      <div style={styles.colDescr}>
        <span style={ styles.spanMiddlePre } ></span>
        <span style={ styles.spanMiddle }>
          { rowData.description }
        </span>
      </div>
      <div style={styles.colAction}>
        <IconButton iconStyle={ styles.iconStyle } onTouchTap={handleRowEdit} 
            style={styles.iconBtn} >
          <ImgEdit/>
        </IconButton>
      </div>
    </li>
  );
};

export default SysSettingsList;