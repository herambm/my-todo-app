import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import { LoginPage } from "../pages/login";

export const AuthProvider: React.FunctionComponent<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  if (isAuthenticated) {
    return <>{children}</>;
  }
  if (isLoading) {
    return <CircularProgress />;
  }
  if (error && !isLoading) {
    return <LoginPage />;
  }

  return <LoginPage />;
};
