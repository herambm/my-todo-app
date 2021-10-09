import { Input, makeStyles } from "@material-ui/core";
import * as React from "react";
import { TopBarRenderer } from "../renderer/top-bar-renderer";
import { LogoutButton } from "./log-out-button";
import { UserAvatar } from "./user-avatar";

const useStyles = makeStyles({
  input: {
    width: "100%",
    position: "absolute",
    marginLeft: "1.5rem",
  },
});

export const TopBar: React.FunctionComponent = () => {
  const classes = useStyles();

  const rightItems = [<LogoutButton />, <UserAvatar />];
  const leftItems = [
    <Input placeholder="Search your task" className={classes.input} />,
  ];

  return <TopBarRenderer rightItems={rightItems} leftItems={leftItems} />;
};
