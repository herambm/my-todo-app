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

const useStyles = makeStyles({
  layout: {
    display: "flex",
  },
  pageContent: {
    paddingTop: "2rem",
  },
});

export default function MyToDo() {
  const classes = useStyles();

  return (
    <Auth0Provider
      domain="dev-bcufvmxd.us.auth0.com"
      clientId="uULH6wnDFn84BrTI1M7Pitr1VcBAbtwv"
      audience="https://take-my-todo/auth"
      redirectUri={window.location.origin}
    >
      <AuthProvider>
        <ApolloGraphqlProvider>
          <Router>
            <Container className={classes.layout}>
              <PageMenu />
              <Container className={classes.pageContent}>
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
