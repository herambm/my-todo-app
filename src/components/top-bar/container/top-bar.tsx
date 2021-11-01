import { makeStyles } from "@material-ui/core";
import * as React from "react";
import { TopBarRenderer } from "../renderer/top-bar-renderer";
import { LogoutButton } from "./log-out-button";
import { ThemeSelector } from "./theme-selector";

const useStyles = makeStyles({
  header: {
    height: "auto",
    margin: "unset",
  },
});

export const TopBar: React.FunctionComponent = () => {
  const classes = useStyles();

  const leftItems = React.useMemo(
    () => [
      <h1 className={classes.header} key="top-bar-header">
        To do
      </h1>,
    ],
    [classes.header]
  );
  const rightItems = React.useMemo(
    () => [
      <ThemeSelector key="top-bar-theme-selector" />,
      <LogoutButton key="top-bar-log-out" />,
    ],
    []
  );

  return <TopBarRenderer rightItems={rightItems} leftItems={leftItems} />;
};
