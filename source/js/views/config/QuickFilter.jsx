import React, { PureComponent, PropTypes } from 'react';
import Divider from 'material-ui/Divider';

import Chip from '../mui-ext/Chip';

function getStyles(muiTheme) {
  const { baseTheme:{palette} } = muiTheme;
  return {
    chipItem: {
      marginBottom: '1rem', 
      marginRight:'1rem',
    },
  };
}
class QuickFilter extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      valids:[],
      invalids:[
        {
          chipLabel:'Basic Setting',
          chipValue:'BASIC'
        },
        {
          chipLabel:'Security Group',
          chipValue:'SECURITY'
        },
        {
          chipLabel:'Capacity Group',
          chipValue:'CAPACITY'
        },
        {
          chipLabel:'Network Group',
          chipValue:'NETWORK'
        }
      ]
    };
    this.styles = getStyles(props.muiTheme);
  }

  handleAddFilter = (value) => {

    let { valids, invalids } = this.state;
    let idx = invalids.findIndex(c => c.chipValue === value);
    let item = invalids.splice(idx, 1);

    valids.push(item[0]);
    this.setState({
      valids: [].concat(valids),
      invalids: [].concat(invalids)
    });
  }

  handleDelFilter = (value) => {

    let { valids, invalids } = this.state;
    let idx = valids.findIndex(c => c.chipValue === value);
    let item = valids.splice(idx, 1);
    invalids.push(item[0]);

    this.setState({
      valids: [].concat(valids),
      invalids: [].concat(invalids)
    });
  }

  render(){

    const styles = this.styles;
    console.log(this.state);
    const validChips = this.state.valids.map( (item) => 
      (  <ChipItem key={`chip-${item.chipValue}`} onRequestDelete={this.handleDelFilter} 
        chipLabel={item.chipLabel}
        chipValue={item.chipValue}
        style={styles.chipItem} />
      )
    );

    const invalidChips = this.state.invalids.map( (item) => (
        <ChipItem key={`chip-${item.chipValue}`} onRequestAdd={this.handleAddFilter} 
        chipLabel={item.chipLabel}
        chipValue={item.chipValue}
        style={styles.chipItem} />
      )
    );

    return (
    <div style={{padding:'0 1.5rem'}}>
      <div style={{display: 'flex',flexWrap: 'wrap'}}>
        {validChips}
      </div>
      <Divider style={{marginBottom:10}}/>
      <div style={{display: 'flex',flexWrap: 'wrap'}}>
        {invalidChips}
      </div>
    </div>
    );
  }
}

const ChipItem = ({ onRequestAdd, onRequestDelete, chipLabel, chipValue, ...rest }) => {

  const handleAdd = ()=>{
    onRequestAdd(chipValue);
  }

  const handleDel = () => {
    onRequestDelete(chipValue);
  }

  const chipItem = (onRequestAdd) ? 
      <Chip
        onRequestAdd={handleAdd}
        {...rest}>
        {chipLabel}
      </Chip> :
      <Chip
        onRequestDelete={handleDel}
        {...rest}>
        {chipLabel}
      </Chip>;

  return chipItem;
}
export default QuickFilter;