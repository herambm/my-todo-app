import * as React from "react";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  CircularProgress,
  Container,
  Input,
  makeStyles,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { INSERT_TO_DOS } from "../data/graphql/insert-to-do";
import { GET_TODOS } from "../data/graphql/get-to-dos";

const useStyles = makeStyles({
  createToDo: {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
  },
  input: {
    paddingRight: "0.5rem",
    paddingLeft: "0.5rem",
    width: "38rem",
  },
});

export const ToDoCreate = () => {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState<string>("");
  const [insertToDos, { loading }] = useMutation(INSERT_TO_DOS, {
    refetchQueries: [GET_TODOS, "GetToDos"],
  });

  const onInputChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(ev.target.value);
    },
    [setInputValue]
  );

  const onAddClick = React.useCallback(() => {
    insertToDos({
      variables: {
        title: inputValue,
        is_important: false,
        is_completed: false,
        due_by: null,
      },
    }).then(() => {
      setInputValue("");
    });
  }, [insertToDos, inputValue]);

  return (
    <Container className={classes.createToDo}>
      <AddIcon />
      <Input
        placeholder="Add a task"
        value={inputValue}
        onChange={onInputChange}
        className={classes.input}
      />
      {loading ? (
        <CircularProgress size="1.5rem" />
      ) : (
        <Button onClick={onAddClick} color="primary">
          Add
        </Button>
      )}
    </Container>
  );
};
