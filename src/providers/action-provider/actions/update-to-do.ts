import { ApolloClient } from "@apollo/client";
import { GET_TODOS } from "../../../data/graphql/get-to-dos";
import { UPDATE_TO_DO } from "../../../data/graphql/update-to-do";
import {
  GetToDosQuery,
  GetToDosQueryVariables,
} from "../../../generated/graphql";

export type IUpdateTodo = (
  client: ApolloClient<object>,
  id: number,
  patch: ITodoPatch
) => Promise<boolean>;

export interface ITodoPatch {
  title: string;
  is_important: boolean;
  is_completed: boolean;
  due_by: string | null;
}

export const updateTodo: IUpdateTodo = (
  client: ApolloClient<object>,
  id: number,
  patch: ITodoPatch
) => {
  if (Object.keys(patch).length === 0) {
    console.log("No updates to be made");
  }

  return client
    .mutate({
      mutation: UPDATE_TO_DO,
      variables: {
        id,
        ...patch,
      },
      optimisticResponse: {
        update_todos: {
          affected_rows: 1,
          __typename: "todos_mutation_response",
        },
      },
      update: (cache) => {
        const existingTodos = cache.readQuery<
          GetToDosQuery,
          GetToDosQueryVariables
        >({
          query: GET_TODOS,
        });

        const newTodos =
          existingTodos?.todos?.map((todo) =>
            todo.id === id ? { ...todo, ...patch } : todo
          ) ?? [];

        cache.writeQuery({
          query: GET_TODOS,
          data: { todos: newTodos },
        });
      },
    })
    .then(() => true);
};
