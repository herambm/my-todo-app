import * as React from "react";
import { Box, makeStyles, Checkbox, IconButton } from "@material-ui/core";
import classNames from "classnames";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Todos } from "../../../generated/graphql";

const useStyle = makeStyles({
  toDo: {
    display: "flex",
    alignItems: "center",
    padding: "0.75rem 1.5rem 0.75rem 0rem",
  },
  toDoRightItems: {
    display: "flex",
  },
  todoRightItem: {
    "&:hover": {
      cursor: "pointer",
    },
    marginLeft: "0.2rem",
    marginRight: "0.2rem",
  },
  todoRightItemIcon: {
    padding: "1rem",
    width: "2rem",
    height: "2rem",
  },
  content: {
    width: "100%",
    paddingRight: "2.5rem",
    paddingLeft: "0.5rem",
  },
});

export interface IActions {
  onCompleted: () => Promise<void>;
  onImportant: () => Promise<void>;
}

export interface IToDoRendererProps {
  todo: Todos;
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
      <Box className={classes.toDoRightItems}>
        <IconButton
          className={classes.todoRightItemIcon}
          onClick={actions.onImportant}
        >
          {todo.is_important ? (
            <StarIcon className={classes.todoRightItem} />
          ) : (
            <StarBorderIcon className={classes.todoRightItem} />
          )}
        </IconButton>
        <IconButton className={classes.todoRightItemIcon}>
          <MoreVertIcon className={classes.todoRightItem} />
        </IconButton>
      </Box>
    </Box>
  );
};
