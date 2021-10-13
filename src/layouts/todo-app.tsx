import { Box, Divider, makeStyles } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import { AllToDos, ImportantToDos, MyDay } from "../components/todo-list";
import { TodoMenu } from "../components/todo-menu";

const useStyles = makeStyles({
  layout: {
    display: "flex",
  },
  menu: {
    flex: 1,
    padding: "1rem",
  },
  content: {
    flex: 5,
    padding: "1rem",
  },
});

export const TodoApp = () => {
  const classes = useStyles();

  return (
    <Box className={classes.layout}>
      <Box className={classes.menu}>
        <TodoMenu />
      </Box>
      <Divider orientation="vertical" flexItem />
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
    </Box>
  );
};
