import * as React from "react";
import { isToday } from "date-fns";
import { IToDoResponse } from "../../../models/to-do.interface";
import { ToDoListRenderer } from "../renderer/todo-list-renderer";
import { Box, Divider, makeStyles } from "@material-ui/core";
import { ToDoCreator } from "../../todo-create/container/todo-creator";
import { TopBar } from "../../top-bar/container/top-bar";
import { TodoListWrapper } from "./todo-list-wrapper";

const useStyles = makeStyles({
  title: {
    fontWeight: "bold",
    fontSize: "1.4rem",
  },
  body: {
    marginTop: "1.4rem",
  },
});

export const MyDay: React.FunctionComponent = () => {
  const classes = useStyles();

  const filter = React.useCallback(
    (todos: IToDoResponse[]) =>
      todos.filter((todo: any) => isToday(new Date(todo.created_at))) ?? [],
    []
  );

  const componentWithTodos = React.useCallback(
    (todos: IToDoResponse[]) => (
      <Box>
        <TopBar />
        <Box role="main" className={classes.body}>
          <Box className={classes.title}>My day</Box>
          <ToDoCreator />
          <Divider />
          <ToDoListRenderer todos={todos} />
        </Box>
      </Box>
    ),
    [classes]
  );

  return (
    <TodoListWrapper filter={filter} componentWithTodos={componentWithTodos} />
  );
};
