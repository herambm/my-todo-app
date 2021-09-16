import { Box, Container, Divider, makeStyles } from "@material-ui/core";
import * as React from "react";
import { IToDo } from "../models/to-do.interface";
import { ToDo } from "./to-do";

const useStyles = makeStyles({
  list: {
    padding: "1.1rem",
    paddingTop: "0.5rem !important",
  },
  completedTitle: {
    marginTop: "0.8rem",
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
});

export interface IToDoListProps {
  todos: IToDo[];
}

export const ToDoList: React.FunctionComponent<
  React.PropsWithChildren<IToDoListProps>
> = ({ todos }) => {
  const classes = useStyles();

  const completedToDos = React.useMemo(
    () => todos.filter((todo) => !!todo.is_completed),
    [todos]
  );
  const activeToDos = React.useMemo(
    () => todos.filter((todo) => !todo.is_completed),
    [todos]
  );

  return (
    <Container className={classes.list}>
      {activeToDos.length > 0 && (
        <Box>
          {activeToDos.map((todo) => (
            <ToDo todo={todo} key={todo.id} />
          ))}
        </Box>
      )}
      {completedToDos.length > 0 && (
        <Box>
          {activeToDos.length > 0 && <Divider />}
          <Box className={classes.completedTitle}>Completed</Box>
          {completedToDos.map((todo) => (
            <ToDo todo={todo} key={todo.id} />
          ))}
        </Box>
      )}
    </Container>
  );
};
