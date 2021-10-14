import { IDBPDatabase, openDB } from "idb";
import { IIDb, IToDoResponse } from "../../models/idb.interface";
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

  public addTodo = async (todo: IToDoResponse) => {
    await (await this.idbPromise).add("todos", todo);
  };

  public addTodos = async (todos: IToDoResponse[]) => {
    const tx = (await this.idbPromise).transaction("todos", "readwrite");
    try {
      await Promise.all(todos.map((todo) => tx.store.add(todo)));
    } catch {
      console.log("Could not add todos to IDb");
    }
  };

  public getTodo = async (key: number) => {
    return await (await this.idbPromise).get("todos", key);
  };

  public getTodos = async (): Promise<IToDoResponse[]> => {
    let todos: IToDoResponse[] = [];

    try {
      todos =
        (await (
          await this.idbPromise
        ).getAllFromIndex("todos", "created_at")) ?? [];
    } catch {
      console.log("Could not fetch todos from IDb.");
    }

    return todos;
  };

  private createTodoStore = (db: IDBPDatabase<IIDb>) => {
    const todoStore = db.createObjectStore("todos", { keyPath: "id" });
    todoStore.createIndex("created_at", "created_at");
  };
}
