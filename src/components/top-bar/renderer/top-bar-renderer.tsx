import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import * as React from "react";

export interface ITopBarRenderer {
  leftItems?: React.ReactElement[];
  rightItems?: React.ReactElement[];
  className?: string;
}

const useStyles = makeStyles({
  topBar: {
    position: "relative",
    display: "flex",
    width: "100%",
  },
  leftItems: {
    display: "flex",
    width: "50%",
    position: "absolute",
  },
  rightItems: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "0.4rem",
  },
});

export const TopBarRenderer: React.FunctionComponent<ITopBarRenderer> = ({
  leftItems,
  rightItems,
  className,
}) => {
  const classes = useStyles();
  // Todo: Fix key issue, accept an array of objects
  return (
    <Box className={classNames(classes.topBar, className)}>
      {leftItems && <Box className={classes.leftItems}>{leftItems}</Box>}
      {rightItems && <Box className={classes.rightItems}>{rightItems}</Box>}
    </Box>
  );
};
