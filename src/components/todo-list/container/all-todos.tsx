import * as React from "react";
import { useQuery } from "@apollo/client";
import { Box, CircularProgress, Divider, makeStyles } from "@material-ui/core";
import { ToDoListRenderer } from "../renderer/todo-list-renderer";
import { GET_TODOS } from "../../../data/graphql/get-to-dos";
import { ToDoCreator } from "../../todo-create";

const useStyles = makeStyles({
  title: {
    fontWeight: "bold",
    fontSize: "1.4rem",
    paddingLeft: "1rem",
  },
});

export const AllToDos: React.FunctionComponent = () => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_TODOS);

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <div>Something went wrong...</div>;
  }
  return (
    <Box>
      <Box className={classes.title}>All</Box>
      <ToDoCreator />
      <Divider />
      {<ToDoListRenderer todos={data?.todos ?? []} />}
    </Box>
  );
};
