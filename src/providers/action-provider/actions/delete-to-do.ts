import { ApolloClient } from "@apollo/client";
import { DELETE_TO_DO } from "../../../data/graphql/delete-to-do";
import { GET_TODOS } from "../../../data/graphql/get-to-dos";
import {
  GetToDosQuery,
  GetToDosQueryVariables,
} from "../../../generated/graphql";

export type IDeleteTodo = (
  client: ApolloClient<object>,
  id: number
) => Promise<boolean>;

export const deleteTodo = (client: ApolloClient<object>, id: number) => {
  return client
    .mutate({
      mutation: DELETE_TO_DO,
      variables: {
        id,
      },
      optimisticResponse: {
        delete_todos: {
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
          existingTodos?.todos?.filter((todo) => todo.id !== id) ?? [];

        cache.writeQuery({
          query: GET_TODOS,
          data: { todos: newTodos },
        });
      },
    })
    .then(() => true);
};
