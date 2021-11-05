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
      affected_rows
    }
  }
`;
