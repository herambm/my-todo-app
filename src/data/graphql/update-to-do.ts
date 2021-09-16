import { gql } from "@apollo/client";

// TODO: Update only changed fields
export const UPDATE_TO_DO = gql`
  mutation update_todos(
    $id: Int!
    $title: String!
    $is_important: Boolean!
    $is_completed: Boolean!
    $due_by: timestamptz!
  ) {
    update_todos(
      where: { id: { _eq: $id } }
      _set: {
        title: $title
        is_important: $is_important
        is_completed: $is_completed
        due_by: $due_by
      }
    ) {
      returning {
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
  }
`;
