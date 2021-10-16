import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ExitToApp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  logOut: {
    marginRight: "0.3rem",
    marginLeft: "0.3rem",
    marginTop: "0.8rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
});

export const LogoutButton: React.FunctionComponent = () => {
  const { logout } = useAuth0();
  const classes = useStyles();
  const onLogOut = React.useCallback(
    () => logout({ returnTo: window.location.origin }),
    [logout]
  );

  return <ExitToApp onClick={onLogOut} className={classes.logOut} />;
};
