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
    colCode: {
      padding: 5,
      width:100,
      flexShrink:0, 
      flexGrow:0, 
      fontSize: 16
    },
    colSource: {
      padding: 5,
      fontSize: 16,
      flexShrink:1, 
      flexGrow:1, 
      width: 100,
      flexBasis:'0%'
    },
    colAbbr: {
      padding: 5,
      width:100,
      flexShrink:0, 
      flexGrow:0, 
      fontSize: 16
    }, 
    colState: {
      padding: 5,
      fontSize: 16,
      flexShrink:0, 
      flexGrow:0, 
      width:90
    }, 
    colDescr: {
      flexShrink:1, 
      flexGrow:1,
      flexBasis: '0%',
      width:100, 
      paddingRight: 5,
      fontSize: 16
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
    },
    colEllipsis: { 
      textDecoration: 'none', 
      display: 'block',
      padding: '1.5rem 0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'}
  };

  const headerCol = {
      color: palette.accent3Color,
      padding: '1.5rem 0.5rem',
      fontSize: 14
    };

  styles.colDescrHeader = Object.assign({}, styles.colDescr, headerCol);
  styles.colCodeHeader = Object.assign({}, styles.colCode, headerCol);
  styles.colSourceHeader = Object.assign({}, styles.colSource, headerCol);
  styles.colAbbrHeader = Object.assign({}, styles.colAbbr, headerCol);
  styles.colStateHeader = Object.assign({}, styles.colState, headerCol);
  styles.colActionHeader = Object.assign({}, styles.colAction, headerCol);

  return styles;
}

class SysSettingsList extends PureComponent {

  constructor(props){
    super(props);
    this.styles = getStyles(props.muiTheme);
  }

  render(){
    const { onRowEdit, entities } = this.props;
    const styles = this.styles;

    let rows = entities.map((data)=>{
      return (<RepoListRow key={`row-${data.source_id}`} rowData={data} styles={ styles } onRowEdit={onRowEdit}/>);
    });
    
    return (
      <div style={{flex:1, overflow:'hidden'}}>
        <div style={styles.rowStyle}>
          <div style={ styles.colCodeHeader }>
            Code
          </div>
          <div style={ styles.colSourceHeader }>
            Source Name
          </div>
          <div style={ styles.colAbbrHeader }>
            Abbr
          </div>
          <div style={ styles.colStateHeader }>State</div>
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
      <div style={ styles.colCode }>
        <span style={ styles.spanMiddlePre } ></span>
        <span style={ styles.spanMiddle }>
          {rowData.entity_code}
        </span>
      </div>
      <div style={ styles.colSource }>
        <span style={ styles.spanMiddlePre } ></span>
        <span style={ styles.spanMiddle }>
          {rowData.name}
        </span>
      </div>
      <div style={styles.colAbbr}>
        <span style={ styles.spanMiddlePre } ></span>
        <span style={ styles.spanMiddle }>
          { rowData.abbr }
        </span>
      </div>
      <div style={styles.colState}>
        <span style={ styles.spanMiddlePre } ></span>
        <span style={ styles.spanMiddle }>
          { rowData.state }
        </span>
      </div>
      <div style={styles.colDescr}>
        <span style={ Object.assign({}, styles.spanMiddle, styles.colEllipsis) }>
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