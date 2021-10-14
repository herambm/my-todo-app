import { DBSchema } from "idb";
import { IToDo } from "./to-do.interface";

export interface IToDoResponse extends IToDo {
  __typename: "string";
}

export interface IIDb extends DBSchema {
  todos: {
    value: IToDoResponse;
    key: number;
    indexes: {
      created_at: string;
    };
  };
}
