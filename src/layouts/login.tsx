import * as React from "react";
import { Box, makeStyles } from "@material-ui/core";
import logo from "../statics/Images/todo.png";
import { Login } from "../components/top-bar/container/log-in-button";

const useStyles = makeStyles({
  layout: {
    height: "100vh",
    overflow: "hidden",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "90%",
    justifyContent: "center",
  },
  image: {
    width: "35rem",
    height: "22rem",
  },
});

export const LoginPage: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Box className={classes.layout}>
      <Box className={classes.main}>
        {/* {
          <a href="https://www.freepik.com/vectors/calendar">
            Calendar vector created by jcomp - www.freepik.com
          </a>
        } */}
        <img src={logo} alt="Logo" className={classes.image} loading="lazy" />
        <h2>Organize your tasks with ToDo!</h2>
        <Login />
      </Box>
    </Box>
  );
};
