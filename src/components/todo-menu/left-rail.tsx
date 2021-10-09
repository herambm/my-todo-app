import { Box, makeStyles } from "@material-ui/core";
import * as React from "react";
import { PageMenu } from "./page-menu";

const useStyles = makeStyles({
  leftRail: {
    width: "25%",
    padding: "1rem 1rem 1rem 1rem",
  },
  header: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    marginLeft: "0.5rem",
  },
});

export const LeftRail: React.FunctionComponent<{}> = () => {
  const classes = useStyles();
  return (
    <Box className={classes.leftRail}>
      <h1 className={classes.header}>My ToDos</h1>
      <PageMenu />
    </Box>
  );
};
