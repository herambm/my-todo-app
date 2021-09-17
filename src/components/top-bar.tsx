import { Box, Container, makeStyles } from "@material-ui/core";
import { ListAlt } from "@material-ui/icons";
import * as React from "react";
import { LogoutButton } from "./log-out-button";

const useStyles = makeStyles({
  topBar: {
    maxWidth: "unset",
    height: "3rem",
    padding: "unset",
    margin: "unset",
    display: "flex",
    alignItems: "center",
    fontSize: "1.5rem",
    paddingLeft: "1rem",
    background: "#3f51b5",
    color: "white",
  },
  topBarTitle: {
    marginLeft: "0.5rem",
  },
  logOut: {
    marginLeft: "auto",
    color: "#ffffff",
    marginRight: "1rem",
  },
});

export const TopBar: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Container className={classes.topBar}>
      <ListAlt />
      <Box className={classes.topBarTitle}>My ToDo</Box>
      <LogoutButton className={classes.logOut} />
    </Container>
  );
};
