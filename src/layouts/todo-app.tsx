import { Box, Divider, makeStyles } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import { TodoDialogProvider } from "../providers/todo-dialog-provider/todo-dialog-provider";
import { AllToDos, ImportantToDos, MyDay } from "../components/todo-list";
import { TodoMenu } from "../components/todo-menu";
import { TopBar } from "../components/top-bar";
import { ActionProvider } from "../providers/action-provider";
import { TodoIDbStoreProvider } from "../providers/todo-idb-store";
import { BrowserRouter as Router } from "react-router-dom";

const useStyles = makeStyles({
  layout: {
    display: "flex",
  },
  menu: {
    flex: 1,
  },
  content: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    flex: 5,
  },
});

export const TodoApp = () => {
  const classes = useStyles();

  return (
    <Router>
      <Box>
        <TopBar />
        <Box className={classes.layout}>
          <Box className={classes.menu}>
            <TodoMenu />
          </Box>
          <Divider orientation="vertical" flexItem />
          <TodoIDbStoreProvider>
            <ActionProvider>
              <TodoDialogProvider>
                <Box className={classes.content}>
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
                </Box>
              </TodoDialogProvider>
            </ActionProvider>
          </TodoIDbStoreProvider>
        </Box>
      </Box>
    </Router>
  );
};
