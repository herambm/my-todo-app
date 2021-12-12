import * as React from "react";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  CircularProgress,
  Container,
  Input,
  makeStyles,
} from "@material-ui/core";
import classNames from "classnames/bind";

const useStyles = makeStyles({
  createToDo: {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
  },
  input: {
    paddingRight: "0.5rem",
    paddingLeft: "0.5rem",
    width: "100%",
    minWidth: "10rem",
  },
  addButton: {
    marginLeft: "0.5rem",
  },
});

export interface ICreateInput {
  inputValue: string;
  isImportant: boolean;
  isCompleted: boolean;
  dueBy: string | null;
}

export enum CreationState {
  Loading,
  Error,
  Normal,
}

export interface ITodoCreate {
  onCreateAction: (createInput: ICreateInput) => Promise<void>;
  state?: CreationState;
  inputPlaceholder?: string;
  actionLabel?: string;
  className?: string;
}

export const ToDoCreateRenderer: React.FunctionComponent<ITodoCreate> = ({
  onCreateAction,
  state = CreationState.Normal,
  inputPlaceholder = "Add a task",
  actionLabel = "Add",
  className,
}) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState<string>("");

  const onInputChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(ev.target.value);
    },
    [setInputValue]
  );

  // Add debounce here.
  const onAddClick = React.useCallback(() => {
    onCreateAction({
      inputValue,
      isCompleted: false,
      isImportant: false,
      dueBy: null,
    }).then(() => setInputValue(""));
  }, [onCreateAction, inputValue]);

  return (
    <Container className={classNames(classes.createToDo, className)}>
      <AddIcon />
      <Input
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={onInputChange}
        className={classes.input}
      />
      {state === CreationState.Loading ? (
        <CircularProgress size="1.5rem" />
      ) : (
        <Button
          onClick={onAddClick}
          color="primary"
          variant="outlined"
          className={classes.addButton}
        >
          {actionLabel}
        </Button>
      )}
    </Container>
  );
};
