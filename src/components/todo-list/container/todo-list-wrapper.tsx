import { useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import { GET_TODOS } from "../../../data/graphql/get-to-dos";
import { IToDoResponse } from "../../../models/to-do.interface";

export interface ITodoListWrapperProps {
  filter?: (todos: IToDoResponse[]) => IToDoResponse[];
  componentWithTodos: (todos: IToDoResponse[]) => React.ReactElement;
}

export const TodoListWrapper: React.FunctionComponent<ITodoListWrapperProps> =
  ({ filter, componentWithTodos }) => {
    // TODO: Add IDb support
    const { data, loading, error } = useQuery(GET_TODOS);

    const filteredTodos = React.useMemo(() => {
      const todos = [...(data?.todos ?? [])];
      todos.sort(
        (a: IToDoResponse, b: IToDoResponse) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
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
