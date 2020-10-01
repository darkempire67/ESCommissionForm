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

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

export class FormTypeOfLoan extends Component {
  state = {
    open: false,
    typeOfLoanError: "",
    transactionError: "",
    correspondentCompanyError: "",
    stateError: "",
  };

  validate = () => {
    let isErr = false;
    const errors = {
      typeOfLoanError: "",
      transactionError: "",
      correspondentCompanyError: "",
      stateError: "",
    };
    if (this.props.values.typeOfLoan === "") {
      isErr = true;
      errors.typeOfLoanError = "Provide Escrow Company Name";
    }
    if (this.props.values.transaction === "") {
      isErr = true;
      errors.transactionError = "Provide Escrow Company Name";
    }
    if (
      this.props.values.correspondentCompany === "" &&
      this.props.values.correspondent
    ) {
      isErr = true;
      errors.correspondentCompanyError = " Enter Correspondent Company ";
    }
    if (this.props.values.state === "") {
      isErr = true;
      errors.stateError = "Select a State";
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
    this.props.handleChange("correspondent")(e);
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
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  /**?step: 1,
    firstName: "",
    lastName: "",
    email: "",
    companyBranch: "",
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
    const { open } = this.state;
    function Alert(props) {
      return <MuiAlert elevation={6} variant='filled' {...props} />;
    }
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <Grid item xs={12}>
            <Typography component='h5' variant='h5' align='center'>
              Type of Loan
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {this.state.typeOfLoanError === "" ? (
              <FormControl>
                <InputLabel htmlFor='type-loan-helper'>Type of Loan</InputLabel>
                <NativeSelect
                  value={values.typeOfLoan}
                  onChange={handleChange("typeOfLoan")}
                  inputProps={{
                    name: "typeOfLoan",
                    id: "type-loan",
                  }}
                >
                  <option aria-label='None' value='' />
                  <option value={"Conventional"}>Conventional</option>
                  <option value={"FHA"}>FHA</option>
                  <option value={"VA"}>VA</option>
                  <option value={"Commercial"}>Commercial</option>
                  <option value={"RM"}>RM</option>
                  <option value={"HM"}>HM</option>
                  <option value={"Jumbo"}>Jumbo</option>
                  <option value={"Non QM"}>Non QM</option>
                </NativeSelect>
                <FormHelperText>Select Type of Loan.</FormHelperText>
              </FormControl>
            ) : (
              <FormControl error>
                <InputLabel htmlFor='type-loan-helper'>Type of Loan</InputLabel>
                <NativeSelect
                  value={values.typeOfLoan}
                  onChange={handleChange("typeOfLoan")}
                  inputProps={{
                    name: "typeOfLoan",
                    id: "type-loan",
                  }}
                >
                  <option aria-label='None' value='' />
                  <option value={"Conventional"}>Conventional</option>
                  <option value={"FHA"}>FHA</option>
                  <option value={"VA"}>VA</option>
                  <option value={"Commercial"}>Commercial</option>
                  <option value={"RM"}>RM</option>
                  <option value={"HM"}>HM</option>
                  <option value={"Jumbo"}>Jumbo</option>
                  <option value={"Non QM"}>Non QM</option>
                </NativeSelect>
                <FormHelperText>Select Type of Loan.</FormHelperText>
              </FormControl>
            )}
          </Grid>
          <Grid item xs={6}>
            {this.state.transactionError === "" ? (
              <FormControl>
                <InputLabel htmlFor='transaction-helper'>
                  Transaction
                </InputLabel>
                <NativeSelect
                  value={values.transaction}
                  onChange={handleChange("transaction")}
                  inputProps={{
                    name: "transaction",
                    id: "transaction-",
                  }}
                >
                  <option aria-label='None' value='' />
                  <option value={"Purchase"}>Purchase</option>
                  <option value={"Refinance"}>Refinance</option>
                  <option value={"RE"}>RE</option>
                  <option value={"Referral"}>Referral</option>
                </NativeSelect>
                <FormHelperText>Please select a Transaction.</FormHelperText>
              </FormControl>
            ) : (
              <FormControl error>
                <InputLabel htmlFor='transaction-helper'>
                  Transaction
                </InputLabel>
                <NativeSelect
                  value={values.transaction}
                  onChange={handleChange("transaction")}
                  inputProps={{
                    name: "transaction",
                    id: "transaction-",
                  }}
                >
                  <option aria-label='None' value='' />
                  <option value={"Purchase"}>Purchase</option>
                  <option value={"Refinance"}>Refinance</option>
                  <option value={"RE"}>RE</option>
                  <option value={"Referral"}>Referral</option>
                </NativeSelect>
                <FormHelperText>Please select a Transaction.</FormHelperText>
              </FormControl>
            )}
          </Grid>
          <br />

          <Grid item xs={6}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              {this.state.stateError === "" ? (
                <FormControl>
                  <InputLabel htmlFor='state-branch-helper'>State</InputLabel>
                  <NativeSelect
                    value={values.state}
                    onChange={handleChange("state")}
                    inputProps={{
                      name: "state",
                      id: "state-",
                    }}
                  >
                    <option aria-label='None' value='' />
                    <option value={"CA"}>CA</option>
                    <option value={"FL"}>FL</option>
                    <option value={"OR"}>OR</option>
                  </NativeSelect>
                  <FormHelperText>Please select a State.</FormHelperText>
                </FormControl>
              ) : (
                <FormControl error>
                  <InputLabel htmlFor='state-branch-helper'>State</InputLabel>
                  <NativeSelect
                    value={values.state}
                    onChange={handleChange("state")}
                    inputProps={{
                      name: "state",
                      id: "state-",
                    }}
                  >
                    <option aria-label='None' value='' />
                    <option value={"CA"}>CA</option>
                    <option value={"FL"}>FL</option>
                    <option value={"OR"}>OR</option>
                  </NativeSelect>
                  <FormHelperText>Please select a State.</FormHelperText>
                </FormControl>
              )}
            </div>
          </Grid>

          <br />
          <br />
          <Grid item xs={6}>
            Was it Correspondent?
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
                thumb_down
              </Icon>
              No
              <FormControlLabel
                control={
                  <Switch
                    color='primary'
                    checked={values.correspondent}
                    onChange={this.twoCalls}
                    name='Correspondent'
                  />
                }
                label='Yes'
              />
              <Icon color='primary' fontSize='small'>
                thumb_up
              </Icon>
            </div>
          </Grid>

          <Grid item xs={12}>
            <TextField
              errorText={this.state.correspondentCompanyError}
              hint='Enter the Correspondent Company'
              floatingLabelText='Correspondent Company'
              onChange={handleChange("correspondentCompany")}
              defaultValue={values.correspondentCompany}
            />
          </Grid>
          <br />
          {/*buttons----------------*/}

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

          <div>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={this.handleClose}
            >
              <Alert severity='error'>
                For correspondent files, please allow up to 10 business days for
                payment to be processed.
              </Alert>
            </Snackbar>
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default FormTypeOfLoan;
