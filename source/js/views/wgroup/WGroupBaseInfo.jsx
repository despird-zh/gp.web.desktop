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

import FlatButton from 'material-ui/FlatButton';

import Stepper from '../mui-ext/Stepper';
import AvatarEditDialog from '../component/imgeditor/AvatarEditDialog';

function getStyles(muiTheme) {
  const { baseTheme: { spacing, palette } } = muiTheme;
  return {
    container: {
      display: 'flex',
      marginTop: spacing.desktopGutterMini,
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
      color: '#a2a3a3'
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

    return (
      <div style={ this.props.style }>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Select campaign settings</StepLabel>
            <StepContent>
              <p>
                For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.
              </p>
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Create an ad group</StepLabel>
            <StepContent>
              <p>An ad group contains one or more ads which target a shared set of keywords.</p>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Create an ad</StepLabel>
            <StepContent>
              <p>
                Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.
              </p>
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