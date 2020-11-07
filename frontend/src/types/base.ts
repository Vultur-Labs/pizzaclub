export interface Base {
  id: number;
  created_at: string;
  last_modified: string;
}

export interface User extends Base {
  username: string;
  first_name?: string;
  last_name?: string;
  email: string;
  is_admin: boolean;
  is_employee: boolean;
  is_order_manager: boolean;
}
