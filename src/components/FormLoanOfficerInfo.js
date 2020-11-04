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
import SecondLO from "./SecondLO";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { numberWithCommas } from "../utils/utils";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Slide from "@material-ui/core/Slide";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
function TransitionDown(props) {
  return <Slide {...props} direction='down' />;
}
export class FormLoanOfficerInfo extends Component {
  state = {
    open: true,
    transition: null,
    loanOfficerError: "",
    businessNameError: "",
    percentError: "",
    flatFeeError: "",
    //lo2
    loanOfficer2Error: "",
    flatFee2Error: "",
    businessName2Error: "",
    percent2Error: "",
  };

  validate2 = () => {
    // -- validate2() validating updatePayment() -------
    let isErr = false;
    const errors = {
      percentError: "",
      flatFeeError: "",
      percent2Error: "",
      flatFee2Error: "",
    };
    if (
      // 1 lo %%% Percent scenario 1 Lo by itself
      (this.props.values.flatFeeOrPercent === "percent" &&
        this.props.values.percent > 99.99) ||
      (this.props.values.flatFeeOrPercent === "percent" &&
        this.props.values.percent === null)
    ) {
      isErr = true;
      errors.percentError = "invalid Percent";
    }

    const { additionalCharge } = this.props.values.additionalCharge;
    const { amountCheck } = this.props.values.amountCheck;

    var sumTotal = this.props.values.additionalCharge.reduce(function (
      prev,
      cur
    ) {
      return prev + cur.amount;
    },
    0);
    const total = this.props.values.amountCheck + sumTotal;
    if (
      // if Lo 1 is flat fee
      (this.props.values.flatFeeOrPercent === "flat_fee" &&
        this.props.values.flatFee === null) ||
      (this.props.values.flatFeeOrPercent === "flat_fee" &&
        this.props.values.flatFee >= total)
    ) {
      isErr = true;
      errors.flatFeeError = "invalid Flat Fee";
    }
    /*
    // validate two LOS if switch is on
    if (this.props.twoLOs) {
      // validate two LOS with flat fee
      if (
        (this.props.values.flatFeeOrPercent2 === "flat_fee" &&
          this.props.values.flatFee2 === null) ||
        (this.props.values.flatFeeOrPercent2 === "flat_fee" &&
          this.props.values.flatFee >= this.props.values.paymentAmount)
      ) {
        isErr = true;
        errors.flatFee2Error = "invalid Flat Fee";
      }
      if (
        // validate two LOS with percent
        (this.props.values.flatFeeOrPercent === "percent" &&
          this.props.values.percent > 99.99) ||
        (this.props.values.flatFeeOrPercent === "percent" &&
          this.props.values.percent === null)
      ) {
        isErr = true;
        errors.percent2Error = "invalid Percent";
      }
    }*/

    // return the error state
    if (isErr) {
      this.setState({
        ...this.state,
        ...errors,
      });
    }
    return isErr;
  }; // ------------------    end of validate2() --------------
  /*validate_SecondLO = () => {
    if (this.props.twoLOs) {
      // validate two LOS with flat fee
      if (
        (this.props.values.flatFeeOrPercent2 === "flat_fee" &&
          this.props.values.flatFee2 === null) ||
        (this.props.values.flatFeeOrPercent2 === "flat_fee" &&
          this.props.values.flatFee >= this.props.values.paymentAmount)
      ) {
        isErr = true;
        errors.flatFee2Error = "invalid Flat Fee";
      }
      if (
        // validate two LOS with percent
        (this.props.values.flatFeeOrPercent === "percent" &&
          this.props.values.percent > 99.99) ||
        (this.props.values.flatFeeOrPercent === "percent" &&
          this.props.values.percent === null)
      ) {
        isErr = true;
        errors.percent2Error = "invalid Percent";
      }
    }
  };*/
  validate = () => {
    let isErr = false;

    var sumTotal = this.props.values.additionalCharge.reduce(function (
      prev,
      cur
    ) {
      return prev + cur.amount;
    },
    0);
    const total = this.props.values.amountCheck + sumTotal;
    const errors = {
      //lo2

      loanOfficer2Error: "",
      flatFeeOrPercent2Error: "",
      flatFee2Error: "",
      businessName2Error: "",
      percent2Error: "",
      paymentAmount2Error: "",
      //lo1
      loanOfficerError: "",
      businessNameError: "",
      percentError: "",
      paymentAmountError: "",
      flatFeeError: "",
    };
    if (this.props.values.loanOfficer === "") {
      isErr = true;
      errors.loanOfficerError = "Enter Loan Officer#1 Full Name";
    }
    if (this.props.values.businessName === "") {
      isErr = true;
      errors.businessNameError = "Enter Business Name";
    }
    if (
      (this.props.values.flatFeeOrPercent === "percent" &&
        this.props.values.percent > 99.99) ||
      (this.props.values.flatFeeOrPercent === "percent" &&
        this.props.values.percent === null)
    ) {
      isErr = true;
      errors.percentError = "invalid Percent";
    }
    if (
      this.props.values.flatFeeOrPercent === "flat_fee" &&
      this.props.values.flatFee === null
    ) {
      isErr = true;
      errors.flatFeeError = "invalid Flat Fee";
    }
    if (
      // if Lo 1 is flat fee
      (this.props.values.flatFeeOrPercent === "flat_fee" &&
        this.props.values.flatFee === null) ||
      (this.props.values.flatFeeOrPercent === "flat_fee" &&
        this.props.values.flatFee >= total)
    ) {
      isErr = true;
      errors.flatFeeError = "invalid Flat Fee";
    }
    if (isErr) {
      this.setState({
        ...this.state,
        ...errors,
      });
    }
    return isErr;
  }; // end validate()  ---------------------------------

