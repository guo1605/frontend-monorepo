import { mockDashboardData } from "@/data/dashboard.mock";
import { mockUsersData } from "@/data/users.mock";
import type { GetUsersParams, UserInput } from "@/types/user";
import { formatDate } from '@frontend/utils';

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

export function createUser(userInpt: UserInput) {
  const id = (mockUsersData.length + 1).toString();
  const createdAt = formatDate(Date.now())
  const newUser = { ...userInpt, id, createdAt };
  return new Promise((reslove) => {
    setTimeout(() => {
      mockUsersData.push(newUser);
      mockDashboardData.recentUsers.push(newUser);
      reslove(newUser);
    });
  });
}