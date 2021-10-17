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
    const { data, loading, error } = useQuery(GET_TODOS);

    const filteredTodos = React.useMemo(() => {
      return filter && data?.todos ? filter(data.todos) : data?.todos;
    }, [filter, data?.todos]);

    if (loading && !filteredTodos) {
      return <CircularProgress />;
    }

    if (error && !filteredTodos) {
      return <div>Something went wrong...</div>;
    }

    return componentWithTodos(filteredTodos ?? []);
  };
