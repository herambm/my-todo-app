import {
  Box,
  CircularProgress,
  CircularProgressProps,
  makeStyles,
} from "@material-ui/core";
import classNames from "classnames";
import * as React from "react";

const useStyles = makeStyles({
  spinner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export interface ISpinnerProps {
  circularProgressProps?: CircularProgressProps;
  message?: string;
  className?: string;
}

export const Spinner: React.FunctionComponent<ISpinnerProps> = ({
  circularProgressProps,
  message,
  className,
}) => {
  const classes = useStyles();
  return (
    <Box className={classNames(classes.spinner, className)}>
      <CircularProgress {...circularProgressProps} />
      {message && <h2>{message}</h2>}
    </Box>
  );
};
