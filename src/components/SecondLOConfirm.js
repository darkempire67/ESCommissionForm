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
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { numberWithCommas } from "../utils/utils";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { makeStyles } from "@material-ui/core/styles";

export class Confirm extends Component {
  continue = (e) => {
    e.preventDefault();
    // process data
    //this.props.nextStep();
    fetch(`https://hooks.zapier.com/hooks/catch/8510968/ow6pp5z/`, {
      method: "POST",
      body: JSON.stringify(this.props.values),
    });
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  //---- handle noth

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
          additionalCharge: [],
// step 5
      loanOfficer: "",
      flatFeeCheck: "",
      flatFee: "",
      businessName: "",
      percentCheck: "",
      percent: "",
      paymentTypeWired: false,
      paymentAmount: "",

    
    get values and pass them along the components
    */

  render() {
    const { values } = this.props;

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography component='h6' variant='h6' align='center'>
              Second Loan Officer
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <List component='nav'>
              <ListItemText
                primary={"Loan Officer 2"}
                secondary={values.loanOfficer2}
              />
            </List>
          </Grid>
          <Grid item xs={4}>
            <List component='nav'>
              <ListItemText
                primary={"Flat Fee/Percent"}
                secondary={
                  values.flatFeeOrPercent2 === "flat_fee"
                    ? "Flat Fee"
                    : "Percent"
                }
              />
            </List>
          </Grid>
          {values.flatFeeOrPercent2 === "flat_fee" ? (
            <Grid item xs={4}>
              <List component='nav'>
                <ListItemText
                  primary={"Flat Fee"}
                  secondary={values.flatFee2}
                />
              </List>
            </Grid>
          ) : (
            <Grid item xs={4}>
              <List component='nav'>
                <ListItemText primary={"Percent"} secondary={values.percent2} />
              </List>
            </Grid>
          )}

          <Grid item xs={4}>
            <List component='nav'>
              <ListItemText
                primary={"Business Name"}
                secondary={values.businessName2}
              />
            </List>
          </Grid>

          <Grid item xs={4}>
            <List component='nav'>
              <ListItemText
                primary={"Payment Type"}
                secondary={values.paymentTypeWired2 ? "Wired" : "Mailed"}
              />
            </List>
          </Grid>
          <Grid item xs={4}>
            <List component='nav'>
              <ListItemText
                primary={"Payment Amount"}
                secondary={numberWithCommas(values.paymentAmount2)}
              />
            </List>
          </Grid>
          {/**?step: 1,
    firstName: "",!
    lastName: "",!
    email: "",!
    companyBranch: "",!
    step 2---------
    loanNumber: "",!
    escrowNumber: "",!
    loanAmount: "",
    fundedDate: "",
    processor: "",
    escrowCompany: "",
    lenderName: "",
    borrowers: "",
    propertyAddress: "",
    amountCheck: "",
    AmountOfCheckWired: true, // this wired is for amount OF CHECK
    //step 3-----------
    typeOfLoan: "",
    transaction: "",
    correspondent: "",
    correspondentCompany: "",
    state: "",
    //step 4
          additionalCharge: [],
// step 5
      loanOfficer: "Esteni",
      flatFeeOrPercent: "percent",
      flatFee: "",
      businessName: "Some Business Name",
      percent: "100",
      paymentTypeWired: false,
      paymentAmount: "2000",

    
    get values and pass them along the components
    */}

          {/* 
          <Grid item xs={12} md={6}>
            <ul>
              {this.props.values.additionalCharge.map((item) => (
                <li key={item.id}>{item}</li>
              ))}
            </ul>
          </Grid>
          */}
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;
