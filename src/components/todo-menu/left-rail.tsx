import { Box, makeStyles } from "@material-ui/core";
import * as React from "react";
import { PageMenu } from "./page-menu";

const useStyles = makeStyles({
  leftRail: {
    width: "25%",
    padding: "1rem 2rem 1rem 2rem",
  },
});

export const LeftRail: React.FunctionComponent<{}> = () => {
  const classes = useStyles();
  return (
    <Box className={classes.leftRail}>
      <h1>My todo</h1>
      <PageMenu />
    </Box>
  );
};
