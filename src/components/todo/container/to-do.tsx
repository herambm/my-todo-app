import * as React from "react";
import { useApolloClient } from "@apollo/client";
import { ToDoRenderer } from "../renderer/todo-renderer";
import { useActionProvider } from "../../../providers/action-provider";
import { Todos } from "../../../generated/graphql";

export interface IToDoProps {
  todo: Todos;
}

export const ToDo: React.FunctionComponent<
  React.PropsWithChildren<IToDoProps>
> = ({ todo }) => {
  const actionProvider = useActionProvider();
  const client = useApolloClient();

  const onCompleted = React.useCallback(async () => {
    actionProvider
      .updateTodo(client, todo.id, {
        title: todo.title,
        is_important: !!todo.is_important,
        is_completed: !todo.is_completed,
        due_by: todo.due_by,
      })
      .then(() => console.log(`Task:${todo.id} updated.`))
      .catch(() => console.log(`Task:${todo.id} update failed.`));
  }, [todo, client, actionProvider]);

  const onImportant = React.useCallback(async () => {
    actionProvider
      .updateTodo(client, todo.id, {
        title: todo.title,
        is_important: !todo.is_important,
        is_completed: !!todo.is_completed,
        due_by: todo.due_by,
      })
      .then(() => console.log(`Task:${todo.id} updated.`))
      .catch(() => console.log(`Task:${todo.id} update failed.`));
  }, [todo, client, actionProvider]);

  const actions = React.useMemo(
    () => ({ onCompleted, onImportant }),
    [onCompleted, onImportant]
  );

  return <ToDoRenderer todo={todo} actions={actions} />;
};
