import { useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import { GET_TODOS } from "../../../data/graphql/get-to-dos";
import { Todos } from "../../../generated/graphql";

export interface ITodoListWrapperProps {
  filter?: (todos: Todos[]) => Todos[];
  componentWithTodos: (todos: Todos[]) => React.ReactElement;
}

export const TodoListWrapper: React.FunctionComponent<ITodoListWrapperProps> =
  ({ filter, componentWithTodos }) => {
    // TODO: Add IDb support
    const { data, loading, error } = useQuery(GET_TODOS);

    const filteredTodos = React.useMemo(() => {
      const todos = [...(data?.todos ?? [])];
      todos.sort(
        (todo1: Todos, todo2: Todos) =>
          new Date(todo2.created_at).getTime() -
          new Date(todo1.created_at).getTime()
      );
      return filter ? filter(todos) : todos;
    }, [filter, data?.todos]);

    if (loading && filteredTodos.length === 0) {
      return <CircularProgress />;
    }

    if (error && !loading && filteredTodos.length === 0) {
      return <div>Something went wrong...</div>;
    }

    return componentWithTodos(filteredTodos ?? []);
  };
