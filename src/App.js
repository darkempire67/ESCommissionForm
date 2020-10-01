import React from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import { Paper, AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

/*
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
*/
import Link from "@material-ui/core/Link";
import { red } from "@material-ui/core/colors";

function App() {
  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: "relative",
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 700,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
  }));
  const classes = useStyles();

  return (
    <div className='App'>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant='h4' color='inherit' noWrap>
            Equity Smart
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.layout}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: "2rem",
          }}
        >
          <Typography component='h6' variant='h4'>
            Commission Form
          </Typography>
        </div>
        <Paper className={classes.paper} elevation={3}>
          <Grid container spacing={3}>
            <UserForm />
            {/*------------------------------- */}
          </Grid>{" "}
        </Paper>
      </main>
    </div>
  );
}

export default App;
