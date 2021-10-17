import { DBSchema } from "idb";
import { IToDoResponse } from "./to-do.interface";

export interface IIDb extends DBSchema {
  todos: {
    value: IToDoResponse;
    key: number;
    indexes: {
      created_at: string;
    };
  };
}
