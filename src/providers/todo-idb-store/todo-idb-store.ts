import { IDBPDatabase, openDB } from "idb";
import { Todos } from "../../generated/graphql";
import { IIDb } from "../../models/idb.interface";
import { ITodoIDbStore } from "./todo-idb-store.interface";

export class TodoIDbStore implements ITodoIDbStore {
  private idbPromise: Promise<IDBPDatabase<IIDb>>;

  constructor() {
    this.idbPromise = openDB<IIDb>("todo-store", 1, {
      upgrade: (db) => {
        this.createTodoStore(db);
      },
    });
  }

  public addTodo = async (todo: Todos) => {
    await (await this.idbPromise).add("todos", todo);
  };

  public addTodos = async (todos: Todos[]) => {
    const tx = (await this.idbPromise).transaction("todos", "readwrite");

    await Promise.all(todos.map((todo) => tx.store.add(todo)));
  };

  public putTodo = async (todo: Todos) => {
    await (await this.idbPromise).put("todos", todo);
  };

  public putTodos = async (todos: Todos[]) => {
    const tx = (await this.idbPromise).transaction("todos", "readwrite");

    await Promise.all(todos.map((todo) => tx.store.put(todo)));
  };

  public getTodo = async (key: number) => {
    return await (await this.idbPromise).get("todos", key);
  };

  public getTodos = async (): Promise<Todos[]> => {
    return (
      (await (await this.idbPromise).getAllFromIndex("todos", "created_at")) ??
      []
    );
  };

  private createTodoStore = (db: IDBPDatabase<IIDb>) => {
    const todoStore = db.createObjectStore("todos", { keyPath: "id" });
    todoStore.createIndex("created_at", "created_at");
  };
}
