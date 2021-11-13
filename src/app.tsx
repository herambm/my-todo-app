import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "./providers/auth-provider/auth-provider";
import { TodoApp } from "./layouts/todo-app";
import { UiThemeProvider } from "./providers/theme-provider";

const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const AUTH0_AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE;

export default function App() {
  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN ?? ""}
      clientId={AUTH0_CLIENT_ID ?? ""}
      audience={AUTH0_AUDIENCE ?? ""}
      redirectUri={window.location.origin}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <UiThemeProvider>
        <AuthProvider>
          <TodoApp />
        </AuthProvider>
      </UiThemeProvider>
    </Auth0Provider>
  );
}
