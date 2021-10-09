import { useQuery } from "@apollo/client";
import { Box, CircularProgress, Divider, makeStyles } from "@material-ui/core";
import * as React from "react";
import { ToDoListRenderer } from "../renderer/todo-list-renderer";
import { GET_TODOS } from "../../../data/graphql/get-to-dos";
import { IToDo } from "../../../models/to-do.interface";
import { ToDoCreator } from "../../todo-create";

const useStyles = makeStyles({
  title: {
    fontWeight: "bold",
    fontSize: "1.4rem",
  },
});

export const ImportantToDos: React.FunctionComponent = () => {
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
    <Box>
      <Box className={classes.title}>Important</Box>
      <ToDoCreator />
      <Divider />
      <ToDoListRenderer todos={importantTodos} />
    </Box>
  );
};
