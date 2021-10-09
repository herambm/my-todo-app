import { Box, Divider, makeStyles } from "@material-ui/core";
import * as React from "react";
import { IToDo } from "../../../models/to-do.interface";
import { ToDo } from "../../to-do";
import classNames from "classnames/bind";

const useStyles = makeStyles({
  list: {
    padding: "1.1rem",
    paddingTop: "0.5rem !important",
  },
  completedTitle: {
    marginTop: "0.8rem",
    fontSize: "1.4rem",
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
});

export interface IToDoListProps {
  todos: IToDo[];
  className?: string;
}

export const ToDoListRenderer: React.FunctionComponent<
  React.PropsWithChildren<IToDoListProps>
> = ({ todos, className }) => {
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
    <Box className={classNames(classes.list, className)}>
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
    </Box>
  );
};
