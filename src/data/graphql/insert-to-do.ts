import { gql } from "@apollo/client";

export const INSERT_TO_DOS = gql`
  mutation insert_todos(
    $title: String!
    $is_important: Boolean
    $is_completed: Boolean
    $due_by: timestamptz
  ) {
    insert_todos(
      objects: {
        title: $title
        is_important: $is_important
        is_completed: $is_completed
        due_by: $due_by
      }
    ) {
      returning {
        title
        last_modified_at
        is_important
        is_completed
        id
        due_by
        created_at
      }
    }
  }
`;
