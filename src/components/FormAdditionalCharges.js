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

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { makeStyles } from "@material-ui/core/styles";

export class FormAdditionalCharges extends Component {
  state = { amount: "", itemName: "", amountError: "", itemNameError: "" };

  validate = () => {
    let isErr = false;
    const errors = {
      amountError: "",
      itemNameError: "",
    };
    var numbers = /^[0-9]+$/;
    if (this.state.itemName === "") {
      isErr = true;
      errors.itemNameError = "Cannot be Empty";
    }
    if (!numbers.test(this.state.amount)) {
      isErr = true;
      errors.amountError = "Input Numbers only";
    }

    if (isErr) {
      this.setState({
        ...this.state,
        ...errors,
      });
    }
    return isErr; // ---------- end of validate - ---------------------
  };

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  // handle change in text
  handleChangeText = (input) => (e) => {
    console.log("input= " + input + " target= " + e.target.value);
    this.setState({ [input]: e.target.value });
    console.log(e.target.value);
  };

  // handle additional charge add to list

  additionalCharge = (e) => {
    e.preventDefault();
    const err = this.validate();
    if (err) {
      console.log("error");
      return;
    }
    this.setState({
      amountError: "",
      itemNameError: "",
    });

    const { amount } = this.state;
    const { itemName } = this.state;
    console.log("input =" + itemName + " amount = " + amount);

    const { additionalCharge } = this.props.values.additionalCharge;
    var newItem = {
      itemName: itemName,
      amount: parseFloat(amount),
      id: new Date(),
    };
    console.log(newItem);
    this.setState({
      additionalCharge: this.props.values.additionalCharge.push(newItem),
    });

    this.props.values.additionalCharge.map((item) =>
      console.log(item.itemName + " " + item.amount)
    );
    console.log("end of add func");
  };
  // handle delete
  handleDelete = (item) => (e) => {
    e.preventDefault();

    console.log("hello delete func");
    console.log(item);
    this.props.handleDelete(item);
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


    
    get values and pass them along the components
    */

  render() {
    function Alert(props) {
      return <MuiAlert elevation={6} variant='filled' {...props} />;
    }
    const { values, handleChange } = this.props;

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <Grid item xs={12}>
            <Typography component='h5' variant='h5' align='center'>
              Additional Charges
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "10rem",
                marginRight: "10rem",
              }}
            >
              <br />

              <List component='nav'>
                {this.props.values.additionalCharge.map((item) => (
                  <ListItem
                    alignItems='center'
                    key={item.id}
                    onClick={this.handleDelete(item.id)}
                  >
                    <ListItemIcon key={item} button='true'>
                      <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.itemName}
                      secondary={item.amount}
                    />
                  </ListItem>
                ))}
              </List>
            </div>{" "}
          </Grid>

          {/* 
          <Grid item xs={12} md={6}>
            <ul>
              {this.props.values.additionalCharge.map((item) => (
                <li key={item.id}>{item}</li>
              ))}
            </ul>
          </Grid>
          */}

          <Grid item xs={12} md={6}>
            <TextField
              errorText={this.state.itemNameError}
              hint='Add Item'
              floatingLabelText='Item Name'
              onChange={this.handleChangeText("itemName")}
              defaultValue={this.itemName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              errorText={this.state.amountError}
              hint='Add Amount'
              floatingLabelText='Amount'
              onChange={this.handleChangeText("amount")}
              defaultValue={this.amount}
            />
          </Grid>
          <Grid item xs={12}>
            <Fab
              color='primary'
              aria-label='add'
              onClick={this.additionalCharge}
            >
              <AddIcon />
            </Fab>
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
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default FormAdditionalCharges;
