import * as React from "react";
import { deleteTodo, IDeleteTodo } from "./actions/delete-to-do";
import { IUpdateTodo, updateTodo } from "./actions/update-to-do";

export interface IActionProvider {
  updateTodo: IUpdateTodo;
  deleteTodo: IDeleteTodo;
}

const ActionProviderContext = React.createContext<IActionProvider>(
  undefined as any
);

export const ActionProvider: React.FunctionComponent<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const value = React.useRef<IActionProvider>({
    updateTodo,
    deleteTodo,
  });

  return (
    <ActionProviderContext.Provider value={value.current}>
      {children}
    </ActionProviderContext.Provider>
  );
};

export const useActionProvider = () => React.useContext(ActionProviderContext);
