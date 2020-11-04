import React, { Component } from "react";
import FormLODetails from "./FormLODetails";
import FormLoanInfo from "./FormLoanInfo";
import Confirm from "./Confirm";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import FormTypeOfLoan from "./FormTypeOfLoan";
import FormAdditionalCharges from "./FormAdditionalCharges";
import FormLoanOfficerInfo from "./FormLoanOfficerInfo";
import StepContent from "@material-ui/core/StepContent";
import Submitted from "./Submitted";

export class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      //step 1
      firstName: "",
      lastName: "",
      email: "",
      companyBranch: "",
      //step 2
      loanNumber: "",
      escrowNumber: "",
      loanAmount: 0,
      fundedDate: null,
      processor: "",
      escrowCompany: "",
      lenderName: "",
      borrowers: "",
      propertyAddress: "",
      amountCheck: 0,
      AmountOfCheckWired: false, // this wired is for amount OF CHECK
      //----step 3
      typeOfLoan: "",
      transaction: "",
      correspondent: false,
      correspondentCompany: "",
      state: "",
      //step 4
      additionalCharge: [],
      // step 5
      loanOfficer: "",
      flatFeeOrPercent: "percent",
      flatFee: null,
      businessName: "",
      percent: null,
      paymentTypeWired: false,
      paymentAmount: 0,

      // LO2
      loanOfficer2: "",
      flatFeeOrPercent2: "percent",
      flatFee2: null,
      businessName2: "",
      percent2: null,
      paymentTypeWired2: true,
      paymentAmount2: 0,
      twoLOs: false,

      // second payment temp var---> this is to not lose the original value of
      //paymentAmount when calculating different scenarios.
      paymentAmountTemp: null,
      //user phone number
      phoneNumber: "",
    };
  }

  handleDelete = (id) => {
    const { additionalCharge } = this.state;
    console.log("inside delete ;start function;item selected is=" + id);
    console.log("filtered list=");
    console.log(additionalCharge.filter((el) => el.id !== id));
    this.setState({
      additionalCharge: this.state.additionalCharge.filter(
        (el) => el.id !== id
      ),
    });
    additionalCharge.map((item) =>
      console.log(item.itemName + " " + item.amount)
    );
    console.log("end of del func");
  };
  //
  // **************************** update payment First LO update payment **********************************

  updatePayment = () => {
    //get references
    const {
      flatFeeOrPercent,
      additionalCharge,
      amountCheck,
      percent,
      flatFee,
    } = this.state;

    additionalCharge.map((item) =>
      console.log(item.itemName + " " + item.amount)
    );

    // get all additional charges
    var sumTotal = additionalCharge.reduce(function (prev, cur) {
      return prev + cur.amount;
    }, 0);
    console.log("sum is=" + sumTotal);

    //show loanAmount
    console.log("Payment amount" + amountCheck);
    //if flat-fee -->

    if (flatFeeOrPercent === "flat_fee") {
      console.log("Flat_Fee---");
      console.log("payment" + (amountCheck + (sumTotal - flatFee)));

      this.setState({
        paymentAmount: amountCheck + (sumTotal - flatFee),
        paymentAmountTemp: amountCheck + (sumTotal - flatFee),
        percent: 0,
      });
    }
    //if percent  -->
    if (flatFeeOrPercent === "percent") {
      console.log("Percent=" + percent);
      console.log("payment=" + (amountCheck * (percent / 100) + sumTotal));

      this.setState({
        paymentAmount: amountCheck * (percent / 100) + sumTotal,
        paymentAmountTemp: amountCheck * (percent / 100) + sumTotal,
        flatFee: 0,
      });
    }
  }; //******************************************************************************************** */

  // ----------update second LO ----------------------
  //add another set to percent and flat fee when additional charges
  //or add updatefunction to additonalcharges
  updatePayment2 = () => {
    const {
      twoLOs,
      flatFeeOrPercent2,
      paymentAmountTemp,
      flatFee2,

      percent2,
    } = this.state;

    if (twoLOs) {
      console.log("payment amount temp=" + paymentAmountTemp);
      console.log("flatFee2=" + flatFee2 + "percent2=" + percent2);

      //flat fee ----------------
      if (flatFeeOrPercent2 === "flat_fee") {
        console.log("second LO");

        this.setState({
          paymentAmount: paymentAmountTemp - flatFee2,
          paymentAmount2: flatFee2,
          percent2: 0,
        }); //percent -----------
      } else if (flatFeeOrPercent2 === "percent") {
        console.log("second LO");

        this.setState({
          paymentAmount: paymentAmountTemp * (1 - percent2 / 100),
          paymentAmount2: paymentAmountTemp * (percent2 / 100),
          flatFee2: 0,
        });
      }
    }
  }; //---------------------------End update2() -------------------------------------------------
  // ******************* proceed to next step *********************************************
  nextStep = () => {
    const { step } = this.state;
    console.log("from step  " + step);
    this.setState({
      step: step + 1,
    });
    console.log("to step " + (step + 1));
  }; // ************************************ end nextstep() ******************************************************

  // *********************************************  go back to prev state *********************************************
  prevStep = () => {
    const { step } = this.state;
    console.log("step " + step);

    this.setState({
      step: step - 1,
    });
  }; //****************************************** end prevStep() ************************************************
  // ********************************************* handle change *********************************************
  handleChange = (input) => (e) => {
    if (input === "fundedDate") {
      this.setState({ [input]: e });
      console.log("input= " + input + "  ,target=" + e);
    } else if (
      input === "AmountOfCheckWired" ||
      input === "paymentTypeWired" ||
      input === "correspondent" ||
      input === "paymentTypeWired2" ||
      input === "twoLOs"
    ) {
      this.setState({ [input]: e.target.checked });
      console.log("input= " + input + "  ,target=" + e.target.checked);
    } else if (
      input === "flatFee" ||
      input === "percent" ||
      input === "flatFee2" ||
      input === "percent2" ||
      input === "paymentAmount" ||
      input === "paymentAmount2" ||
      input === "amountCheck" ||
      input === "loanAmount"
    ) {
      if (isNaN(parseFloat(e.target.value))) {
        this.setState({ [input]: null });

        return;
      }
      this.setState({ [input]: parseFloat(e.target.value) });
      console.log(
        "input= " + input + "  ,target=" + parseFloat(e.target.value)
      );
    } else {
      this.setState({ [input]: e.target.value });
      console.log(typeof e.target.value);
      console.log("input= " + input + "  ,target=" + e.target.value);
    }
    if (input === "percent") {
      this.updatePayment();
    }
  }; //*************************************end handle change*****************************************************

  render() {
    const { step } = this.state;
    const {
      firstName,
      lastName,
      email,
      companyBranch,
      loanNumber,
      escrowCompany,
      escrowNumber,
      loanAmount,
      fundedDate,
      processor,
      lenderName,
      borrowers,
      propertyAddress,
      amountCheck,
      AmountOfCheckWired, // this wired is for amount OF CHECK
      //----step 3
      typeOfLoan,
      transaction,
      correspondent,
      correspondentCompany,
      state,
      //step 4
      additionalCharge,
      // step 5
      loanOfficer,
      flatFeeOrPercent,
      flatFee,
      businessName,

      percent,
      paymentTypeWired,
      paymentAmount,

      // LO2
      // LO2
      loanOfficer2,
      flatFeeOrPercent2,
      flatFee2,
      businessName2,
      percent2,
      paymentTypeWired2,
      paymentAmount2,
      twoLOs,
      paymentAmountTemp, // used for calculating payment amount
      phoneNumber,
    } = this.state;

    const values = {
      firstName,
      lastName,
      email,
      companyBranch,
      loanNumber,
      escrowCompany,
      escrowNumber,
      loanAmount,
      fundedDate,
      processor,
      lenderName,
      borrowers,
      propertyAddress,
      amountCheck,
      AmountOfCheckWired, // this wired is for amount OF CHECK
      //----step 3
      typeOfLoan,
      transaction,
      correspondent,
      correspondentCompany,
      state, //step 4
      additionalCharge,

      // step 5 LO-1
      loanOfficer,
      flatFeeOrPercent,

      flatFee,
      businessName,

      percent,
      paymentTypeWired,
      paymentAmount,

      // LO-2
      loanOfficer2,
      flatFeeOrPercent2,
      flatFee2,
      businessName2,
      percent2,
      paymentTypeWired2,
      paymentAmount2,
      twoLOs,
      paymentAmountTemp,
      phoneNumber,
    };
    const steps = [
      "Loan Officer Details",
      "Loan Info",
      "Type of Loan",
      "Charges/Credits",
      "Loan Officer Info",
    ];

    switch (step) {
      case 0:
        return (
          /* */

          <React.Fragment>
            <Stepper activeStep={this.state.step}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <FormLODetails
              values={values}
              nextStep={this.nextStep}
              handleChange={this.handleChange}
            />
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <Stepper activeStep={this.state.step}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <FormLoanInfo
              values={values}
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              prevStep={this.prevStep}
            />
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <Stepper activeStep={this.state.step}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <FormTypeOfLoan
              values={values}
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              prevStep={this.prevStep}
            />
          </React.Fragment>
        );
      case 3:
        return (
          <React.Fragment>
            <Stepper activeStep={this.state.step}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <FormAdditionalCharges
              values={values}
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              prevStep={this.prevStep}
              handleDelete={this.handleDelete}
            />
          </React.Fragment>
        );
      case 4:
        return (
          <React.Fragment>
            <Stepper activeStep={this.state.step}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <FormLoanOfficerInfo
              values={values}
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              prevStep={this.prevStep}
              updatePayment={this.updatePayment}
              updatePayment2={this.updatePayment2}
            />
          </React.Fragment>
        );
      case 5:
        return (
          <React.Fragment>
            <Confirm
              values={values}
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              prevStep={this.prevStep}
              updatePayment={this.updatePayment}
              updatePayment2={this.updatePayment2}
            />
          </React.Fragment>
        );
      case 6:
        return (
          <React.Fragment>
            <Submitted />
          </React.Fragment>
        );
      default:
        return;
    }
  }
}

export default UserForm;
