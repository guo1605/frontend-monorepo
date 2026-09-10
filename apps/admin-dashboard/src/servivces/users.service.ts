import { mockUsersData } from "@/data/users.mock";
import type { GetUsersParams } from "@/types/user";

export function getUsers({ page, pageSize }: GetUsersParams) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const total = Math.ceil(mockUsersData.length / pageSize);
      const data = mockUsersData.slice(pageSize * (page - 1), pageSize * page);
      resolve({ total, data, page, pageSize });
    }, 1000);
  });
}

export function getUserById(id: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsersData.filter(item => item.id === id);
      resolve(user[0]);
    }, 1000);
  });
}