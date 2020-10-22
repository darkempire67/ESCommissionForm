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
import SecondLOConfirm from "./SecondLOConfirm";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

export class Confirm extends Component {
  state = { text: "" };
  continue = (e) => {
    e.preventDefault();
    // process data
    add2DB(this.props.values);
    //this.props.nextStep();

    //console.log(process.env);

    fetch(process.env.REACT_APP_ZAPIER_URL, {
      method: "POST",
      body: JSON.stringify(this.props.values),
    });
    //after go to submitted
    this.props.nextStep();
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
    const { values, updatePayment, updatePayment2 } = this.props;

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <Grid item xs={12}>
            <Typography component='h5' variant='h5' align='center'>
              Confirm
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <List component='nav'>
              <ListItemText
                primary={"First Name"}
                secondary={values.firstName}
              />
            </List>
          </Grid>
          <Grid item xs={6}>
            <List component='nav'>
              <ListItemText primary={"Last Name"} secondary={values.lastName} />
            </List>
          </Grid>
          <Grid item xs={6}>
            <List component='nav'>
              <ListItemText primary={"Email"} secondary={values.email} />
            </List>
          </Grid>
          <Grid item xs={6}>
            <List component='nav'>
              <ListItemText
                primary={"Phone Number"}
                secondary={values.phoneNumber}
              />
            </List>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={4} md={3}>
            <List component='nav'>
              <ListItemText
                primary={"Branch"}
                secondary={values.companyBranch}
              />
            </List>
          </Grid>
          <Grid item xs={4} md={3}>
            <List component='nav'>
              <ListItemText primary={"Loan #"} secondary={values.loanNumber} />
            </List>
          </Grid>
          <Grid item xs={4} md={3}>
            <List component='nav'>
              <ListItemText
                primary={"Escrow #"}
                secondary={values.escrowNumber}
              />
            </List>
          </Grid>
          <Grid item xs={4} md={3}>
            <List component='nav'>
              <ListItemText
                primary={"Loan Amount"}
                secondary={values.loanAmount}
              />
            </List>
          </Grid>
          <Grid item xs={4} md={3}>
            <List component='nav'>
              <ListItemText
                primary={"Funded Date"}
                secondary={"" + values.fundedDate}
              />
            </List>
          </Grid>
          <Grid item xs={4} md={3}>
            <List component='nav'>
              <ListItemText
                primary={"Processor"}
                secondary={values.processor}
              />
            </List>
          </Grid>
          <Grid item xs={4} md={3}>
            <List component='nav'>
              <ListItemText
                primary={"Escrow Co."}
                secondary={values.escrowCompany}
              />
            </List>
          </Grid>
          <Grid item xs={4} md={3}>
            <List component='nav'>
              <ListItemText
                primary={"Lender Name"}
                secondary={values.lenderName}
              />
            </List>
          </Grid>
          <Grid item xs={4} md={3}>
            <List component='nav'>
              <ListItemText
                primary={"Borrower(s)"}
                secondary={values.borrowers}
              />
            </List>
          </Grid>
          <Grid item xs={4} md={3}>
            <List component='nav'>
              <ListItemText
                primary={"Property Address"}
                secondary={values.propertyAddress}
              />
            </List>
          </Grid>
          <Grid item xs={4} md={3}>
            <List component='nav'>
              <ListItemText
                primary={"Amount of Check"}
                secondary={values.amountCheck}
              />
            </List>
          </Grid>
          <Grid item xs={4} md={3}>
            <List component='nav'>
              <ListItemText
                primary={"AoC/ Mailed-Wired"}
                secondary={values.AmountOfCheckWired ? "Wired" : "Mail"}
              />
            </List>
          </Grid>
          {/*step 3*/}

          <Grid item xs={4} md={3}>
            <List component='nav'>
              <ListItemText
                primary={"Type of Loan"}
                secondary={values.typeOfLoan}
              />
            </List>
          </Grid>

          <Grid item xs={4} md={3}>
            <List component='nav'>
              <ListItemText
                primary={"Transaction"}
                secondary={values.transaction}
              />
            </List>
          </Grid>

          <Grid item xs={4} md={4}>
            <List component='nav'>
              <ListItemText
                primary={"Correspondent"}
                secondary={values.correspondent ? "yes" : "no"}
              />
            </List>
          </Grid>

          <Grid item xs={6} md={4}>
            <List component='nav'>
              <ListItemText
                primary={"Correspondent Co."}
                secondary={values.correspondentCompany}
              />
            </List>
          </Grid>
          <Grid item xs={6} md={4}>
            <List component='nav'>
              <ListItemText primary={"State"} secondary={values.state} />
            </List>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <List component='nav'>
                <Typography component='h6' variant='h6' align='center'>
                  Additional Charges
                </Typography>
                {values.additionalCharge.map((item) => (
                  <ListItem alignItems='center' key={item.id}>
                    <ListItemIcon key={item} button='true'>
                      <AttachMoneyIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.itemName}
                      secondary={item.amount}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography component='h6' variant='h6' align='center'>
              Loan Officer
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <List component='nav'>
              <ListItemText
                primary={"Loan Officer"}
                secondary={values.loanOfficer}
              />
            </List>
          </Grid>
          <Grid item xs={4}>
            <List component='nav'>
              <ListItemText
                primary={"Flat Fee/Percent"}
                secondary={
                  values.flatFeeOrPercent === "flat_fee"
                    ? "Flat Fee"
                    : "Percent"
                }
              />
            </List>
          </Grid>
          {values.flatFeeOrPercent === "flat_fee" ? (
            <Grid item xs={4}>
              <List component='nav'>
                <ListItemText primary={"Flat Fee"} secondary={values.flatFee} />
              </List>
            </Grid>
          ) : (
            <Grid item xs={4}>
              <List component='nav'>
                <ListItemText primary={"Percent"} secondary={values.percent} />
              </List>
            </Grid>
          )}

          <Grid item xs={4}>
            <List component='nav'>
              <ListItemText
                primary={"Business Name"}
                secondary={values.businessName}
              />
            </List>
          </Grid>

          <Grid item xs={4}>
            <List component='nav'>
              <ListItemText
                primary={"Payment Type"}
                secondary={values.paymentTypeWired ? "Wired" : "Mailed"}
              />
            </List>
          </Grid>
          <Grid item xs={4}>
            <List component='nav'>
              <ListItemText
                primary={"Payment Amount"}
                secondary={values.paymentAmount}
              />
            </List>
          </Grid>
          {values.twoLOs === true ? (
            <SecondLOConfirm values={values} />
          ) : (
            <p></p>
          )}
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

          {/*buttons----------------*/}

          <Grid item xs={6} md={6}>
            <Button variant='contained' color='secondary' onClick={this.back}>
              Back
            </Button>
          </Grid>
          <Grid item xs={6} md={6}>
            <Button variant='contained' color='primary' onClick={this.continue}>
              Submit
            </Button>
          </Grid>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}
async function add2DB(values) {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*", //work
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(process.env.REACT_APP_DB_CONN, values, config);
    console.log(res.data.data);
  } catch (err) {
    console.log("error=" + err);
  }
}
export default Confirm;
