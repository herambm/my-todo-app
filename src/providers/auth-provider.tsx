import { useAuth0 } from "@auth0/auth0-react";
import * as React from "react";

export const AuthProvider: React.FunctionComponent<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const { isAuthenticated, isLoading, error, loginWithRedirect } = useAuth0();
  if (isAuthenticated) {
    return <>{children}</>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error && !isLoading) {
    <button onClick={loginWithRedirect}>Log in</button>;
  }

  return <button onClick={loginWithRedirect}>Log in</button>;
};
