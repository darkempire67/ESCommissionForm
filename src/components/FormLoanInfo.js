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
import Tooltip from "@material-ui/core/Tooltip";
import { InputAdornment } from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

export class FormLoanInfo extends Component {
  state = {
    open: false,
    loanNumberError: "",
    escrowNumberError: "",
    loanAmountError: "",
    fundedDateError: "",
    processorError: "",
    escrowCompanyError: "",
    lenderNameError: "",
    borrowersError: "",
    propertyAddressError: "",
    amountCheckError: "",
  };

  validate = () => {
    let isErr = false;
    const errors = {
      loanNumberError: "",
      escrowNumberError: "",
      loanAmountError: "",
      fundedDateError: "",
      processorError: "",
      escrowCompanyError: "",
      lenderNameError: "",
      borrowersError: "",
      propertyAddressError: "",
      amountCheckError: "",
    };
    var numbers = /^[0-9]+$/;
    if (this.props.values.loanNumber === "") {
      isErr = true;
      errors.loanNumberError = "Provide Loan Number";
    }
    if (this.props.values.escrowNumber === "") {
      isErr = true;
      errors.escrowNumberError = "Provide Escrow Number";
    }
    if (!numbers.test(this.props.values.loanAmount)) {
      isErr = true;
      errors.loanAmountError = "Enter Numbers only";
    }
    if (this.props.values.fundedDate === null) {
      isErr = true;
      errors.fundedDateError = "Date is empty";
    }
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;

    if (
      this.props.values.processor === "" ||
      regName.test(!this.props.values.processor)
    ) {
      isErr = true;
      errors.processorError =
        "Input Processor full-Name or Select from the dropdown.";
    }

    if (this.props.values.escrowCompany === "") {
      isErr = true;
      errors.escrowCompanyError = "Provide Escrow Company Name";
    }
    if (this.props.values.lenderName === "") {
      isErr = true;
      errors.lenderNameError = "Provide Lender Name";
    }
    if (this.props.values.borrowers === "") {
      isErr = true;
      errors.borrowersError = "Provide Borrower(s) name";
    }
    if (this.props.values.propertyAddress === "") {
      isErr = true;
      errors.propertyAddressError = "Provide Property Address";
    }
    if (!numbers.test(this.props.values.amountCheck)) {
      isErr = true;
      errors.amountCheckError = "Enter Numbers only please";
    }

    if (isErr) {
      this.setState({
        ...this.state,
        ...errors,
      });
    }
    return isErr; // ---------- end of validate - ---------------------
  };
  twoCalls = (e) => {
    this.props.handleChange("AmountOfCheckWired")(e);
    this.setState({ open: e.target.checked });
  };
  handleClose = (e) => {
    this.setState({ open: false });
  };
  continue = (e) => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.nextStep();
    }
  };

  //-------back------------
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleNothing = () => {};

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
    
    get values and pass them along the components
    */
  render() {
    const { values, handleChange } = this.props;
    function Alert(props) {
      return <MuiAlert elevation={6} variant='filled' {...props} />;
    }
    const { open } = this.state;
    const long_title =
      "Please enter the sum of check, origination points, rebate, SRP, and any income above regular admin fees goes here at the top of the form.";
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <Grid item xs={12}>
            <Typography component='h5' variant='h5' align='center'>
              Loan Info
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              errorText={this.state.loanNumberError}
              hint='Enter the Loan #'
              floatingLabelText='Loan #'
              onChange={handleChange("loanNumber")}
              defaultValue={values.loanNumber}
            />
          </Grid>
          <br />
          <Grid item xs={12} md={6}>
            <TextField
              errorText={this.state.escrowNumberError}
              hint='Enter Escrow #'
              floatingLabelText='Escrow #'
              onChange={handleChange("escrowNumber")}
              defaultValue={values.escrowNumber}
            />
          </Grid>
          <br />

          <Grid item xs={12} md={6}>
            {this.state.loanAmountError === "" ? (
              <FormControl variant='outlined'>
                <InputLabel>Loan Amount</InputLabel>
                <OutlinedInput
                  type='number'
                  id='outlined-adornment-amount'
                  value={values.loanAmount}
                  onChange={handleChange("loanAmount")}
                  startAdornment={
                    <InputAdornment position='start'>$</InputAdornment>
                  }
                  labelWidth={130}
                />
              </FormControl>
            ) : (
              <FormControl variant='outlined' error>
                <InputLabel>Loan Amount</InputLabel>
                <OutlinedInput
                  type='number'
                  id='outlined-adornment-amount'
                  value={values.loanAmount}
                  onChange={handleChange("loanAmount")}
                  startAdornment={
                    <InputAdornment position='start'>$</InputAdornment>
                  }
                  labelWidth={130}
                />
              </FormControl>
            )}
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={12} md={6}>
              {this.state.fundedDateError === "" ? (
                <KeyboardDatePicker
                  margin='normal'
                  id='date-picker-dialog'
                  label='Date picker dialog'
                  format='MM/dd/yyyy'
                  value={values.fundedDate}
                  onChange={handleChange("fundedDate")}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              ) : (
                <KeyboardDatePicker
                  error
                  margin='normal'
                  id='date-picker-dialog'
                  label='Date picker dialog'
                  format='MM/dd/yyyy'
                  value={values.fundedDate}
                  onChange={handleChange("fundedDate")}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              )}
            </Grid>
          </MuiPickersUtilsProvider>
          <br />
          <br />
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginLeft: "5rem",
                marginRight: "5rem",
              }}
            >
              {this.state.processorError === "" ? (
                <FormControl>
                  <InputLabel htmlFor='company-processor-helper'>
                    Processor
                  </InputLabel>
                  <NativeSelect
                    value={values.processor}
                    onChange={handleChange("processor")}
                    inputProps={{
                      name: "processor",
                      id: "processor-",
                    }}
                  >
                    <option aria-label='None' value='' />
                    <option value={"Gaby"}>Gaby</option>
                    <option value={"Diane"}>Diane</option>
                    <option value={"Wendy"}>Wendy</option>
                    <option value={"Miranda"}>Miranda</option>
                  </NativeSelect>
                  <FormHelperText>Please select a processor.</FormHelperText>
                </FormControl>
              ) : (
                <FormControl error>
                  <InputLabel htmlFor='company-processor-helper'>
                    Processor
                  </InputLabel>
                  <NativeSelect
                    value={values.processor}
                    onChange={handleChange("processor")}
                    inputProps={{
                      name: "processor",
                      id: "processor-",
                    }}
                  >
                    <option aria-label='None' value='' />
                    <option value={"Gaby"}>Gaby</option>
                    <option value={"Diane"}>Diane</option>
                    <option value={"Wendy"}>Wendy</option>
                    <option value={"Miranda"}>Miranda</option>
                  </NativeSelect>
                  <FormHelperText>Please select a processor.</FormHelperText>
                </FormControl>
              )}
              Have another processor? <br />
              Input the Full Name below.
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              errorText={this.state.processorError}
              hint="Processor's Name"
              floatingLabelText="Processor's Name"
              onChange={handleChange("processor")}
              defaultValue={values.processor}
            />
          </Grid>
          <br />
          {/*escrowCompany: "",
            lenderName: "",
            borrowers: "",
            propertyAddress: "",
            amountCheck: "",*/}
          <Grid item xs={12} md={6}>
            <TextField
              errorText={this.state.escrowCompanyError}
              hint='Enter the Escrow Company'
              floatingLabelText='Escrow Company'
              onChange={handleChange("escrowCompany")}
              defaultValue={values.escrowCompany}
            />
          </Grid>
          <br />
          <Grid item xs={12} md={6}>
            <TextField
              errorText={this.state.lenderNameError}
              hint='Enter the Lender Name'
              floatingLabelText='Lender Name'
              onChange={handleChange("lenderName")}
              defaultValue={values.lenderName}
            />
          </Grid>
          <br />
          <Grid item xs={12} md={6}>
            <TextField
              multiLine
              rowsMax={4}
              errorText={this.state.borrowersError}
              hint='Enter the Borrower(s)'
              floatingLabelText='Borrower(s)'
              onChange={handleChange("borrowers")}
              defaultValue={values.borrowers}
            />
          </Grid>

          <br />
          <Grid item xs={12} md={6}>
            <TextField
              errorText={this.state.propertyAddressError}
              variant='outlined'
              multiLine
              rowsMax={4}
              label='Property Address'
              hint='Enter the Property Address'
              floatingLabelText='Property Address'
              onChange={handleChange("propertyAddress")}
              defaultValue={values.propertyAddress}
            />
          </Grid>
          <br />
          <br />
          <Grid item xs={12}>
            Was the Amount of Check Mailed or Wired?
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
                    checked={values.AmountOfCheckWired}
                    color='primary'
                    onChange={this.twoCalls}
                    name='AmountOfCheckWired'
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
          <Grid item xs={12}>
            <Tooltip title={long_title} placement='right-start' arrow>
              {this.state.amountCheckError === "" ? (
                <FormControl variant='outlined'>
                  <InputLabel>Amount of Check</InputLabel>
                  <OutlinedInput
                    type='number'
                    id='outlined-adornment-amount'
                    value={values.amountCheck}
                    onChange={handleChange("amountCheck")}
                    startAdornment={
                      <InputAdornment position='start'>$</InputAdornment>
                    }
                    labelWidth={130}
                  />
                </FormControl>
              ) : (
                <FormControl variant='outlined' error>
                  <InputLabel>Amount of Check</InputLabel>
                  <OutlinedInput
                    type='number'
                    id='outlined-adornment-amount'
                    value={values.amountCheck}
                    onChange={handleChange("amountCheck")}
                    startAdornment={
                      <InputAdornment position='start'>$</InputAdornment>
                    }
                    labelWidth={130}
                  />
                </FormControl>
              )}
            </Tooltip>
          </Grid>

          {/*butoons--------------------*/}

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
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <Alert severity='info'>Please email a copy of wired receipt.</Alert>
          </Snackbar>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default FormLoanInfo;
