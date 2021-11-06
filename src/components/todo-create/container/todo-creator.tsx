import * as React from "react";
import { useMutation } from "@apollo/client";
import { INSERT_TO_DOS } from "../../../data/graphql/insert-to-do";
import { GET_TODOS } from "../../../data/graphql/get-to-dos";
import {
  CreationState,
  ICreateInput,
  ToDoCreateRenderer,
} from "../renderer/todo-creator-renderer";

export const ToDoCreator = () => {
  const [insertToDos, { loading, error }] = useMutation(INSERT_TO_DOS, {
    refetchQueries: [GET_TODOS, "GetToDos"],
  });

  const onCreateAction = React.useCallback(
    async (createInput: ICreateInput) => {
      try {
        await insertToDos({
          variables: {
            title: createInput.inputValue,
            is_important: createInput.isImportant,
            is_completed: createInput.isCompleted,
            due_by: createInput.dueBy,
          },
        });
      } catch {
        console.log("Create todo failed");
      }
    },
    [insertToDos]
  );

  return (
    <ToDoCreateRenderer
      onCreateAction={onCreateAction}
      state={
        loading
          ? CreationState.Loading
          : error
          ? CreationState.Error
          : CreationState.Normal
      }
    />
  );
};
