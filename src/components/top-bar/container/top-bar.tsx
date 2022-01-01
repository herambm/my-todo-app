import { useAuth0, User } from "@auth0/auth0-react";
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
  const { user } = useAuth0();

  const leftItems = React.useMemo(
    () => [
      <h1 className={classes.header} key="top-bar-header">
        To do
      </h1>,
    ],
    [classes.header]
  );
  const rightItems = React.useMemo(() => getRightItems(user), [user]);

  return <TopBarRenderer rightItems={rightItems} leftItems={leftItems} />;
};

const getRightItems = (user?: User) => {
  const rightItems = [];
  rightItems.push(<ThemeSelector key="top-bar-theme-selector" />);
  user && rightItems.push(<LogoutButton key="top-bar-log-out" />);
  return rightItems;
};
