import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MyDay } from "./pages/my-day";
import { ImportantToDos } from "./pages/important-to-dos";
import { AllToDos } from "./pages/all-to-dos";
import { PageMenu } from "./components/page-menu";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "./providers/auth-provider";
import ApolloGraphqlProvider from "./providers/apollo-gql-provider";
import { Container, makeStyles } from "@material-ui/core";
import { TopBar } from "./components/top-bar";

const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const AUTH0_AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE;

const useStyles = makeStyles({
  layout: {
    display: "flex",
    margin: "unset",
  },
  pageContent: {
    paddingTop: "1rem",
  },
});

export default function App() {
  const classes = useStyles();

  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN ?? ""}
      clientId={AUTH0_CLIENT_ID ?? ""}
      audience={AUTH0_AUDIENCE ?? ""}
      redirectUri={window.location.origin}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <AuthProvider>
        <ApolloGraphqlProvider>
          <TopBar />
          <Router>
            <Container className={classes.layout} disableGutters={true}>
              <PageMenu />
              <Container className={classes.pageContent} disableGutters={true}>
                <Switch>
                  <Route path="/my-day">
                    <MyDay />
                  </Route>
                  <Route path="/important">
                    <ImportantToDos />
                  </Route>
                  <Route path="/">
                    <AllToDos />
                  </Route>
                </Switch>
              </Container>
            </Container>
          </Router>
        </ApolloGraphqlProvider>
      </AuthProvider>
    </Auth0Provider>
  );
}
