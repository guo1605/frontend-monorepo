export type UserStatus = 'active' | 'inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  createdAt: string
}

export interface UsersResponse {
  data: User[];
  total: number;
  page: number;
  pageSize: number;
}

export interface GetUsersParams {
  page: number;
  pageSize: number;
}

// 统一错误类型（后端通常返回 { code, message }）
export interface ApiError {
  code: number;
  message: string;
}

export interface UserInput {
  name: string;
  email: string;
  status: UserStatus;
}

export interface UpdateUserInput {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
}