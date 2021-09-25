import { useQuery } from "@apollo/client";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  makeStyles,
} from "@material-ui/core";
import * as React from "react";
import { ToDoCreate } from "../components/to-do-create";
import { ToDoList } from "../components/to-do-list";
import { GET_TODOS } from "../data/graphql/get-to-dos";
import { IToDo } from "../models/to-do.interface";

const useStyles = makeStyles({
  title: {
    fontWeight: "bold",
    fontSize: "1.4rem",
  },
});

export const ImportantToDos = () => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_TODOS);
  const importantTodos = React.useMemo<IToDo[]>(
    () => data?.todos.filter((todo: any) => !!todo.is_important) ?? [],
    [data]
  );

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <div>Something went wrong...</div>;
  }
  return (
    <Container>
      <Box className={classes.title}>Important</Box>
      <ToDoCreate />
      <Divider />
      <ToDoList todos={importantTodos} />
    </Container>
  );
};
