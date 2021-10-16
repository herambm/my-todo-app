import { Input, makeStyles } from "@material-ui/core";
import * as React from "react";
import { TopBarRenderer } from "../renderer/top-bar-renderer";
import { LogoutButton } from "./log-out-button";
import { ThemeSelector } from "./theme-selector";

const useStyles = makeStyles({
  input: {
    width: "100%",
    position: "absolute",
    marginLeft: "1.5rem",
  },
  topBar: {
    marginTop: "0.5rem",
  },
});

export const TopBar: React.FunctionComponent = () => {
  const classes = useStyles();

  const rightItems = [<ThemeSelector />, <LogoutButton />];
  const leftItems = [
    <Input placeholder="Search your task" className={classes.input} />,
  ];

  return (
    <TopBarRenderer
      rightItems={rightItems}
      leftItems={leftItems}
      className={classes.topBar}
    />
  );
};
