import { useMutation } from "@apollo/client";
import { Box, Container, makeStyles, Checkbox } from "@material-ui/core";
import { Star, StarBorder } from "@material-ui/icons";
import * as React from "react";
import { GET_TODOS } from "../../data/graphql/get-to-dos";
import { UPDATE_TO_DO } from "../../data/graphql/update-to-do";
import { IToDo } from "../../models/to-do.interface";

const useStyle = makeStyles({
  toDo: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "unset",
    paddingRight: "unset",
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
  },
  content: {
    width: "100%",
    paddingRight: "2.5rem",
    paddingLeft: "0.5rem",
  },
});

export interface IToDoProps {
  todo: IToDo;
}

export const ToDo: React.FunctionComponent<
  React.PropsWithChildren<IToDoProps>
> = ({ todo }) => {
  const classes = useStyle();
  const [updateToDo] = useMutation(UPDATE_TO_DO);

  const onCompletedToggle = React.useCallback(() => {
    updateToDo({
      variables: {
        id: todo.id,
        title: todo.title,
        is_important: todo.is_important,
        is_completed: !todo.is_completed,
        due_by: todo.due_by,
      },
      optimisticResponse: true,
      update: (cache) => {
        const existingTodos = cache.readQuery({ query: GET_TODOS }) as any;
        const newTodos = existingTodos.todos.map((t: any) => {
          if (t.id === todo.id) {
            return { ...t, is_completed: !todo.is_completed };
          } else {
            return t;
          }
        });
        cache.writeQuery({
          query: GET_TODOS,
          data: { todos: newTodos },
        });
      },
    });
  }, [
    todo.id,
    todo.title,
    todo.is_important,
    todo.due_by,
    todo.is_completed,
    updateToDo,
  ]);

  return (
    <Container className={classes.toDo}>
      <Checkbox
        checked={!!todo.is_completed}
        color="primary"
        onChange={onCompletedToggle}
      />
      <Box className={classes.content}>{todo.title}</Box>
      {todo.is_important ? <Star color="primary" /> : <StarBorder />}
    </Container>
  );
};
