import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

function getStyles(muiTheme) {
  const { baseTheme:{palette} } = muiTheme;
  return {
    staticText:{
      color:palette.secondaryTextColor
    }
  };
}

class SysSettingInfo extends PureComponent {

    constructor(props){
      super(props);
      this.styles = getStyles(props.muiTheme);
      this.state = {
        option_id:'',
        option:'',
        group:'',
        value: '',
        description:''
      };
    }

    handleChange = (event, newVal) => {
      let _state = {};
      _state[event.target.name] = newVal;
      this.setState(_state);
    };

    handleGroupChange = (event, index, newVal) => {
      this.setState({group: newVal});
    };

    componentWillReceiveProps(newProps){

      if(newProps.setting)
        this.setState(newProps.setting);
    }

    render(){
      return (<div className="menu-body" style={{padding:'0 1.5rem 0'}}>
        <TextField
          disabled={true}
          fullWidth={true}
          hintText="Disabled Hint Text"
          value={this.state.option}
          inputStyle={this.styles.staticText}
          floatingLabelText="Floating Label Text"/>
        <SelectField
          floatingLabelFixed={true}
          floatingLabelText="Category"
          value={this.state.group}
          hintText="Select category of setting"
          fullWidth={true}
          onChange={this.handleGroupChange}>
          <MenuItem value={'CAPACITY'} primaryText="Capacity" />
          <MenuItem value={'BASIC'} primaryText="Basic" />
          <MenuItem value={'SECURITY'} primaryText="Security" />
          <MenuItem value={'NETWORK'} primaryText="Network" />
          <MenuItem value={'SYNC'} primaryText="Sync Ext" />
        </SelectField>
        <TextField
          fullWidth={true}
          hintText="the value setting Text"
          value={this.state.value}
          name={'value'}
          onChange={this.handleChange}
          floatingLabelText="The setting value"
          floatingLabelFixed={true}/>
        <TextField
          fullWidth={true}
          hintText="Disabled Hint Text"
          value={this.state.description}
          onChange={this.handleChange}
          name={'description'}
          floatingLabelText="Floating Label Text"
          floatingLabelFixed={true}/>
      </div>)
    }
}

SysSettingInfo.propTypes = {
  muiTheme: PropTypes.object,
};

export default SysSettingInfo;