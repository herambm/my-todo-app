import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import * as React from "react";
import { Todos } from "../../generated/graphql";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useActionProvider } from "../action-provider";
import { useApolloClient } from "@apollo/client";

const useStyle = makeStyles({
  header: {
    paddingBottom: "0rem",
  },
  titlePrimary: {
    display: "flex",
  },
  checkBox: {
    width: "3rem",
    height: "3rem",
    marginTop: "0.8rem",
    marginRight: "0.2rem",
  },
  important: {
    width: "3rem",
    height: "3rem",
    marginTop: "0.8rem",
    marginLeft: "0.2rem",
  },
});

interface ITodoDialogContext {
  openDialog: (todo: Todos) => void;
  closeDialog: () => void;
}

const TodoDialogContext = React.createContext<ITodoDialogContext>(
  undefined as any
);

export const useTodoDialogContext = () =>
  React.useContext<ITodoDialogContext>(TodoDialogContext);

// Todo: Move dialog component to components folder.
export const TodoDialogProvider: React.FunctionComponent<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const classes = useStyle();
  const [open, setOpen] = React.useState(false);
  const [todo, setTodo] = React.useState<Todos | undefined>(undefined);
  const client = useApolloClient();
  const actionProvider = useActionProvider();

  const onInputChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setTodo({
        ...(todo as Todos),
        title: ev.target.value,
      });
    },
    [todo, setTodo]
  );

  const openDialog = React.useCallback(
    (todo: Todos) => {
      setTodo(todo);
      setOpen(true);
    },
    [setTodo, setOpen]
  );

  const closeDialog = React.useCallback(() => {
    setOpen(false);
    setTodo(undefined);
  }, [setTodo, setOpen]);

  const onUpdate = React.useCallback(
    (
      patch: {
        title?: string;
        is_important?: boolean;
        is_completed?: boolean;
        due_by?: string;
      } = {}
    ) => {
      if (todo) {
        return actionProvider
          .updateTodo(client, todo.id, {
            title: todo.title,
            is_important: !!todo.is_important,
            is_completed: !!todo.is_completed,
            due_by: todo.due_by,
            ...patch,
          })
          .then(() => console.log(`Task:${todo.id} updated.`))
          .catch(() => console.log(`Task:${todo.id} update failed.`));
      }
    },
    [actionProvider, client, todo]
  );

  const onCompleted = React.useCallback(() => {
    todo &&
      setTodo({
        ...(todo as Todos),
        is_completed: !todo?.is_completed,
      });

    onUpdate({ is_completed: !todo?.is_completed })?.catch(() => {
      setTodo({ ...(todo as Todos), is_completed: !todo?.is_completed });
    });
  }, [onUpdate, todo]);

  const onImportant = React.useCallback(() => {
    todo &&
      setTodo({
        ...(todo as Todos),
        is_important: !todo?.is_important,
      });

    onUpdate({ is_important: !todo?.is_important })?.catch(() => {
      setTodo({ ...(todo as Todos), is_important: !todo?.is_important });
    });
  }, [onUpdate, todo]);

  const onUpdateButtonClick = React.useCallback(() => {
    onUpdate({ title: todo?.title });
    setOpen(false);
  }, [onUpdate, todo]);

  const todoDialogContextValue = React.useMemo(
    () => ({
      openDialog,
      closeDialog,
    }),
    [openDialog, closeDialog]
  );

  return (
    <TodoDialogContext.Provider value={todoDialogContextValue}>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.header}>
          Todo
        </DialogTitle>
        <DialogContent>
          <Box className={classes.titlePrimary}>
            <Checkbox
              checked={!!todo?.is_completed}
              color="primary"
              className={classes.checkBox}
              onChange={onCompleted}
              aria-label={`Mark task as ${
                todo?.is_completed ? "incomplete" : "complete"
              }.`}
            />
            <TextField
              autoFocus
              value={todo?.title ?? ""}
              id="name"
              label="Title"
              fullWidth
              onChange={onInputChange}
            />
            <IconButton
              className={classes.important}
              onClick={onImportant}
              aria-label={`Mark task as ${
                todo?.is_important ? "unimportant" : "important"
              }.`}
            >
              {todo?.is_important ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Close
          </Button>
          <Button onClick={onUpdateButtonClick} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {children}
    </TodoDialogContext.Provider>
  );
};
