import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query GetToDos {
    todos {
      id
      title
      user_id
      is_completed
      is_important
      last_modified_at
      due_by
      created_at
    }
  }
`;
