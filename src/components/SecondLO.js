import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";
import FontIcon from "material-ui/FontIcon";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import { Grid } from "@material-ui/core";
import { SnackbarProvider, useSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import RaisedButton from "material-ui/RaisedButton";
import DateFnsUtils from "@date-io/date-fns";
import FormLabel from "@material-ui/core/FormLabel";
import Divider from "@material-ui/core/Divider";
import { numberWithCommas } from "../utils/utils";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

export class SecondLO extends Component {
  state = { percent2Error: "", flatFee2Error: "" };

  validate_SecondLO = () => {
    let isErr = false;
    const errors = {
      percent2Error: "",
      flatFee2Error: "",
    };
    console.log(this.props.values.paymentAmountTemp);
    if (this.props.values.twoLOs === true) {
      // validate two LOS with flat fee
      if (
        (this.props.values.flatFeeOrPercent2 === "flat_fee" &&
          this.props.values.flatFee2 === null) ||
        (this.props.values.flatFeeOrPercent2 === "flat_fee" &&
          this.props.values.flatFee2 >= this.props.values.paymentAmountTemp)
      ) {
        isErr = true;
        errors.flatFee2Error = "invalid Flat Fee";
      }
      if (
        // validate two LOS with percent
        (this.props.values.flatFeeOrPercent2 === "percent" &&
          this.props.values.percent2 > 99.99) ||
        (this.props.values.flatFeeOrPercent2 === "percent" &&
          this.props.values.percent2 === null)
      ) {
        console.log("inside percent");
        isErr = true;
        errors.percent2Error = "invalid Percent";
      }
    }

    // return the error state
    if (isErr) {
      this.setState({
        ...this.state,
        ...errors,
      });
    }
    return isErr;
  };
  updatePayment2 = (e) => {
    e.preventDefault();
    //validate
    const err = this.validate_SecondLO();
    if (!err) {
      console.log("no error");
      console.log("payment amount:" + this.props.values.paymentAmount);
      this.props.updatePayment2();
    }
  };
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  handleSwitch = (input) => (e) => {
    console.log("input= " + input + " target= " + e.target.checked);
    this.setState({ [input]: e.target.checked });
    console.log(e.target.checked);
  };

  handleNothing = () => {};

  handleClose = (event, reason) => {
    console.log("inside handle close ");
    if (reason === "clickaway") {
      return;
    }
    const { wired } = this.props.values.wired;

    const { warningMessage } = this.state;
    console.log("the warning boolean= " + warningMessage);

    this.setState({
      wired: true,
    });
  };
  /**?step: 1,
    firstName: "",
    lastName: "",
    email: "",
    companyBranch: "",
    //---step 2
    loanNumber: "", 
    escrowNumber: "",
    loanAmount: "",
    fundedDate: "",
    processor: "",
    escrowCompany: "",
    lenderName: "",
    borrowers: "",
    propertyAddress: "",
    amountCheck: "",
    wired: true, // this wired is for amount OF CHECK
    //step 3
    typeOfLoan: "",
    transaction: "",
    correspondent: "",
    correspondentCompany: "",
    state: "",
    //step 4
     // step 5
      loanOfficer: "",
      flatFeeOrPercent: "",
      flatFee: "",
      businessName: "",
      percent: "",
      paymentTypeWired: false,
      paymentAmount: "",
    
    get values and pass them along the components
    */
  render() {
    const { values, handleChange } = this.props;

    return (
      <MuiThemeProvider>
        <React.Fragment>
          {/*second LO -------------------------------------------------->*/}
          {/*second LO -------------------------------------------------->*/}
          <Grid item xs={12}>
            <Typography component='h6' variant='h6' align='center'>
              Second Loan Officer
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              hint='Enter the LO #2'
              floatingLabelText='LO #2'
              onChange={handleChange("loanOfficer2")}
              defaultValue={values.loanOfficer2}
            />
          </Grid>
          <br />
          <Grid item xs={12} md={6}>
            <TextField
              hint='Enter Business Name'
              floatingLabelText='Business Name'
              onChange={handleChange("businessName2")}
              defaultValue={values.businessName2}
            />
          </Grid>
          <br />
          <Grid item xs={12}>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>Flat Fee or Percent</FormLabel>
              <RadioGroup
                aria-label='flat-fee-or-percent'
                name='flatFeeOrPercent2'
                value={values.flatFeeOrPercent2}
                onChange={handleChange("flatFeeOrPercent2")}
              >
                <FormControlLabel
                  value='flat_fee'
                  control={<Radio />}
                  label='Flat Fee'
                />
                <FormControlLabel
                  value='percent'
                  control={<Radio />}
                  label='Percent'
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <br />
          <Grid item xs={12} md={6}>
            {values.flatFeeOrPercent2 === "flat_fee" ? (
              <TextField
                errorText={this.state.flatFee2Error}
                type='number'
                hint='Enter Flat Fee'
                floatingLabelText='Flat Fee'
                onChange={handleChange("flatFee2")}
                value={values.flatFee2}
              />
            ) : (
              <TextField
                errorText={this.state.percent2Error}
                type='number'
                hint='Enter Percent'
                floatingLabelText='Percent'
                onChange={handleChange("percent2")}
                value={values.percent2}
              />
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <List component='nav'>
              <ListItemText
                primary={"Payment Amount"}
                secondary={numberWithCommas(values.paymentAmount2)}
              />
            </List>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant='contained'
              color='secondary'
              onClick={this.updatePayment2}
            >
              Update Payment Amount
            </Button>
          </Grid>

          <br />
          <Grid item xs={12}>
            <Typography component='p' variant='p' align='center'>
              Choose your Payment Preference.
            </Typography>
            <br />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginLeft: "8rem",
                marginRight: "8rem",
              }}
            >
              <Icon color='secondary' fontSize='small'>
                mail
              </Icon>
              Mailed
              <FormControlLabel
                control={
                  <Switch
                    checked={values.paymentTypeWired2}
                    color='primary'
                    onChange={handleChange("paymentTypeWired2")}
                    name='paymentTypeWired2'
                  />
                }
                label='Wired'
              />
              <Icon color='primary' fontSize='small'>
                laptop
              </Icon>
            </div>
          </Grid>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default SecondLO;
