import * as React from "react";
import { Box, Divider, makeStyles } from "@material-ui/core";
import { ToDoListRenderer } from "../renderer/todo-list-renderer";
import { ToDoCreator } from "../../todo-create";
import { TopBar } from "../../top-bar/container/top-bar";
import { TodoListWrapper } from "./todo-list-wrapper";
import { IToDoResponse } from "../../../models/to-do.interface";

const useStyles = makeStyles({
  title: {
    fontWeight: "bold",
    fontSize: "1.4rem",
    paddingLeft: "1rem",
  },
  body: {
    marginTop: "1.4rem",
  },
});

export const AllToDos: React.FunctionComponent = () => {
  const classes = useStyles();

  const componentWithTodos = React.useCallback(
    (todos: IToDoResponse[]) => (
      <Box>
        <TopBar />
        <Box role="main" className={classes.body}>
          <Box className={classes.title}>All</Box>
          <ToDoCreator />
          <Divider />
          {<ToDoListRenderer todos={todos ?? []} />}
        </Box>
      </Box>
    ),
    [classes]
  );

  return <TodoListWrapper componentWithTodos={componentWithTodos} />;
};
