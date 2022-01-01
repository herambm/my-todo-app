import { useApolloClient, useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core";
import * as React from "react";
import { GET_TODOS } from "../../../data/graphql/get-to-dos";
import {
  GetToDosQuery,
  GetToDosQueryVariables,
  Todos,
} from "../../../generated/graphql";
import { useTodoIDbStore } from "../../../providers/todo-idb-store";
import { enableIndexDBSupport } from "../../../utils/settings-utils";
import { Spinner } from "../../spinner/spinner";

const useStyles = makeStyles({
  spinner: {
    height: "90%",
  },
});

export interface ITodoListWrapperProps {
  filter?: (todos: Todos[]) => Todos[];
  componentWithTodos: (todos: Todos[]) => React.ReactElement;
}

export const TodoListWrapper: React.FunctionComponent<ITodoListWrapperProps> =
  ({ filter, componentWithTodos }) => {
    const classes = useStyles();
    const { data, loading, error } = useQuery(GET_TODOS);
    const idbStore = useTodoIDbStore();
    const client = useApolloClient();

    React.useEffect(() => {
      if (enableIndexDBSupport && (loading || error) && !data) {
        idbStore.getTodos().then((todos) => {
          const existingTodos = client.cache.readQuery<
            GetToDosQuery,
            GetToDosQueryVariables
          >({
            query: GET_TODOS,
          });

          if (!existingTodos) {
            client.cache.writeQuery({
              query: GET_TODOS,
              data: { todos },
            });
          }
        });
      }
    });

    React.useEffect(() => {
      if (enableIndexDBSupport && !loading && !error && data) {
        data.todos &&
          idbStore
            .putTodos(data.todos)
            .then(() => console.log("Todos written to idb"))
            .catch((e) => console.log("Todos writing to idb failed", e));
      }
    });

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
      return (
        <Spinner
          message={"Loading your tasks in a moment..."}
          className={classes.spinner}
        />
      );
    }

    if (error && !loading && filteredTodos.length === 0) {
      return <div>Something went wrong...</div>;
    }

    return componentWithTodos(filteredTodos ?? []);
  };
