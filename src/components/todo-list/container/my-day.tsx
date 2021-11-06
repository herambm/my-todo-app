import * as React from "react";
import { isToday } from "date-fns";
import { ToDoListRenderer } from "../renderer/todo-list-renderer";
import { Box, Divider, makeStyles } from "@material-ui/core";
import { ToDoCreator } from "../../todo-create/container/todo-creator";
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

export const MyDay: React.FunctionComponent = () => {
  const classes = useStyles();
  // TODO: Setup timer to update at start of day
  const [currentDate] = React.useState(
    Intl.DateTimeFormat("en", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date())
  );

  const filter = React.useCallback(
    (todos: Todos[]) =>
      todos.filter((todo: any) => isToday(new Date(todo.created_at))) ?? [],
    []
  );

  const componentWithTodos = React.useCallback(
    (todos: Todos[]) => (
      <Box role="main" className={classes.body}>
        <Box className={classes.title}>My day</Box>
        <Box>{currentDate}</Box>
        <ToDoCreator />
        <Divider />
        <ToDoListRenderer todos={todos} />
      </Box>
    ),
    [classes, currentDate]
  );

  return (
    <TodoListWrapper filter={filter} componentWithTodos={componentWithTodos} />
  );
};
