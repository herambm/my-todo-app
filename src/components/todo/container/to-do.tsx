import * as React from "react";
import { useMutation } from "@apollo/client";
import { GET_TODOS } from "../../../data/graphql/get-to-dos";
import { UPDATE_TO_DO } from "../../../data/graphql/update-to-do";
import { IToDo } from "../../../models/to-do.interface";
import { ToDoRenderer } from "../renderer/todo-renderer";

export interface IToDoProps {
  todo: IToDo;
}

export const ToDo: React.FunctionComponent<
  React.PropsWithChildren<IToDoProps>
> = ({ todo }) => {
  const [updateToDo] = useMutation(UPDATE_TO_DO);

  const onCompleted = React.useCallback(async () => {
    try {
      // Update idb
      await updateToDo({
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
    } catch {
      console.log("Completed action on todo failed");
    }
  }, [
    todo.id,
    todo.title,
    todo.is_important,
    todo.due_by,
    todo.is_completed,
    updateToDo,
  ]);

  const actions = React.useMemo(() => ({ onCompleted }), [onCompleted]);

  return <ToDoRenderer todo={todo} actions={actions} />;
};
