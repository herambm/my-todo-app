import * as React from "react";
import { useQuery } from "@apollo/client";
import { ToDoCreate } from "../components/to-do-create";
import { isToday } from "date-fns";
import { IToDo } from "../models/to-do.interface";
import { ToDoList } from "../components/to-do-list";
import { Box, Container, Divider, makeStyles } from "@material-ui/core";
import { GET_TODOS } from "../data/graphql/get-to-dos";

const useStyles = makeStyles({
  title: {
    fontWeight: "bold",
    fontSize: "1.4rem",
  },
});

export const MyDay: React.FunctionComponent = () => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_TODOS);
  const myDay = React.useMemo<IToDo[]>(
    () =>
      data?.todos?.filter((todo: IToDo) =>
        isToday(new Date(todo.created_at))
      ) ?? [],
    [data]
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong...</div>;
  }
  return (
    <Container>
      <Box className={classes.title}>My day</Box>
      <ToDoCreate />
      <Divider />
      <ToDoList todos={myDay} />
    </Container>
  );
};
