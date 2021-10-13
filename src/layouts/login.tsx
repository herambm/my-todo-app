import * as React from "react";
import { Container, makeStyles } from "@material-ui/core";
import logo from "../statics/Images/todo.png";
import { Login } from "../components/top-bar/container/log-in-button";

const useStyles = makeStyles({
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    width: "100%",
    height: "100%",
    marginTop: "10%",
  },
  image: {
    width: "35rem",
    height: "22rem",
  },
});

export const LoginPage: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Container className={classes.layout}>
      {/**<a href='https://www.freepik.com/vectors/business'>Business vector created by jcomp - www.freepik.com</a> */}
      <img src={logo} alt="Logo" className={classes.image} loading="lazy" />
      <h2>Organize your tasks with MyToDo!</h2>
      <Login />
    </Container>
  );
};
