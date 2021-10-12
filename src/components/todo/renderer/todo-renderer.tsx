import * as React from "react";
import { Box, makeStyles, Checkbox } from "@material-ui/core";
import { IToDo } from "../../../models/to-do.interface";
import classNames from "classnames";

const useStyle = makeStyles({
  toDo: {
    display: "flex",
    alignItems: "center",
    padding: "0.75rem 1.5rem 0.75rem 0rem",
  },
  content: {
    width: "100%",
    paddingRight: "2.5rem",
    paddingLeft: "0.5rem",
  },
});

export interface IActions {
  onCompleted: () => Promise<void>;
}

export interface IToDoRendererProps {
  todo: IToDo;
  actions: IActions;
  className?: string;
}

export const ToDoRenderer: React.FunctionComponent<
  React.PropsWithChildren<IToDoRendererProps>
> = ({ todo, actions, className }) => {
  const classes = useStyle();

  return (
    <Box className={classNames(classes.toDo, className)}>
      <Checkbox
        checked={!!todo.is_completed}
        color="primary"
        onChange={actions.onCompleted}
      />
      <Box className={classes.content}>{todo.title}</Box>
    </Box>
  );
};
