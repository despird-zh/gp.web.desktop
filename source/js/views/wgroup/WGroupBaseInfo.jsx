import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import ContentSave from 'material-ui/svg-icons/content/save';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Step,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import EditorInsPhoto from 'material-ui/svg-icons/editor/insert-photo';
import FlatButton from 'material-ui/FlatButton';

import Stepper from '../mui-ext/Stepper';
import AvatarEditDialog from '../component/imgeditor/AvatarEditDialog';

function getStyles(muiTheme) {
  const { baseTheme: { spacing, palette } } = muiTheme;
  return {
    topContainer: {
      display: 'flex',
      marginTop: -14,
    },
    container: {
      display: 'flex',
    },
    left: {
      marginRight: spacing.desktopGutter,
      flexBasis: '50%',
      display: 'block'
    },
    right: {
      flexBasis: '50%',
    },
    panelTitle: {
      color: palette.secondaryTextColor,
      fontSize: 16,
      marginBottom: 5,
      textRendering: 'optimizeLegibility',
      boxSizing:'border-box',
      maxWidth: '90%',
      margin: 0,
      overflow: 'hidden',
      fontWeight: 400,
      fontSize: '1.5rem',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      textTransform: 'uppercase',
      padding: '0 0 0 1.6rem',
      lineHeight: '5.5rem',
    },
    inputItem: {
      width: '50%',
      marginLeft: spacing.desktopGutterMini,
      marginRight: spacing.desktopGutterMini,
    },
    avatarCard: {
      height: 70,
      width: 70,
      marginTop: 20,
      marginRight: 20,
      marginLeft: 10,
      marginBottom: 10,
      textAlign: 'center',
      display: 'inline-block',
    },
  };
}
class WGroupBaseInfo extends Component {

  constructor(props, context) {
    super(props, context);
    this.styles = getStyles(props.muiTheme);
    this.state = {
      finished: false,
      stepIndex: 0,
    };
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  onAvatarOpen = () => {};
  onAvatarSave = () => {};
  renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const {finished, stepIndex} = this.state;
    const {errtips, muiTheme} = this.props;
    const styles = getStyles(muiTheme);
    
    return (
      <div style={ this.props.style }>
        <h3 style={ styles.panelTitle }>Workgroup Information</h3>
        <Divider />
        <div style={ styles.topContainer }>
          <TextField
            style={ styles.inputItem }
            hintText='16 letters'
            floatingLabelText='Account'
            errorText={ errtips.account }
          />
          <TextField
            style={ styles.inputItem }
            hintText='no more than 32 letters'
            errorText={ errtips['full-name'] }
            floatingLabelText='Group Name'
          />
        </div>
        <div style={ { display: 'flex' } }>
          <TextField
            style={ styles.inputItem }
            hintText='16 letters'
            floatingLabelText='Description'
            multiLine={true}
            rows={2}
            errorText={ errtips.account }/>
          <Paper style={ styles.avatarCard } zDepth={ 1 }>
            <img src='assets/img/book2.jpg' style={{ width: 70, height: 70, borderRadius: 5}} />
          </Paper>
          <div style={ { display: 'flex', flexDirection: 'column-reverse', width: 40 } }>
            <FloatingActionButton mini={true} style={ { marginBottom: 10 } } onTouchTap={ this.onAvatarOpen } >
              <EditorInsPhoto />
            </FloatingActionButton>
          </div>
          <AvatarEditDialog ref={ this.props.setEditorRef } onSave={ this.onAvatarSave } />
        </div>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Manage & Control</StepLabel>
            <StepContent>
              <div style={ styles.topContainer }>
                <TextField
                  style={ styles.inputItem }
                  hintText='16 letters'
                  floatingLabelText='Manager'
                  errorText={ errtips.account }
                />
                <TextField
                  style={ styles.inputItem }
                  hintText='no more than 32 letters'
                  errorText={ errtips['full-name'] }
                  floatingLabelText='Administrator'
                />
              </div>
              <div style={ styles.container }>
                <TextField
                  style={ styles.inputItem }
                  hintText='16 letters'
                  floatingLabelText='Organization'
                  errorText={ errtips.account }
                />
                <TextField
                  style={ styles.inputItem }
                  hintText='no more than 32 letters'
                  errorText={ errtips['full-name'] }
                  floatingLabelText='State'
                />
              </div>
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Create an ad group</StepLabel>
            <StepContent>
              <div style={ { display: 'flex', flexDirection: 'row' } }>
                <Toggle
                  label='Topic on/off'
                  style={ { width: '33.3%', marginTop: 10, paddingRight: 30, paddingLeft: 10 } }
                />
                <Toggle
                  label='Share on/off'
                  style={ { width: '33.3%', marginTop: 10, paddingRight: 30, paddingLeft: 10 } }
                />
                <Toggle
                  label='Link on/off'
                  style={ { width: '33.3%', marginTop: 10, paddingRight: 30, paddingLeft: 10 } }
                />
              </div>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Create an ad</StepLabel>
            <StepContent>
              <div style={ styles.topContainer }>
                <TextField
                  style={ styles.inputItem }
                  hintText='16 letters'
                  floatingLabelText='Storage'
                  inputStyle={{marginTop:0}}
                  errorText={ errtips.account }
                />
                <TextField
                  style={ styles.inputItem }
                  hintText='no more than 32 letters'
                  errorText={ errtips['full-name'] }
                  inputStyle={{marginTop:0}}
                  floatingLabelText='State'
                />
              </div>
              <div style={ styles.container }>
                <Toggle
                  label='Public Cabinet on/off'
                  style={ { width: '50%', marginTop: 40, paddingRight: 30, paddingLeft: 10 } }
                />
                <TextField
                  style={ styles.inputItem }
                  hintText='no more than 32 letters'
                  errorText={ errtips['full-name'] }
                  floatingLabelText='capacity'
                />
              </div>
              <div style={ styles.container }>
                <Toggle
                  label='Private Cabinet on/off'
                  style={ { width: '50%', marginTop: 40, paddingRight: 30, paddingLeft: 10 } }
                />
                <TextField
                  style={ styles.inputItem }
                  hintText='no more than 32 letters'
                  errorText={ errtips['full-name'] }
                  floatingLabelText='capacity'
                />
              </div>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <p style={{margin: '20px 0', textAlign: 'center'}}>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        )}
      </div>
    );
  }
}

export default WGroupBaseInfo;