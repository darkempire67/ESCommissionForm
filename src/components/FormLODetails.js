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

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

export class FormLODetails extends Component {
  state = {
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    companyBranchError: "",
    phoneNumberError: "",
  };
  validate = () => {
    let isErr = false;
    const errors = {
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      companyBranchError: "",
      phoneNumberError: "",
    };
    if (this.props.values.firstName.length < 1) {
      isErr = true;
      errors.firstNameError = "Enter First Name";
    }
    if (this.props.values.lastName.length < 1) {
      isErr = true;
      errors.lastNameError = "Enter Last Name";
    }
    if (this.props.values.companyBranch === "") {
      isErr = true;
      errors.companyBranchError = "Please Select a Branch!";
    }
    var mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
      this.props.values.email === "" ||
      !mailFormat.test(this.props.values.email)
    ) {
      isErr = true;
      errors.emailError = "Invalid Email!";
    }
    var phoneNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (!phoneNo.test(this.props.values.phoneNumber)) {
      isErr = true;
      errors.phoneNumberError = "Invalid Phone #, Format (xxx)xxx-xxxx";
    }
    if (isErr) {
      this.setState({
        ...this.state,
        ...errors,
      });
    }
    return isErr;
  };
  continue = (e) => {
    e.preventDefault();
    //validate
    const err = this.validate();
    if (!err) {
      this.props.nextStep();
    }
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

  render() {
    function Alert(props) {
      return <MuiAlert elevation={6} variant='filled' {...props} />;
    }
    const { values, handleChange } = this.props;
    const step = values.step;
    const { companyBranchError } = this.state;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <Grid item xs={12}>
            <Typography component='h5' variant='h5' align='center'>
              LO Details
            </Typography>
          </Grid>
          <br />
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              Hello, please begin here.☺️ <br />
              Select your Branch.
              <Grid item>
                <Icon color='primary' fontSize='large'>
                  location_city
                </Icon>
              </Grid>
              <Grid item>
                {companyBranchError === "" ? (
                  <FormControl>
                    <InputLabel htmlFor='company-branch-helper'>
                      Branch
                    </InputLabel>
                    <NativeSelect
                      value={values.companyBranch}
                      onChange={handleChange("companyBranch")}
                      inputProps={{
                        name: "companyBranch",
                        id: "company-branch",
                      }}
                    >
                      <option aria-label='None' value='' />
                      <option value={"HQ"}>HQ</option>
                      <option value={"Long Beach-1"}>Long Beach-1</option>
                      <option value={"Eagle Rock-2"}>Eagle Rock-2</option>
                      <option value={"Downey-3"}>Downey-3</option>
                    </NativeSelect>
                    <FormHelperText>Please choose your Branch.</FormHelperText>
                  </FormControl>
                ) : (
                  <FormControl error>
                    <InputLabel htmlFor='company-branch-helper'>
                      Branch
                    </InputLabel>
                    <NativeSelect
                      value={values.companyBranch}
                      onChange={handleChange("companyBranch")}
                      inputProps={{
                        name: "companyBranch",
                        id: "company-branch",
                      }}
                    >
                      <option aria-label='None' value='' />
                      <option value={"HQ"}>HQ</option>
                      <option value={"Long Beach-1"}>Long Beach-1</option>
                      <option value={"Eagle Rock-2"}>Eagle Rock-2</option>
                      <option value={"Downey-3"}>Downey-3</option>
                    </NativeSelect>
                    <FormHelperText>Please choose your Branch.</FormHelperText>
                  </FormControl>
                )}
              </Grid>
            </div>
          </Grid>
          <br />
          <Grid item xs={12} md={6}>
            <TextField
              errorText={this.state.firstNameError}
              variant='outlined'
              hint='Enter your First Name'
              floatingLabelText='First Name'
              onChange={handleChange("firstName")}
              defaultValue={values.firstName}
            />
          </Grid>
          <br />
          <Grid item xs={12} md={6}>
            <TextField
              errorText={this.state.lastNameError}
              hint='Enter your Last Name'
              floatingLabelText='Last Name'
              onChange={handleChange("lastName")}
              defaultValue={values.lastName}
            />
          </Grid>
          <br />
          <Grid item xs={12} md={6}>
            <TextField
              errorText={this.state.emailError}
              hint='Enter your email'
              floatingLabelText='Email'
              onChange={handleChange("email")}
              defaultValue={values.email}
            />
          </Grid>
          <br />
          <Grid item xs={12} md={6}>
            <TextField
              errorText={this.state.phoneNumberError}
              hint='Enter your Number'
              floatingLabelText='Phone Number'
              onChange={handleChange("phoneNumber")}
              defaultValue={values.phoneNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' color='primary' onClick={this.continue}>
              Continue
            </Button>
          </Grid>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default FormLODetails;
