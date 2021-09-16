export interface IToDo {
  readonly id: number;
  readonly created_at: string;
  due_by: string | null;
  is_completed: boolean | null;
  is_important: boolean | null;
  readonly last_modified_at: string;
  title: string;
  readonly user_id: string;
}
