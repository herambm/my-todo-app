import * as React from "react";
import { useQuery } from "@apollo/client";
import { isToday } from "date-fns";
import { IToDo } from "../../../models/to-do.interface";
import { ToDoListRenderer } from "../renderer/todo-list-renderer";
import { Box, CircularProgress, Divider, makeStyles } from "@material-ui/core";
import { GET_TODOS } from "../../../data/graphql/get-to-dos";
import { ToDoCreator } from "../../todo-create/container/todo-creator";
import { TopBar } from "../../top-bar/container/top-bar";

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
  const { data, loading, error } = useQuery(GET_TODOS);
  const myDay = React.useMemo<IToDo[]>(
    () =>
      data?.todos?.filter((todo: IToDo) =>
        isToday(new Date(todo.created_at))
      ) ?? [],
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
      <TopBar />
      <Box role="main" className={classes.body}>
        <Box className={classes.title}>My day</Box>
        <ToDoCreator />
        <Divider />
        <ToDoListRenderer todos={myDay} />
      </Box>
    </Box>
  );
};
