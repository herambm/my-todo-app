import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";
import * as React from "react";

export const Login: React.FunctionComponent = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button onClick={loginWithRedirect} variant="contained" color="primary">
      Log in
    </Button>
  );
};
