import * as React from "react";
import { Box, Divider, makeStyles } from "@material-ui/core";
import { ToDoListRenderer } from "../renderer/todo-list-renderer";
import { ToDoCreator } from "../../todo-create";
import { TodoListWrapper } from "./todo-list-wrapper";
import { Todos } from "../../../generated/graphql";

const useStyles = makeStyles({
  title: {
    fontWeight: "bold",
    fontSize: "1.4rem",
  },
  body: {
    marginTop: "1.4rem",
  },
});

export const ImportantToDos: React.FunctionComponent = () => {
  const classes = useStyles();

  const filter = React.useCallback(
    (todos: Todos[]) => todos.filter((todo: any) => !!todo.is_important) ?? [],
    []
  );

  const componentWithTodos = React.useCallback(
    (todos: Todos[]) => (
      <Box role="main" className={classes.body}>
        <Box className={classes.title}>Important</Box>
        <ToDoCreator />
        <Divider />
        <ToDoListRenderer todos={todos} />
      </Box>
    ),
    [classes]
  );

  return (
    <TodoListWrapper filter={filter} componentWithTodos={componentWithTodos} />
  );
};
