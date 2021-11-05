import { Box, Divider, makeStyles } from "@material-ui/core";
import * as React from "react";
import { IToDo } from "../../../models/to-do.interface";
import { ToDo } from "../../todo/container/to-do";
import classNames from "classnames/bind";

const useStyles = makeStyles({
  list: {
    padding: "0.5rem",
    paddingTop: "0.5rem !important",
  },
  completedHeader: {
    marginBottom: "0.2rem",
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
            <Box key={todo.id}>
              <ToDo todo={todo} />
              <Divider />
            </Box>
          ))}
        </Box>
      )}
      {completedToDos.length > 0 && (
        <Box>
          {activeToDos.length > 0 && <Divider />}
          <h2 className={classes.completedHeader}>Completed</h2>
          {completedToDos.map((todo) => (
            <Box key={todo.id}>
              <ToDo todo={todo} key={todo.id} />
              <Divider />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
