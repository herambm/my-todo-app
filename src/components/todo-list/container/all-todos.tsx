import * as React from "react";
import { useQuery } from "@apollo/client";
import { Box, CircularProgress, Divider, makeStyles } from "@material-ui/core";
import { ToDoListRenderer } from "../renderer/todo-list-renderer";
import { GET_TODOS } from "../../../data/graphql/get-to-dos";
import { ToDoCreator } from "../../todo-create";
import { TopBar } from "../../top-bar/container/top-bar";

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
  const { data, loading, error } = useQuery(GET_TODOS);

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
        <Box className={classes.title}>All</Box>
        <ToDoCreator />
        <Divider />
        {<ToDoListRenderer todos={data?.todos ?? []} />}
      </Box>
    </Box>
  );
};
