import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core";
import * as React from "react";
import { Spinner } from "../../components/spinner/spinner";
import { LoginPage } from "../../layouts/login";

const useStyles = makeStyles({
  spinner: {
    height: "90%",
  },
});

export const AuthProvider: React.FunctionComponent<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const classes = useStyles();
  const { isAuthenticated, isLoading } = useAuth0();
  if (isAuthenticated) {
    return <>{children}</>;
  }
  if (isLoading) {
    return (
      <Spinner
        message={"Loading your app in a moment..."}
        className={classes.spinner}
      />
    );
  }

  return <LoginPage />;
};
