import { DBSchema } from "idb";
import { Todos } from "../generated/graphql";

export interface IIDb extends DBSchema {
  todos: {
    value: Todos;
    key: number;
    indexes: {
      created_at: string;
    };
  };
}
