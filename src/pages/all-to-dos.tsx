import * as React from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  makeStyles,
} from "@material-ui/core";
import { ToDoCreate } from "../components/to-do-create";
import { ToDoList } from "../components/to-do-list";
import { GET_TODOS } from "../data/graphql/get-to-dos";

const useStyles = makeStyles({
  title: {
    fontWeight: "bold",
    fontSize: "1.4rem",
    paddingLeft: "1rem",
  },
});

export const AllToDos = () => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_TODOS);

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <div>Something went wrong...</div>;
  }
  return (
    <Container>
      <Box className={classes.title}>All</Box>
      <ToDoCreate />
      <Divider />
      {<ToDoList todos={data?.todos ?? []} />}
    </Container>
  );
};
