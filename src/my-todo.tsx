import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MyDay } from "./pages/my-day";
import { ImportantToDos } from "./pages/important-to-dos";
import { AllToDos } from "./pages/all-to-dos";
import { PageMenu } from "./components/page-menu";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "./providers/auth-provider";
import ApolloGraphqlProvider from "./providers/apollo-gql-provider";
import { Box, Container, makeStyles } from "@material-ui/core";
import { ListAlt } from "@material-ui/icons";

const useStyles = makeStyles({
  layout: {
    display: "flex",
    margin: "unset",
  },
  pageContent: {
    paddingTop: "1rem",
  },
  topBar: {
    maxWidth: "unset",
    height: "3rem",
    padding: "unset",
    margin: "unset",
    display: "flex",
    alignItems: "center",
    fontSize: "1.5rem",
    paddingLeft: "1rem",
    background: "#3f51b5",
    color: "white",
  },
  topBarTitle: {
    marginLeft: "0.1rem",
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
          <Container className={classes.topBar}>
            <ListAlt />
            <Box className={classes.topBarTitle}>My ToDo</Box>
          </Container>
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
