import * as React from "react";
import { TodoIDbStore } from "./todo-idb-store";
import { ITodoIDbStore } from "./todo-idb-store.interface";

export const TodoIDbStoreContext = React.createContext<ITodoIDbStore>(
  undefined as any
);

export const TodoIDbStoreProvider: React.FunctionComponent<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const todoStore = React.useRef(new TodoIDbStore());

  return (
    <TodoIDbStoreContext.Provider value={todoStore.current}>
      {children}
    </TodoIDbStoreContext.Provider>
  );
};

export const useTodoIDbStore = () =>
  React.useContext<ITodoIDbStore>(TodoIDbStoreContext);
