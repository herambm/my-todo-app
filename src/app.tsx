import { Auth0Provider } from "@auth0/auth0-react";
import { TodoApp } from "./layouts/todo-app";
import { UiThemeProvider } from "./providers/theme-provider";
import { ApolloGraphqlProvider } from "./providers/apollo-gql-provider";

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
      <ApolloGraphqlProvider>
        <UiThemeProvider>
          <TodoApp />
        </UiThemeProvider>
      </ApolloGraphqlProvider>
    </Auth0Provider>
  );
}
