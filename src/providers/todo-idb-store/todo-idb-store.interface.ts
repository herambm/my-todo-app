import { Todos } from "../../generated/graphql";

export interface ITodoIDbStore {
  addTodo(todo: Todos): Promise<void>;
  addTodos(todo: Todos[]): Promise<void>;
  putTodo(todo: Todos): Promise<void>;
  putTodos(todo: Todos[]): Promise<void>;
  getTodo(key: number): Promise<Todos | undefined>;
  getTodos(): Promise<Todos[] | undefined>;
}
