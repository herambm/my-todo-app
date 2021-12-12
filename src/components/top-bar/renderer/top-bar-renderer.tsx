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
    alignItems: "center",
    width: "100%",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    height: "3.5rem",
    background: "#5048E5",
    color: "#FFFFFF",
  },
  leftItems: {
    display: "flex",
    alignItems: "center",
    width: "50%",
    position: "absolute",
    height: "100%",
  },
  rightItems: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "0.4rem",
    height: "100%",
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
