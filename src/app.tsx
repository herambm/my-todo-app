import * as React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import {
  Container,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./providers/auth-provider";
import ApolloGraphqlProvider from "./providers/apollo-gql-provider";
import { TodoMenu } from "./components/todo-menu";
import { AllToDos, ImportantToDos, MyDay } from "./components/todo-list";

const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const AUTH0_AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE;

const useStyles = makeStyles({
  layout: {
    display: "flex",
    margin: "unset",
  },
  pageContent: {
    paddingTop: "1.5rem",
    padding: "1rem",
    background: "#F3F9FB",
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#226597",
    },
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
          <Router>
            <ThemeProvider theme={theme}>
              <Container className={classes.layout} disableGutters={true}>
                <TodoMenu />
                <Container
                  className={classes.pageContent}
                  disableGutters={true}
                >
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
            </ThemeProvider>
          </Router>
        </ApolloGraphqlProvider>
      </AuthProvider>
    </Auth0Provider>
  );
}
