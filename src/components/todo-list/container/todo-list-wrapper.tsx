import { useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import { GET_TODOS } from "../../../data/graphql/get-to-dos";
import { IToDoResponse } from "../../../models/to-do.interface";
import { useTodoIDbStore } from "../../../providers/todo-idb-store";

export interface ITodoListWrapperProps {
  filter?: (todos: IToDoResponse[]) => IToDoResponse[];
  componentWithTodos: (todos: IToDoResponse[]) => React.ReactElement;
}

export const TodoListWrapper: React.FunctionComponent<ITodoListWrapperProps> =
  ({ filter, componentWithTodos }) => {
    const { data, loading, error } = useQuery(GET_TODOS);
    // Todo: Remove this and pass idb data in apollo cache
    const [idbTodos, setIdbTodos] = React.useState<undefined | IToDoResponse>(
      undefined
    );
    const todoIdbStore = useTodoIDbStore();

    const filteredTodos = React.useMemo(() => {
      return filter && data?.todos ? filter(data.todos) : data?.todos;
    }, [filter, data?.todos]);

    React.useEffect(() => {
      if (!loading && !error && data?.todos) {
        todoIdbStore.putTodos(data.todos);
      }
    }, [todoIdbStore, loading, error, data?.todos]);

    React.useEffect(() => {
      if ((loading || error) && !data?.todos) {
        todoIdbStore.getTodos().then((todos) => {
          setIdbTodos(todos as any);
        });
      }
    }, [loading, error, data?.todos, setIdbTodos, todoIdbStore]);

    if (loading && !idbTodos) {
      return <CircularProgress />;
    }

    if (error && !idbTodos) {
      return <div>Something went wrong...</div>;
    }

    return componentWithTodos(filteredTodos ?? idbTodos ?? []);
  };