  handleClose = (e) => {
    this.setState({ open: false });
  };
  updatePayment = (e) => {
    e.preventDefault();
    //validate
    const err = this.validate2();
    if (!err) {
      this.props.updatePayment();
      this.setState({ percentError: "", flatFeeError: "" });
    }
  };
  continue = (e) => {
    e.preventDefault();
    console.log(this.props.values.fundedDate);

    console.log(this.props.values.twoLOs);
    const err = this.validate();
    if (!err) {
      this.props.nextStep();
    }
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
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
    const { open } = this.state;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <Grid item xs={12}>
            <Typography component='h5' variant='h5' align='center'>
              LO(s) Info
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component='h6' variant='h6' align='center'>
              First Loan Officer
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              errorText={this.state.loanOfficerError}
              id='input-with-icon-textfield'
              hint='Enter the LO #1'
              floatingLabelText='LO #1'
              onChange={handleChange("loanOfficer")}
              defaultValue={values.loanOfficer}
            />
          </Grid>
          <br />
          <Grid item xs={12} md={6}>
            <TextField
              errorText={this.state.businessNameError}
              hint='Enter Business Name'
              floatingLabelText='Business Name'
              onChange={handleChange("businessName")}
              defaultValue={values.businessName}
            />
          </Grid>
          <br />
          <Grid item xs={12}>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>Flat Fee or Percent</FormLabel>
              <RadioGroup
                aria-label='flat-fee-or-percent'
                name='flatFeeOrPercent'
                value={values.flatFeeOrPercent}
                onChange={handleChange("flatFeeOrPercent")}
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
            {values.flatFeeOrPercent === "flat_fee" ? (
              <TextField
                errorText={this.state.flatFeeError}
                type='number'
                hint='Enter Flat Fee'
                floatingLabelText='Flat Fee'
                onChange={handleChange("flatFee")}
                value={values.flatFee}
              />
            ) : (
              <TextField
                errorText={this.state.percentError}
                type='number'
                hint='Enter Percent'
                floatingLabelText='Percent'
                onChange={handleChange("percent")}
                value={values.percent}
              />
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <List component='nav'>
              <ListItemText
                primary={"Payment Amount"}
                secondary={
                  values.paymentAmount !== null
                    ? numberWithCommas(values.paymentAmount)
                    : 0
                }
              />
            </List>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant='contained'
              color='secondary'
              onClick={this.updatePayment}
            >
              Update Payment Amount
            </Button>
          </Grid>

          <br />
          <Grid item xs={12}>
            Choose your Payment Preference.
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
                    checked={values.paymentTypeWired}
                    onChange={handleChange("paymentTypeWired")}
                    name='paymentTypeWired'
                    color='primary'
                  />
                }
                label='Wired'
              />
              <Icon color='primary' fontSize='small'>
                laptop
              </Icon>
            </div>
          </Grid>

          <br />

          {/* showing other LO if switch is on */}
          <Grid item xs={12}>
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
                person
              </Icon>
              one LO
              <FormControlLabel
                control={
                  <Switch
                    checked={values.twoLOs}
                    onChange={handleChange("twoLOs")}
                    name='paymentTypeWired'
                    color='primary'
                  />
                }
                label='two LOs'
              />
              <Icon color='primary' fontSize='small'>
                group
              </Icon>
            </div>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>
          {/*second LO -------------------------------------------------->*/}
          {values.twoLOs === true ? (
            <SecondLO
              values={this.props.values}
              handleChange={this.props.handleChange}
              updatePayment={this.props.updatePayment}
              updatePayment2={this.props.updatePayment2}
            />
          ) : (
            <p></p>
          )}

          <Grid item xs={6} md={6}>
            <Button variant='contained' color='secondary' onClick={this.back}>
              Back
            </Button>
          </Grid>
          <Grid item xs={6} md={6}>
            <Button variant='contained' color='primary' onClick={this.continue}>
              Continue
            </Button>
          </Grid>
          <Snackbar
            open={open}
            onClose={this.handleClose}
            TransitionComponent={TransitionDown}
            message={
              "After Flat Fee or Percent input change, UPDATE PAYMENT AMOUNT.  If you go back and add charges, also update 'Payment Amount'. If there are two LOs, Update LO 1 first THEN LO 2."
            }
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default FormLoanOfficerInfo;
