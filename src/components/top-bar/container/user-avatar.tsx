import { useAuth0 } from "@auth0/auth0-react";
import { Avatar } from "@material-ui/core";
import * as React from "react";

export const UserAvatar: React.FunctionComponent = () => {
  const { user } = useAuth0();

  return (
    <Avatar alt={user?.name ?? user?.given_name} src={user?.picture ?? ""} />
  );
};
