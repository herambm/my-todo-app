import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";

export interface ILogoutButtonProps {
  className?: string;
}

export const LogoutButton: React.FunctionComponent<ILogoutButtonProps> = ({
  className,
}) => {
  const { logout } = useAuth0();
  const onLogOut = React.useCallback(
    () => logout({ returnTo: window.location.origin }),
    [logout]
  );

  return (
    <Button onClick={onLogOut} className={className}>
      Log out
    </Button>
  );
};
