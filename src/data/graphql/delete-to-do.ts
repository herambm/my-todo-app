import { gql } from "@apollo/client";

export const DELETE_TO_DO = gql`
  mutation delete_todos($id: Int!) {
    delete_todos(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
