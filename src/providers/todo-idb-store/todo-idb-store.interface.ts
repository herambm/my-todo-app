import { IToDo } from "../../models/to-do.interface";

export interface ITodoIDbStore {
  addTodo(todo: IToDo): Promise<void>;
  addTodos(todo: IToDo[]): Promise<void>;
  putTodo(todo: IToDo): Promise<void>;
  putTodos(todo: IToDo[]): Promise<void>;
  getTodo(key: number): Promise<IToDo | undefined>;
  getTodos(): Promise<IToDo[] | undefined>;
}
