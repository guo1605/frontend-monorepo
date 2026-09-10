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